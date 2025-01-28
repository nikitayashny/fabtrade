package com.sobalevskaya.fabtrade_backend.services;

import com.sobalevskaya.fabtrade_backend.dto.CreateRequestDto;
import com.sobalevskaya.fabtrade_backend.entities.Request;
import com.sobalevskaya.fabtrade_backend.entities.User;
import com.sobalevskaya.fabtrade_backend.repositories.RequestRepository;
import com.sobalevskaya.fabtrade_backend.repositories.TenderRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class RequestService {

    private final RequestRepository requestRepository;
    private final TenderRepository tenderRepository;

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

    public void addRequest(CreateRequestDto createRequestDto, User user) {
        Request request = new Request();
        request.setRequester(user);
        request.setTender(tenderRepository.findById(createRequestDto.getTenderId()).orElseThrow());
        request.setPrice(createRequestDto.getPrice());
        request.setPeriod(createRequestDto.getPeriod());
        request.setDocument(createRequestDto.getDocument());
        request.setImage(createRequestDto.getImage());
        request.setMinSupplyDate(createRequestDto.getMinSupplyDate());
        request.setMaxSupplyDate(createRequestDto.getMaxSupplyDate());
        requestRepository.save(request);
    }

}
