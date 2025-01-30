package com.sobalevskaya.fabtrade_backend.dto;

import com.sobalevskaya.fabtrade_backend.entities.User;
import lombok.Data;

@Data
public class UserDto {
    private String token;
    private User user;
}
