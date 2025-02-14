package com.sobalevskaya.fabtrade_backend.controllers;

import com.sobalevskaya.fabtrade_backend.dto.CreateTenderDto;
import com.sobalevskaya.fabtrade_backend.entities.User;
import com.sobalevskaya.fabtrade_backend.services.TenderService;
import com.sobalevskaya.fabtrade_backend.utils.JwtUtil;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@AllArgsConstructor
@RequestMapping("/api/tenders")
public class TenderController {

    private final TenderService tenderService;
    private final JwtUtil jwtUtil;

    @GetMapping("")
    public ResponseEntity<?> getTenders() {
        try {
            return ResponseEntity.ok().body(tenderService.getTenders());
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(e.getMessage());
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getOneTender(@PathVariable Long id) {
        try {
            return ResponseEntity.ok().body(tenderService.getOneTender(id));
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(e.getMessage());
        }
    }

    @PostMapping("")
    public ResponseEntity<?> addTender(@RequestBody CreateTenderDto createTenderDto,
                                       @RequestHeader(HttpHeaders.AUTHORIZATION) String authorization) {
        try {
            String token = authorization.substring(7);
            User user = jwtUtil.getUserFromToken(token);

            if (!user.isVerified()) {
                return ResponseEntity.badRequest().body("You have no verification");
            }

            tenderService.addTender(createTenderDto, user);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(e.getMessage());
        }
    }

    @PostMapping("/{id}")
    public ResponseEntity<?> confirmTender(@PathVariable Long id,
                                           @RequestHeader(HttpHeaders.AUTHORIZATION) String authorization) {
        try {
            String token = authorization.substring(7);
            User user = jwtUtil.getUserFromToken(token);

            if (tenderService.isUsersTender(id, user) && tenderService.checkTenderStatus(id) == 2) {
                tenderService.confirmTender(id);
            }

            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(e.getMessage());
        }
    }

    @PostMapping("/sign/{id}")
    public ResponseEntity<?> signTender(@PathVariable Long id,
                                           @RequestHeader(HttpHeaders.AUTHORIZATION) String authorization) {
        try {
            String token = authorization.substring(7);
            User user = jwtUtil.getUserFromToken(token);

            if (tenderService.isUsersTender(id, user) && tenderService.checkTenderStatus(id) == 3) {
                tenderService.signTender(id);
            }

            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(e.getMessage());
        }
    }

}
