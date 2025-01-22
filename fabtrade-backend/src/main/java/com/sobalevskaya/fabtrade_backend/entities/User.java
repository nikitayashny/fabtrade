package com.sobalevskaya.fabtrade_backend.entities;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String password;

    @Column(nullable = false, unique = true)
    private String email;

    private String profilePicture;
    private String provider;
}

