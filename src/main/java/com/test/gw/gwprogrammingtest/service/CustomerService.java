package com.test.gw.gwprogrammingtest.service;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Objects;

import org.springframework.stereotype.Service;

import com.test.gw.gwprogrammingtest.dto.CustomerDto;
import com.test.gw.gwprogrammingtest.dto.ItemInitEnum;
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

	SimpleDateFormat sdformat = new SimpleDateFormat("dd/MM/yyyy");

	@Override
	public Customer create(CustomerDto customerDto) throws ParseException {

		Customer saveCustomer = customerRepository.save(Customer.builder().id(-1).name(customerDto.getName())
				.dateOfBirth(sdformat.parse(customerDto.getDateOfBirth())).address(customerDto.getAddress())
				.contactNumber(customerDto.getContactNumber()).build());

		List<CustomerItem> favItems = new ArrayList<CustomerItem>();

		for (Item item : customerDto.getFavoriteItemss()) {
			favItems.add(CustomerItem.builder().customer(saveCustomer).item(item).build());
		}

		saveCustomer.setFavoriteItems(favItems);

		return customerRepository.saveAndFlush(saveCustomer);
	}

	@Override
	public Customer update(CustomerDto customerDto) throws ParseException {

		Customer saveCustomer = customerRepository.findById(customerDto.getId()).orElse(null);

		if (!Objects.isNull(saveCustomer)) {

			if (!saveCustomer.getName().equals(customerDto.getName())) {
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

			for (Item item : customerDto.getFavoriteItemss()) {
				favItems.add(CustomerItem.builder().customer(saveCustomer).item(item).build());
			}

			if (!saveCustomer.getFavoriteItems().equals(favItems)) {
				saveCustomer.getFavoriteItems().clear();
				saveCustomer.setFavoriteItems(favItems);
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
		return customerRepository.findByMonth(month);
	}

	@Override
	public void initializeItemsAndCustomers() {

		if (itemRepository.count() == 0) {
			for (ItemInitEnum item : ItemInitEnum.values()) {
				itemRepository.save(Item.builder().name(item.getName())
//						.photo(item.getPhoto()).price(item.getPrice())
						.build());
			}
		}

		if (customerRepository.count() == 0 && itemRepository.count() > 0) {
			try {
				this.create(CustomerDto.builder().name("Aye Aye").dateOfBirth("1/5/1970").address("Mars")
						.contactNumber("000000")
						.favoriteItemss(Arrays.asList(itemRepository.findByName("pancake"),
								itemRepository.findByName("cupcake"), itemRepository.findByName("cheesecake")))
						.build());
			} catch (ParseException e) {
				e.printStackTrace();
			}
			try {
				this.create(CustomerDto.builder().name("Aung Aung").dateOfBirth("2/1/1970").address("Mars")
						.contactNumber("000000")
						.favoriteItemss(Arrays.asList(itemRepository.findByName("pancake"),
								itemRepository.findByName("cupcake"), itemRepository.findByName("cheesecake")))
						.build());
			} catch (ParseException e) {
				e.printStackTrace();
			}

			try {
				this.create(
						CustomerDto.builder().name("Bo Bo").dateOfBirth("2/6/1980").address("Neptune")
								.contactNumber("09111111")
								.favoriteItemss(Arrays.asList(itemRepository.findByName("cookie"),
										itemRepository.findByName("donuts"), itemRepository.findByName("croissant")))
								.build());
			} catch (ParseException e) {
				e.printStackTrace();
			}
			try {
				this.create(
						CustomerDto.builder().name("Htay Htay").dateOfBirth("3/7/1990").address("Jupiter")
								.contactNumber("09222222")
								.favoriteItemss(Arrays.asList(itemRepository.findByName("pancake"),
										itemRepository.findByName("cheesecake"), itemRepository.findByName("donuts")))
								.build());
			} catch (ParseException e) {
				e.printStackTrace();
			}
			try {
				this.create(CustomerDto.builder().name("Hlaing Hlaing").dateOfBirth("5/3/1970").address("Mars")
						.contactNumber("000000")
						.favoriteItemss(Arrays.asList(itemRepository.findByName("pancake"),
								itemRepository.findByName("cupcake"), itemRepository.findByName("cheesecake")))
						.build());
			} catch (ParseException e) {
				e.printStackTrace();
			}

			try {
				this.create(CustomerDto.builder().name("Maung Maung").dateOfBirth("5/1/1970").address("Mars")
						.contactNumber("000000")
						.favoriteItemss(Arrays.asList(itemRepository.findByName("pancake"),
								itemRepository.findByName("cupcake"), itemRepository.findByName("cheesecake")))
						.build());
			} catch (ParseException e) {
				e.printStackTrace();
			}
			try {
				this.create(
						CustomerDto.builder().name("Maw Maw").dateOfBirth("4/8/2000").address("Venus")
								.contactNumber("09333333")
								.favoriteItemss(Arrays.asList(itemRepository.findByName("cupcake"),
										itemRepository.findByName("cookie"), itemRepository.findByName("croissant")))
								.build());
			} catch (ParseException e) {
				e.printStackTrace();
			}
			try {
				this.create(CustomerDto.builder().name("Moe Moe").dateOfBirth("5/2/1970").address("Mars")
						.contactNumber("000000")
						.favoriteItemss(Arrays.asList(itemRepository.findByName("pancake"),
								itemRepository.findByName("cupcake"), itemRepository.findByName("cheesecake")))
						.build());
			} catch (ParseException e) {
				e.printStackTrace();
			}

			try {
				this.create(CustomerDto.builder().name("Scarlett Johansson").dateOfBirth("5/4/1970").address("Mars")
						.contactNumber("000000")
						.favoriteItemss(Arrays.asList(itemRepository.findByName("pancake"),
								itemRepository.findByName("cupcake"), itemRepository.findByName("cheesecake")))
						.build());
			} catch (ParseException e) {
				e.printStackTrace();
			}
			try {
				this.create(CustomerDto.builder().name("Jennifer Lawrence").dateOfBirth("5/5/1970").address("Mars")
						.contactNumber("000000")
						.favoriteItemss(Arrays.asList(itemRepository.findByName("pancake"),
								itemRepository.findByName("cupcake"), itemRepository.findByName("cheesecake")))
						.build());
			} catch (ParseException e) {
				e.printStackTrace();
			}
			try {
				this.create(CustomerDto.builder().name("Emma Watson").dateOfBirth("11/6/1970").address("Mars")
						.contactNumber("000000")
						.favoriteItemss(Arrays.asList(itemRepository.findByName("pancake"),
								itemRepository.findByName("cupcake"), itemRepository.findByName("cheesecake")))
						.build());
			} catch (ParseException e) {
				e.printStackTrace();
			}
			try {
				this.create(CustomerDto.builder().name("Anne Hathaway").dateOfBirth("18/6/1970").address("Mars")
						.contactNumber("000000")
						.favoriteItemss(Arrays.asList(itemRepository.findByName("pancake"),
								itemRepository.findByName("cupcake"), itemRepository.findByName("cheesecake")))
						.build());
			} catch (ParseException e) {
				e.printStackTrace();
			}
			try {
				this.create(CustomerDto.builder().name("Natalie Portman").dateOfBirth("25/7/1970").address("Mars")
						.contactNumber("000000")
						.favoriteItemss(Arrays.asList(itemRepository.findByName("pancake"),
								itemRepository.findByName("cupcake"), itemRepository.findByName("cheesecake")))
						.build());
			} catch (ParseException e) {
				e.printStackTrace();
			}
			try {
				this.create(CustomerDto.builder().name("Chris Evans").dateOfBirth("13/6/1981").address("Mars")
						.contactNumber("000000")
						.favoriteItemss(Arrays.asList(itemRepository.findByName("pancake"),
								itemRepository.findByName("cupcake"), itemRepository.findByName("cheesecake")))
						.build());
			} catch (ParseException e) {
				e.printStackTrace();
			}
			try {
				this.create(CustomerDto.builder().name("Robert Downey").dateOfBirth("4/4/1981").address("Mars")
						.contactNumber("000000")
						.favoriteItemss(Arrays.asList(itemRepository.findByName("pancake"),
								itemRepository.findByName("cupcake"), itemRepository.findByName("cheesecake")))
						.build());
			} catch (ParseException e) {
				e.printStackTrace();
			}
			try {
				this.create(CustomerDto.builder().name("Jennifer Lawrence").dateOfBirth("15/11/1990").address("Mars")
						.contactNumber("123456789")
						.favoriteItemss(Arrays.asList(itemRepository.findByName("pancake"),
								itemRepository.findByName("cupcake"), itemRepository.findByName("cheesecake")))
						.build());
			} catch (ParseException e) {
				e.printStackTrace();
			}

			try {
				this.create(CustomerDto.builder().name("Channing Tatum").dateOfBirth("26/4/1981").address("Mars")
						.contactNumber("000000")
						.favoriteItemss(Arrays.asList(itemRepository.findByName("pancake"),
								itemRepository.findByName("cupcake"), itemRepository.findByName("cheesecake")))
						.build());
			} catch (ParseException e) {
				e.printStackTrace();
			}
			try {
				this.create(CustomerDto.builder().name("George Clooney").dateOfBirth("6/5/1981").address("Mars")
						.contactNumber("000000")
						.favoriteItemss(Arrays.asList(itemRepository.findByName("pancake"),
								itemRepository.findByName("cupcake"), itemRepository.findByName("cheesecake")))
						.build());
			} catch (ParseException e) {
				e.printStackTrace();
			}
		}

	}

}
