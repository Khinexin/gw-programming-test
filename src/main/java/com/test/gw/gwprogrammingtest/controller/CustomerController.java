package com.test.gw.gwprogrammingtest.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import com.test.gw.gwprogrammingtest.model.Customer;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
public class CustomerController {
	
	@PostMapping("save-customer")
	public Customer saveCustomer(Customer cus) {
		
		Customer customer = 
		return customer;
	}

}
//save-customer
//customers
//get-customer/id
//update-customer
//delete-customer
//
//customers/month