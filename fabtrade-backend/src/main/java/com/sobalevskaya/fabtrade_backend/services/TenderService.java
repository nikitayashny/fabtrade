package com.sobalevskaya.fabtrade_backend.services;

import com.sobalevskaya.fabtrade_backend.entities.Tender;
import com.sobalevskaya.fabtrade_backend.repositories.TenderRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class TenderService {

    private final TenderRepository tenderRepository;

    public List<Tender> getTenders() {
        return tenderRepository.findAll();
    }
}
