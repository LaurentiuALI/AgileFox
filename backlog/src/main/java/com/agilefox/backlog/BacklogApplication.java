package com.agilefox.backlog;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;


@SpringBootApplication
@EnableFeignClients
public class BacklogApplication {

	public static void main(String[] args) {
		SpringApplication.run(BacklogApplication.class, args);
	}

}
