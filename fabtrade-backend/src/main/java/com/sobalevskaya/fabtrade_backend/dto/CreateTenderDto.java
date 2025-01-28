package com.sobalevskaya.fabtrade_backend.dto;

import lombok.Data;

@Data
public class CreateTenderDto {

    private Long category_id;
    private int count;
    private String name;
    private String description;
    private int term;

}
