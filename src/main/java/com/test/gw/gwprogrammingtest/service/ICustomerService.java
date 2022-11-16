package com.test.gw.gwprogrammingtest.service;

import java.util.Date;
import java.util.List;

import com.test.gw.gwprogrammingtest.model.Customer;

public interface ICustomerService {
	
	Customer create(Customer customer);
	Customer update(Customer customer);
	void delete(int id);
	
	Customer findById(int id);
	
	List<Customer> findAll();
	
	List<Customer> findByItemName(String itemName);
	
	List<Customer> findByDob(Date date);

	List<Customer> findByDobInMonth(int month);

}
