package com.sobalevskaya.fabtrade_backend.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@Table(name = "requests")
@AllArgsConstructor
@NoArgsConstructor
public class Request {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.EAGER)
    @JoinColumn(name = "requester_id")
    private User requester;

    @ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.EAGER)
    @JoinColumn(name = "tender_id")
    private Tender tender;

    private Long price;
    private Long period;
    private String document;
    private String image;
    private Long minSupplyDate;
    private Long maxSupplyDate;
    private boolean sign;

}
