package com.sobalevskaya.fabtrade_backend.controllers;

import com.sobalevskaya.fabtrade_backend.dto.VerificationDto;
import com.sobalevskaya.fabtrade_backend.entities.User;
import com.sobalevskaya.fabtrade_backend.services.UserService;
import com.sobalevskaya.fabtrade_backend.utils.JwtUtil;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@AllArgsConstructor
@RequestMapping("/api/user")
public class UserController {

    private final JwtUtil jwtUtil;
    private final UserService userService;

    @PostMapping
    public ResponseEntity<?> verifyUser(@RequestBody VerificationDto verificationDto,
                                        @RequestHeader(HttpHeaders.AUTHORIZATION) String authorization) {
        try {
            String token = authorization.substring(7);
            User user = jwtUtil.getUserFromToken(token);
            userService.verifyUser(user, verificationDto);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(e.getMessage());
        }
    }

}
