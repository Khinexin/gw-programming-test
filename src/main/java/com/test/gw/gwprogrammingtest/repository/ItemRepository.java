package com.test.gw.gwprogrammingtest.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.test.gw.gwprogrammingtest.model.Item;

@Repository
public interface ItemRepository extends JpaRepository<Item, Integer> {

	Item findByName(String name);
}
