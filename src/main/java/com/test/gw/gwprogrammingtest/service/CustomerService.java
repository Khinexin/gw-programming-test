package com.test.gw.gwprogrammingtest.service;

import java.util.Date;
import java.util.List;

import org.springframework.stereotype.Service;

import com.test.gw.gwprogrammingtest.model.Customer;
import com.test.gw.gwprogrammingtest.repository.CustomerRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CustomerService implements ICustomerService{
	
	private final CustomerRepository customerRepository;

	@Override
	public Customer create(Customer customer) {
		return customerRepository.save(customer);
	}

	@Override
	public Customer update(Customer customer) {
		return customerRepository.saveAndFlush(customer);
	}

	@Override
	public void delete(int id) {
		customerRepository.deleteById(id);
	}

	@Override
	public Customer findById(int id) {
		return customerRepository.findById(id).orElse(null);
	}

	@Override
	public List<Customer> findAll() {
		return customerRepository.findAll();
	}
	
	@Override
	public List<Customer> findByItemName(String itemName) {
		return customerRepository.findByItemName(itemName);
	}

	@Override
	public List<Customer> findByDob(Date date) {
		return null;
	}

	@Override
	public List<Customer> findByDobInMonth(int month) {
		return null;
	}

}
