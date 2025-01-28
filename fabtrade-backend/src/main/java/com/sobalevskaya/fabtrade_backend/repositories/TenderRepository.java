package com.sobalevskaya.fabtrade_backend.repositories;

import com.sobalevskaya.fabtrade_backend.entities.Tender;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TenderRepository extends JpaRepository<Tender, Long> {
}
