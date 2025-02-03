package com.sobalevskaya.fabtrade_backend.repositories;

import com.sobalevskaya.fabtrade_backend.entities.Request;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RequestRepository extends JpaRepository<Request, Long> {
    List<Request> findAllByTenderId(Long id);
    List<Request> findAllByRequesterId(Long id);
}
