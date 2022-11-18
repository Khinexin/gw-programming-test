package com.test.gw.gwprogrammingtest.service;

import java.text.ParseException;
import java.util.List;

import com.test.gw.gwprogrammingtest.dto.CustomerDto;
import com.test.gw.gwprogrammingtest.model.Customer;

public interface ICustomerService {
	
	Customer create(CustomerDto customer) throws ParseException;
	Customer update(CustomerDto customer) throws ParseException;
	void delete(int id);
	
	Customer findById(int id);
	
	List<Customer> findAll();
	
	List<Customer> findByItemName(String itemName);
	
	List<Customer> findByDob(String date) throws ParseException;

	List<Customer> findByDobInMonth(int month);
	
	void initializeItemsAndCustomers();

}
