package com.test.gw.gwprogrammingtest.controller;

import java.text.ParseException;
import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import com.test.gw.gwprogrammingtest.dto.CustomerDto;
import com.test.gw.gwprogrammingtest.model.Customer;
import com.test.gw.gwprogrammingtest.service.CustomerService;

import lombok.RequiredArgsConstructor;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequiredArgsConstructor
public class CustomerController {
	
	private final CustomerService customerService;
	
	@PostMapping("save-customer")
	public Customer saveCustomer(CustomerDto customerDto) throws ParseException {
		return customerService.create(customerDto);
	}
	
	@PostMapping("update-customer")
	public Customer updateCustomer(CustomerDto customerDto) throws ParseException {
		return customerService.update(customerDto);
	}
	
	@GetMapping("customers")
	public List<Customer> findAllCustomers(){
		return customerService.findAll();
	}
	
	@GetMapping("get-customer/{id}")
	public Customer getCustomerById(@PathVariable("id") int id){
		return customerService.findById(id);
	}
	
	@GetMapping("delete-customer/{id}")
	public String deleteCustomerById(@PathVariable("id") int id){
		try {
			customerService.delete(id);
			return "Successfully deleted";
		}catch(Exception e) {
			return "Fail to deleted";
		}
	}
	
	@GetMapping("customers/month/{month}")
	public List<Customer> findAllCustomersByMonth(@PathVariable("month") int month){
		return customerService.findByDobInMonth(month);
	}

}



//customers/month