package com.test.gw.gwprogrammingtest.service;

import java.util.List;

import java.util.List;

import com.test.gw.gwprogrammingtest.model.Item;

public interface IItemService {
	
	Item create(Item item);
	Item update(Item item);
	void delete(int id);
	
	Item findById(int id);
	Item findByName(String name);
	
	List<Item> findAll();

}
