package com.sobalevskaya.fabtrade_backend.dto;

import lombok.Data;

@Data
public class ConfirmDto {

    private String password;
    private String email;
    private String code;

}
