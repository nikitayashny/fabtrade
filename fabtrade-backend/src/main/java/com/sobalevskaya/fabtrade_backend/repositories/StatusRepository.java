package com.sobalevskaya.fabtrade_backend.repositories;

import com.sobalevskaya.fabtrade_backend.entities.Status;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StatusRepository extends JpaRepository<Status, Long> {
}
