package com.sobalevskaya.fabtrade_backend.dto;

import lombok.Data;

@Data
public class CreateRequestDto {

    private Long tenderId;
    private Long price;
    private Long period;
    private String document;
    private String image;
    private Long minSupplyDate;
    private Long maxSupplyDate;

}
