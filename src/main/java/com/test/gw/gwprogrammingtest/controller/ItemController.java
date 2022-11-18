package com.test.gw.gwprogrammingtest.controller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import com.test.gw.gwprogrammingtest.model.Item;
import com.test.gw.gwprogrammingtest.service.ItemService;

import lombok.RequiredArgsConstructor;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequiredArgsConstructor
public class ItemController {
	
	private final ItemService itemService;
	
	@PostMapping("save-item")
	public Item saveItem(Item item) {
		return itemService.create(item);
	}
	
	@PostMapping("update-item")
	public Item updateItem(Item item){
		return itemService.update(item);
	}
	
	@GetMapping("items")
	public List<Item> findAllItems(){
		return itemService.findAll();
	}
	
	@GetMapping("get-item/{id}")
	public Item getItemById(@PathVariable("id") int id){
		return itemService.findById(id);
	}
	
	@GetMapping("delete-item/{id}")
	public String deleteItemById(@PathVariable("id") int id){
		try {
			itemService.delete(id);
			return "Successfully deleted item id=" + id;
		}catch(Exception e) {
			return "Fail to deleted item id=" + id;
		}
	}

}



