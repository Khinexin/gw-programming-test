package com.test.gw.gwprogrammingtest.repository;

import java.util.Date;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.test.gw.gwprogrammingtest.model.Customer;

@Repository
public interface CustomerRepository extends JpaRepository<Customer, Integer>{

	@Query("SELECT DISTINCT c FROM Customer c "
			+ "JOIN c.favoriteItems fav JOIN fav.item i WHERE i.name =:itemName")
	List<Customer> findByItemName(@Param("itemName")String itemName);
	
	@Query("SELECT DISTINCT c FROM Customer c "
			+ "WHERE c.dateOfBirth LIKE %:dob%")
	List<Customer> findByDob(@Param("dob")Date dateOfBirth);
		
	@Query("SELECT DISTINCT c FROM Customer c "
			+ "WHERE EXTRACT (month FROM c.dateOfBirth) = :month")
	List<Customer> findByDobInMonth(@Param("dateOfBirth")int month);
}
