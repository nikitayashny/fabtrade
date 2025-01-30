package com.sobalevskaya.fabtrade_backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class FabtradeBackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(FabtradeBackendApplication.class, args);
	}

}
