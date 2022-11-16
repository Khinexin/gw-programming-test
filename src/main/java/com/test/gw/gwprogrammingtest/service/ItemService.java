package com.test.gw.gwprogrammingtest.service;

import org.springframework.stereotype.Service;

import com.test.gw.gwprogrammingtest.model.Item;
import com.test.gw.gwprogrammingtest.repository.ItemRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ItemService implements IItemService{
	
	private final ItemRepository itemRepository;

	@Override
	public Item create(Item item) {
		return null;
	}

	@Override
	public Item update(Item item) {
		return null;
	}

	@Override
	public void delete(int id) {
		
	}

	@Override
	public Item findById(int id) {
		return null;
	}

	@Override
	public Item findByName(String name) {
		return null;
	}
	
	@Override
	public List<Item> findAll() {
		return null;
	}

}
