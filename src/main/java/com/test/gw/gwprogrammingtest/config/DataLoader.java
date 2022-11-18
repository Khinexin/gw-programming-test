package com.test.gw.gwprogrammingtest.config;

import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;

import com.test.gw.gwprogrammingtest.service.CustomerService;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class DataLoader implements ApplicationRunner{
	
	private final CustomerService customerService;

	@Override
	public void run(ApplicationArguments args) throws Exception {
		customerService.initializeItemsAndCustomers();
	};

}
