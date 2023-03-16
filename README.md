# UrlShortenerSystem

This project was generated with **OpenJDK 17** and **Angular CLI version 14.2.1**.

## Running the Application

The API works with an H2 in-memory database. For running the application, one just need to install dependencies and start the JAR:

```shell
    cd api
    mvn clean install
    mvn spring-boot:run
```

- Open your browser on the URL [http://localhost:8080](http://localhost:8080).
- A user is already provided upon starting the application username: **root@xyz.com** and password: **root**.
- You can also create a new user by clicking the corresponding displayed on the starting page.

## Run from Docker

This application can also be run from docker; you just need to build the Docker from the provided docker file then run it:

```shell
docker build -t your-org/url-shortener-system .
docker run -p 8080:8080 your-org/url-shortener-system
```

## Build

- For building the Spring Boot application, just run the following commands:

```shell
    cd api
    mvn clean install
```

- For building the Angular application, one can run

```shell
    cd web
    ng build
```

Then copy the content of the dist folder into **api/src/main/resources/public**.
Or if you are on a Windows machine, you can directly run:

```shell
    cd web
    npm run build:java
```

The generated files will be automatically copied to target folder.

## Running unit tests and coverage

### Spring Boot API

For running the unit tests for the JAVA application, simply run `mvn test`.<br/>
The test coverage can be seen by browsing the file **api/target/site/jacoco/index.html**.
The feature coverage can be seen by browsing the file **api/target/cucumber-reports/index.html**.

### Angular

For running the unit tests for the Angular application, simply run `ng test` or `ng test --code-coverage` for also generating coverage information.<br/>
The coverage result can be seen by browsing the file **web/coverage/url-shortener-system/index.html**.
