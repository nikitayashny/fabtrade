package com.sobalevskaya.fabtrade_backend.services;

import com.sobalevskaya.fabtrade_backend.dto.CreateTenderDto;
import com.sobalevskaya.fabtrade_backend.entities.Request;
import com.sobalevskaya.fabtrade_backend.entities.Tender;
import com.sobalevskaya.fabtrade_backend.entities.User;
import com.sobalevskaya.fabtrade_backend.repositories.CategoryRepository;
import com.sobalevskaya.fabtrade_backend.repositories.RequestRepository;
import com.sobalevskaya.fabtrade_backend.repositories.StatusRepository;
import com.sobalevskaya.fabtrade_backend.repositories.TenderRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@RequiredArgsConstructor
@Service
public class TenderService {

    private final TenderRepository tenderRepository;
    private final StatusRepository statusRepository;
    private final CategoryRepository categoryRepository;
    private final RequestRepository requestRepository;
    private final EmailSenderService emailSenderService;


    public List<Tender> getTenders() {
        return tenderRepository.findAll();
    }

    public void addTender(CreateTenderDto createTenderDto, User user) {
        Tender tender = new Tender();
        tender.setCreator(user);
        tender.setCategory(categoryRepository.findById(createTenderDto.getCategory_id()).orElseThrow());
        tender.setCount(createTenderDto.getCount());
        tender.setName(createTenderDto.getName());
        tender.setDescription(createTenderDto.getDescription());
        tender.setTerm(createTenderDto.getTerm());
        tender.setStatus(statusRepository.findById(1L).orElseThrow());
        tenderRepository.save(tender);
    }

    public boolean isUsersTender(Long id, User user) {
        Tender tender = tenderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Tender not found"));
        return tender.getCreator() == user;
    }

    public void makeTenders() {
        List<Tender> allTenders = tenderRepository.findAll();
        for (Tender tender : allTenders) {
            if (LocalDate.now().equals(tender.getDateOfCreated().toLocalDate().plusDays(tender.getTerm()))
                    && tender.getStatus().getId() == 1) {
                List<Request> requests = requestRepository.findAllByTenderId(tender.getId());

                double minPrice = requests.stream().mapToDouble(Request::getPrice).min().orElse(0);
                double maxPrice = requests.stream().mapToDouble(Request::getPrice).max().orElse(1);
                double minPeriod = requests.stream().mapToDouble(Request::getPeriod).min().orElse(0);
                double maxPeriod = requests.stream().mapToDouble(Request::getPeriod).max().orElse(1);
                double minSupplyDate = requests.stream().mapToLong(request ->
                        (request.getMinSupplyDate() + request.getMaxSupplyDate()) / 2).min().orElse(0);
                double maxSupplyDate = requests.stream().mapToLong(request ->
                        (request.getMinSupplyDate() + request.getMaxSupplyDate()) / 2).max().orElse(1);

                Request bestRequest = null;
                double bestScore = Double.NEGATIVE_INFINITY;
                for (Request request : requests) {
                    double normalizedPrice = (maxPrice - request.getPrice()) / (maxPrice - minPrice);
                    double normalizedPeriod = (request.getPeriod() - minPeriod) / (maxPeriod - minPeriod);
                    double averageSupplyDate = (request.getMinSupplyDate() + request.getMaxSupplyDate()) / 2.0;
                    double normalizedDate = (maxSupplyDate - averageSupplyDate) / (maxSupplyDate - minSupplyDate);

                    double totalScore = (normalizedPrice * 0.6) + (normalizedPeriod * 0.2) + (normalizedDate * 0.2);

                    if (totalScore > bestScore) {
                        bestScore = totalScore;
                        bestRequest = request;
                    }
                }

                if (bestRequest != null) {
                    tender.setStatus(statusRepository.findById(2L).orElseThrow());
                    tender.setWinner(bestRequest.getRequester());
                    tenderRepository.save(tender);
                    emailSenderService.sendInfoToCreator(
                            tender.getCreator().getEmail(), bestRequest.getRequester().getName());
                }
            }

            if (LocalDate.now().equals(tender.getDateOfCreated().toLocalDate().plusDays(tender.getTerm() + 7))
                    && tender.getStatus().getId() == 2) {
                tender.setWinner(null);
                tender.setStatus(statusRepository.findById(4L).orElseThrow());
                tenderRepository.save(tender);
            }
        }
    }

    public void confirmTender(Long id) {
        Tender tender = tenderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Tender not found"));
        tender.setStatus(statusRepository.findById(3L).orElseThrow());
        tenderRepository.save(tender);

        emailSenderService.sendInfoToWinner(tender.getWinner().getEmail(), tender.getName());
    }

    public Long checkTenderStatus(Long id) {
        Tender tender = tenderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Tender not found"));
        return tender.getStatus().getId();
    }

}
