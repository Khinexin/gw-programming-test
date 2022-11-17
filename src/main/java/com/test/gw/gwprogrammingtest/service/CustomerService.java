package com.test.gw.gwprogrammingtest.service;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Objects;

import org.springframework.stereotype.Service;

import com.test.gw.gwprogrammingtest.dto.CustomerDto;
import com.test.gw.gwprogrammingtest.model.Customer;
import com.test.gw.gwprogrammingtest.model.CustomerItem;
import com.test.gw.gwprogrammingtest.model.Item;
import com.test.gw.gwprogrammingtest.repository.CustomerRepository;
import com.test.gw.gwprogrammingtest.repository.ItemRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CustomerService implements ICustomerService {

	private final CustomerRepository customerRepository;
	private final ItemRepository itemRepository;

	SimpleDateFormat sdformat = new SimpleDateFormat("yyyy-MM-dd");

	@Override
	public Customer create(CustomerDto customerDto) throws ParseException {

		Customer saveCustomer = customerRepository.save(Customer.builder().id(-1).name(customerDto.getName())
				.dateOfBirth(sdformat.parse(customerDto.getDateOfBirth())).address(customerDto.getAddress())
				.contactNumber(customerDto.getContactNumber()).build());

		List<CustomerItem> favItems = new ArrayList<CustomerItem>();

		for (Integer favItemId : customerDto.getFavoriteItemsIds()) {
			Item item = itemRepository.findById(favItemId).orElse(null);
			if (!Objects.isNull(item)) {
				favItems.add(CustomerItem.builder().customer(saveCustomer).item(item).build());
			}
		}

		saveCustomer.setFavoriteItems(new HashSet<>(favItems));

		return customerRepository.saveAndFlush(saveCustomer);
	}

	@Override
	public Customer update(CustomerDto customerDto) throws ParseException {

		Customer saveCustomer = customerRepository.findById(customerDto.getId()).orElse(null);

		if (!Objects.isNull(saveCustomer)) {

			if (!saveCustomer.getName().equalsIgnoreCase(customerDto.getName())) {
				saveCustomer.setName(customerDto.getName());
			}
			if (!saveCustomer.getDateOfBirth().equals(sdformat.parse(customerDto.getDateOfBirth()))) {
				saveCustomer.setDateOfBirth(sdformat.parse(customerDto.getDateOfBirth()));
			}
			if (!saveCustomer.getAddress().equals(customerDto.getAddress())) {
				saveCustomer.setAddress(customerDto.getAddress());
			}
			if (!saveCustomer.getContactNumber().equals(customerDto.getContactNumber())) {
				saveCustomer.setContactNumber(customerDto.getContactNumber());
			}

			List<CustomerItem> favItems = new ArrayList<CustomerItem>();

			for (Integer favItemId : customerDto.getFavoriteItemsIds()) {
				Item item = itemRepository.findById(favItemId).orElse(null);
				if (!Objects.isNull(item)) {
					favItems.add(CustomerItem.builder().customer(saveCustomer).item(item).build());
				}
			}

			if (!saveCustomer.getFavoriteItems().equals(new HashSet<>(favItems))) {
				saveCustomer.setFavoriteItems(new HashSet<>(favItems));
			}

			return customerRepository.saveAndFlush(saveCustomer);
		}
		return null;
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
	public List<Customer> findByDob(String date) throws ParseException {
		return customerRepository.findByDob(sdformat.parse(date));
	}

	@Override
	public List<Customer> findByDobInMonth(int month) {
		return customerRepository.findByDobInMonth(month);
	}

}
