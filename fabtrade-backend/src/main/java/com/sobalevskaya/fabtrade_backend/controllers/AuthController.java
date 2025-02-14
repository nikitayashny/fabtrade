package com.sobalevskaya.fabtrade_backend.controllers;

import com.sobalevskaya.fabtrade_backend.dto.UserDto;
import com.sobalevskaya.fabtrade_backend.entities.User;
import com.sobalevskaya.fabtrade_backend.dto.ConfirmDto;
import com.sobalevskaya.fabtrade_backend.entities.UserCode;
import com.sobalevskaya.fabtrade_backend.repositories.UserCodeRepository;
import com.sobalevskaya.fabtrade_backend.repositories.UserRepository;
import com.sobalevskaya.fabtrade_backend.services.EmailSenderService;
import com.sobalevskaya.fabtrade_backend.services.UserCodeService;
import com.sobalevskaya.fabtrade_backend.services.UserService;
import com.sobalevskaya.fabtrade_backend.utils.JwtUtil;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.Map;
import java.util.Optional;
import java.util.Random;

@RestController
@AllArgsConstructor
@RequestMapping("/api/auth")
public class AuthController {

    private final UserService userService;
    private final UserRepository userRepository;
    private final JwtUtil jwtUtil;
    private final PasswordEncoder passwordEncoder;
    private final EmailSenderService emailSenderService;
    private final UserCodeService userCodeService;
    private final UserCodeRepository userCodeRepository;

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@Validated @RequestBody User user) {
        if (userService.findByEmail(user.getEmail()).isPresent()) {
            return ResponseEntity.badRequest().body("Email is already taken!");
        }

        Random random = new Random();
        String confirmationCode = String.valueOf(100000 + random.nextInt(900000));
        emailSenderService.sendConfirmationCode(user.getEmail(), confirmationCode);
        userCodeService.create(user.getEmail(), confirmationCode);

        return ResponseEntity.ok().build();
    }

    @PostMapping("/confirm")
    public ResponseEntity<?> confirm(@RequestBody @Validated ConfirmDto user) {
        UserCode userCode = userCodeService.findByEmail(user.getEmail());

        if (!userCode.getCode().equals(user.getCode())) {
            return ResponseEntity.badRequest().body("Неверный код подтверждения");
        }

        User newUser = new User();
        newUser.setEmail(user.getEmail());
        newUser.setPassword(user.getPassword());
        userService.saveUser(newUser);

        String token = jwtUtil.generateToken(user.getEmail());

        userCodeRepository.delete(userCode);


        UserDto userDto = new UserDto();
        userDto.setToken(token);
        userDto.setUser(newUser);

        return ResponseEntity.ok().body(userDto);
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody User user) {
        var existingUser = userService.findByEmail(user.getEmail());

        if (existingUser.isPresent() &&
                passwordEncoder.matches(user.getPassword(), existingUser.get().getPassword())) {

            String token = jwtUtil.generateToken(user.getEmail());

            UserDto userDto = new UserDto();
            userDto.setToken(token);
            userDto.setUser(existingUser.orElseThrow());

            return ResponseEntity.ok().body(userDto);
        }

        return ResponseEntity.status(401).body("Invalid username or password");
    }

    @PostMapping("/oauth2")
    public ResponseEntity<?> loginWithGoogle(@RequestBody Map<String, String> token)
            throws OAuth2AuthenticationException {
        String googleToken = token.get("token");

        RestTemplate restTemplate = new RestTemplate();
        String url = "https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=" + googleToken;
        Map<String, Object> googleUserInfo = restTemplate.getForObject(url, Map.class);

        if (googleUserInfo == null) {
            throw new OAuth2AuthenticationException("Invalid Google token");
        }

        String email = (String) googleUserInfo.get("email");
        String profilePicture = (String) googleUserInfo.get("picture");

        Optional<User> existingUser = userRepository.findByEmail(email);

        if (existingUser.isEmpty()) {
            User newUser = new User();
            newUser.setEmail(email);
            newUser.setProfilePicture(profilePicture);
            newUser.setProvider("GOOGLE");
            userRepository.save(newUser);

            String jwt = jwtUtil.generateToken(email);


            UserDto userDto = new UserDto();
            userDto.setToken(jwt);
            userDto.setUser(newUser);

            return ResponseEntity.ok().body(userDto);
        }

        String jwt = jwtUtil.generateToken(email);
        UserDto userDto = new UserDto();
        userDto.setToken(jwt);
        userDto.setUser(existingUser.orElseThrow());

        return ResponseEntity.ok().body(userDto);
    }

    @GetMapping("/check")
    public ResponseEntity<?> auth(@RequestHeader(HttpHeaders.AUTHORIZATION) String authorization) {
        if (authorization == null || authorization.length() < 15) {
            return ResponseEntity.ok().build();
        }
        String jwt = authorization.substring(7);
        User user = jwtUtil.getUserFromToken(jwt);
        UserDto userDto = new UserDto();
        userDto.setToken(jwt);
        userDto.setUser(user);

        return ResponseEntity.ok().body(userDto);
    }

}