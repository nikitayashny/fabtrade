package com.sobalevskaya.fabtrade_backend.controllers;

import com.sobalevskaya.fabtrade_backend.dto.CreateRequestDto;
import com.sobalevskaya.fabtrade_backend.entities.User;
import com.sobalevskaya.fabtrade_backend.services.DocumentService;
import com.sobalevskaya.fabtrade_backend.services.ImageService;
import com.sobalevskaya.fabtrade_backend.services.RequestService;
import com.sobalevskaya.fabtrade_backend.services.TenderService;
import com.sobalevskaya.fabtrade_backend.utils.JwtUtil;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@AllArgsConstructor
@RequestMapping("/api/requests")
public class RequestController {

    private final JwtUtil jwtUtil;
    private final TenderService tenderService;
    private final RequestService requestService;
    private final ImageService imageService;
    private final DocumentService documentService;

    @GetMapping("/tender/{id}")
    public ResponseEntity<?> getTenderRequests(@PathVariable Long id,
                                               @RequestHeader(HttpHeaders.AUTHORIZATION) String authorization) {
        try {
            String token = authorization.substring(7);
            User user = jwtUtil.getUserFromToken(token);

            if (!tenderService.isUsersTender(id, user))
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body("You have no permission");

            return ResponseEntity.ok().body(requestService.getTenderRequests(id));
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(e.getMessage());
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getRequest(@PathVariable Long id,
                                        @RequestHeader(HttpHeaders.AUTHORIZATION) String authorization) {
        try {
            String token = authorization.substring(7);
            User user = jwtUtil.getUserFromToken(token);

            if (!requestService.isUsersRequest(id, user))
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body("You have no permission");

            return ResponseEntity.ok().body(requestService.getRequest(id));
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(e.getMessage());
        }
    }

    @PostMapping("")
    public ResponseEntity<?> addRequest(@ModelAttribute CreateRequestDto createRequestDto,
                                        @RequestParam("image") MultipartFile image,
                                        @RequestParam("document") MultipartFile document,
                                        @RequestHeader(HttpHeaders.AUTHORIZATION) String authorization) {
        try {
            String token = authorization.substring(7);
            User user = jwtUtil.getUserFromToken(token);

            if (!user.isVerified()) {
                return ResponseEntity.badRequest().body("You have no verification");
            }

            String imageUrl = imageService.uploadImage(image);
            String documentUrl = documentService.uploadPdf(document);
            if (requestService.addRequest(createRequestDto, user, imageUrl, documentUrl)) {
                return ResponseEntity.ok().build();
            } else {
                return ResponseEntity.badRequest().body("You have already sent request or tender already have a winner");
            }
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(e.getMessage());
        }
    }

}
