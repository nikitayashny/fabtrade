package com.sobalevskaya.fabtrade_backend.data;

import com.sobalevskaya.fabtrade_backend.entities.Category;
import com.sobalevskaya.fabtrade_backend.entities.Status;
import com.sobalevskaya.fabtrade_backend.repositories.CategoryRepository;
import com.sobalevskaya.fabtrade_backend.repositories.StatusRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class DataLoader implements CommandLineRunner {

    private final CategoryRepository categoryRepository;
    private final StatusRepository statusRepository;

    @Override
    public void run(String... args) {
        if (categoryRepository.count() == 0) {
            categoryRepository.save(new Category(1L, "Для женщин"));
            categoryRepository.save(new Category(2L, "Для мужчин"));
            categoryRepository.save(new Category(3L, "Для детей"));
        }
        if (statusRepository.count() == 0) {
            statusRepository.save(new Status(1L, "Первый этап"));
            statusRepository.save(new Status(2L, "Второй этап"));
            statusRepository.save(new Status(3L, "Завершён успешно"));
            statusRepository.save(new Status(4L, "Завершён без победителя"));
        }
    }
}
