package com.sobalevskaya.fabtrade_backend.repositories;

import com.sobalevskaya.fabtrade_backend.entities.Category;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepository extends JpaRepository<Category, Long> {
}
