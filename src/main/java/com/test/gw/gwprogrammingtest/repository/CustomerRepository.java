package com.test.gw.gwprogrammingtest.repository;

import java.util.Date;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.test.gw.gwprogrammingtest.model.Customer;

@Repository
public interface CustomerRepository extends JpaRepository<Customer, Integer>{

	List<Customer> findByItemName(String itemName);
	
	List<Customer> findByDob(Date date);
	
	List<Customer> findByDobInMonth(int month);
}
