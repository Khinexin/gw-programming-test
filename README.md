# Test Project for GW



### Question-1 [gw-programming-test-one]
- Provided there are two strings. Please write the code to check if the
strings are anagrams of each other.
- Please output True if there are anagrams, and False if there
are not.


### Question-2 [gw-programming-test-two]
- Given a single string input, please write the code to get the first
character of the string that is repeated.
- Please output the first character if there are repeated
characters.
- Please output None if there are no repeated characters.


### Question-3 [gw-programming-test-three]
- Suppose you are doing an online small bakery business and you
want to collect your customer information to improve customer
engagement for your business.
- Suppose you can collect customer information such as name,
birthdate, gender, address, contact number and favorite item
from your regularly available item list (pancakes, cupcakes,
cheesecake, cookies donuts and croissant). Please make a
form to collect the above information from your customers.
- Since your business has a lot of customers, please create a
table to show the list of your customer information. A new row
should be added to the table whenever a new record from the
form is submitted (Each row is each customer’s information).
- Please create a feature that can filter customers by their
favorite item field and show the result in the table so that you
can easily see which customers have the same favorite item
(i.e you can easily group the customers who like cheesecake).
- [Optional bonus point] Please create a feature that can -
-- Filter customers who have birthdays in the current
month so that you can give some discounts on their
birthday month purchases to promote your sale.
-- Sort the table by their birthdays to know whose birthday
comes first in the current month so that you can decide
on which customers you should prioritize for your sale
promotion.

## Requirements for [gw-programming-test-three]

For building and running the application you need:

- [JDK 1.8](http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html)
- [Maven 3](https://maven.apache.org)
- Node 18.12.1 or higher

## Running the application locally the server-side app

There are several ways to run a Spring Boot application on your local machine. One way is to execute the `main` method in the `D:\my_workspace\git_workspace\gw-programming-test\src\main\java\com\test\gw\gwprogrammingtest.GwProgrammingTestApplication` class from your IDE.

Alternatively you can use the [Spring Boot Maven plugin](https://docs.spring.io/spring-boot/docs/current/reference/html/build-tool-plugins-maven-plugin.html) like so:

```shell
$ mvn clean install
$ mvn spring-boot:run
```
## Running the application locally the client-side app

```shell
$ cd gw-electron-client-workspace
$ npm install
$ npm start
```

## Libraries used for backend
- Spring Boot
- Spring MVC (Spring Web)
- Spring Data JPA with Hibernate
- Spring for GraphQL
- MySql
- lombok
## Libraries used for frontend/desktop application
- angular 15
- electron
- bootstrap 5

## Configure MySQL
- Update the application.properties file in the `src/main/resources` folder with the URL, 'username' and 'password' for your MySQL instance. The table schema for the Customer objects will be created for you in the database.