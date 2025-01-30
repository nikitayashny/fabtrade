package com.sobalevskaya.fabtrade_backend.utils;

import com.sobalevskaya.fabtrade_backend.services.TenderService;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class TenderMaker {

    private final TenderService tenderService;

    @Scheduled(cron = "0 0 1 * * *")
    public void shceduleProcess() {
        tenderService.makeTenders();
    }

}
