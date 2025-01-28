package com.sobalevskaya.fabtrade_backend.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@Table(name = "categories")
@AllArgsConstructor
@NoArgsConstructor
public class Category {

    @Id
    private Long id;
    private String name;

}
