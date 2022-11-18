package com.test.gw.gwprogrammingtest.dto;

import java.util.List;

import com.test.gw.gwprogrammingtest.model.Item;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CustomerDto {
	
	private Integer id;
	private String name;
	private String dateOfBirth;
	private String address;
	private String contactNumber;
	private List<Item> favoriteItemss;
}
