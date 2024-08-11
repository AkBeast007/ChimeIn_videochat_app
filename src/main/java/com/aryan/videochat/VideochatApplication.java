package com.aryan.videochat;

import com.aryan.videochat.user.User;
import com.aryan.videochat.user.UserService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class VideochatApplication {

	public static void main(String[] args) {
		SpringApplication.run(VideochatApplication.class, args);
	}
//
//	@Bean
//	public CommandLineRunner commandLineRunner(UserService service) {
//		return args -> {
//			service.register(User.builder()
//					.username("John")
//					.email("john@gmail.com")
//					.password("123")
//					.build());
//
//			service.register(User.builder()
//					.username("Doe")
//					.email("doe@gmail.com")
//					.password("345")
//					.build());
//
//			service.register(User.builder()
//					.username("Anny")
//					.email("anny@gmail.com")
//					.password("789")
//					.build());
//		};
//	}
}
