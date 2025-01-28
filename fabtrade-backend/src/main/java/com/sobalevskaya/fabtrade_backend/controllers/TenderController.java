package com.sobalevskaya.fabtrade_backend.controllers;

import com.sobalevskaya.fabtrade_backend.services.TenderService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@AllArgsConstructor
@RequestMapping("/api/tenders")
public class TenderController {

    private final TenderService tenderService;

    @GetMapping("")
    public ResponseEntity<?> getTenders() {
        try {
            return ResponseEntity.ok().body(tenderService.getTenders());
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(e.getMessage());
        }
    }

}
