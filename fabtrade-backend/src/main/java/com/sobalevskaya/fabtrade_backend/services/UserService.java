package com.sobalevskaya.fabtrade_backend.services;

import com.sobalevskaya.fabtrade_backend.dto.VerificationDto;
import com.sobalevskaya.fabtrade_backend.entities.User;
import com.sobalevskaya.fabtrade_backend.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public void saveUser(User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userRepository.save(user);
    }

    public Optional<User> findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    public void verifyUser(User user, VerificationDto verificationDto) {
        user.setUnp(verificationDto.getUnp());
        user.setName(verificationDto.getName());
        user.setVerified(true);
        userRepository.save(user);
    }

}
