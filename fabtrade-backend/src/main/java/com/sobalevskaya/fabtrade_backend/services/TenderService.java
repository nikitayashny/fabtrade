package com.sobalevskaya.fabtrade_backend.services;

import com.sobalevskaya.fabtrade_backend.dto.CreateTenderDto;
import com.sobalevskaya.fabtrade_backend.entities.Tender;
import com.sobalevskaya.fabtrade_backend.entities.User;
import com.sobalevskaya.fabtrade_backend.repositories.CategoryRepository;
import com.sobalevskaya.fabtrade_backend.repositories.StatusRepository;
import com.sobalevskaya.fabtrade_backend.repositories.TenderRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class TenderService {

    private final TenderRepository tenderRepository;
    private final StatusRepository statusRepository;
    private final CategoryRepository categoryRepository;

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
}
