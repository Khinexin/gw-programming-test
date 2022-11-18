package com.test.gw.gwprogrammingtest.service;

import java.util.List;

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
		return itemRepository.save(item);
	}

	@Override
	public Item update(Item item) {
		return itemRepository.saveAndFlush(item);
	}

	@Override
	public void delete(int id) {
		itemRepository.deleteById(id);
	}

	@Override
	public Item findById(int id) {
		return itemRepository.findById(id).orElse(null);
	}

	@Override
	public Item findByName(String name) {
		return itemRepository.findByName(name);
	}
	
	@Override
	public List<Item> findAll() {
		return itemRepository.findAll();
	}



}
