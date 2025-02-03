package com.sobalevskaya.fabtrade_backend.services;

import com.sobalevskaya.fabtrade_backend.dto.CreateRequestDto;
import com.sobalevskaya.fabtrade_backend.entities.Request;
import com.sobalevskaya.fabtrade_backend.entities.Status;
import com.sobalevskaya.fabtrade_backend.entities.Tender;
import com.sobalevskaya.fabtrade_backend.entities.User;
import com.sobalevskaya.fabtrade_backend.repositories.RequestRepository;
import com.sobalevskaya.fabtrade_backend.repositories.StatusRepository;
import com.sobalevskaya.fabtrade_backend.repositories.TenderRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;

@RequiredArgsConstructor
@Service
public class RequestService {

    private final RequestRepository requestRepository;
    private final TenderRepository tenderRepository;
    private final StatusRepository statusRepository;

    public List<Request> getTenderRequests(Long id) {
        return requestRepository.findAllByTenderId(id);
    }

    public Request getRequest(Long id) {
        return requestRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Request not found"));
    }

    public boolean isUsersRequest(Long id, User user) {
        Request request = requestRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Request not found"));
        return request.getRequester() == user;
    }

    public boolean addRequest(CreateRequestDto createRequestDto, User user, String imageUrl, String documentUrl) {
        if (tenderRepository.findById(createRequestDto.getTenderId()).orElseThrow().getStatus() !=
            statusRepository.findById(1L).orElseThrow()) {
            return false;
        }

        List<Request> requests= requestRepository.findAllByTenderId(createRequestDto.getTenderId());
        for (Request request: requests) {
            if (request.getRequester() == user)
                return false;
        }
        Request request = new Request();
        request.setRequester(user);
        request.setTender(tenderRepository.findById(createRequestDto.getTenderId()).orElseThrow());
        request.setPrice(createRequestDto.getPrice());
        request.setPeriod(createRequestDto.getPeriod());
        request.setDocument(documentUrl);
        request.setImage(imageUrl);
        request.setMinSupplyDate(createRequestDto.getMinSupplyDate());
        request.setMaxSupplyDate(createRequestDto.getMaxSupplyDate());
        request.setSign(createRequestDto.isSign());
        requestRepository.save(request);
        return true;
    }

    public List<Request> getUsersRequests(Long id) {
        return requestRepository.findAllByRequesterId(id);
    }

    public boolean isCreator(Long id, User user) {
        Request request = requestRepository.findById(id).orElseThrow();
        return request.getTender().getCreator() == user;
    }

    public Request getWinnerRequest(Long id) {
        Tender tender = tenderRepository.findById(id).orElseThrow();
        List<Request> requests = requestRepository.findAllByTenderId(id);
        for (Request request: requests) {
            if (Objects.equals(tender.getWinner().getId(), request.getRequester().getId())) {
                return request;
            }
        }
        return null;
    }
}
