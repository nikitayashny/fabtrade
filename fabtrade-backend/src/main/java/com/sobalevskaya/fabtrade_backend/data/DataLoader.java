package com.sobalevskaya.fabtrade_backend.data;

import com.sobalevskaya.fabtrade_backend.entities.Category;
import com.sobalevskaya.fabtrade_backend.repositories.CategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class DataLoader implements CommandLineRunner {

    private final CategoryRepository categoryRepository;

    @Override
    public void run(String... args) {
        if (categoryRepository.count() == 0) {
            categoryRepository.save(new Category(1L, "Для женщин"));
            categoryRepository.save(new Category(2L, "Для мужчин"));
            categoryRepository.save(new Category(3L, "Для детей"));
        }
    }
}
