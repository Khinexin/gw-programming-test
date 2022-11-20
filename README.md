# Test Project for Application Software Programmer [Solution 3]

## Requirements

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