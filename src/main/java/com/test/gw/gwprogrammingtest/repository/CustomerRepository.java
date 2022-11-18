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
			+ "JOIN c.favoriteItems f JOIN f.item i WHERE i.name =:itemName")
	List<Customer> findByItemName(@Param("itemName")String itemName);
	
	@Query("SELECT DISTINCT c FROM Customer c "
			+ "WHERE c.dateOfBirth LIKE %:dob%")
	List<Customer> findByDob(@Param("dob")Date dateOfBirth);
		
//	@Query(value = "SELECT * FROM events WHERE event_date Like %?1%", nativeQuery = true)
	@Query("SELECT DISTINCT c FROM Customer c ")
//			+ "WHERE month(c.dateOfBirth) = :month")
	List<Customer> findByMonth(@Param("dateOfBirth")int month);
}
