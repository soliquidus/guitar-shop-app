# Guitar Shop App V1

A complete working e-commerce guitar shop app I developped in order to train myself on a Spring Boot/Angular application.

## Description

Angular frontend interface using as API a Spring Boot backend application. Request are sent to a MySQL Database.

User can order instruments and each order is saved to database with automatic stock management when backend recieves a new order.

## Roadmap

To come in V2 :
 - Admin management
 - User accounts
 - Instrument reparation & maintenance service
 - Stripe for simulating payments

## Installation with Docker

If not already done, install [Docker Compose](https://docs.docker.com/compose/install/other/).

In the main folder of the app execute

```bash
docker-compose up
```
## Dev environnement

 - ### MySQL Database

Go to `database` folder and use:

```
docker build -t guitar-shop-db
```
Or use whatever you want to use as DB, `init_db.sql` is located in `database` folder. Just don't forget to adjust DB configuration in the backend part.

---

- ### Spring Boot Server (v.2.7.3)

In `backend` folder with [Maven](https://maven.apache.org/) :

```
mvn clean install
mvn wrapper:wrapper 
mvn package
mvn spring-boot:run
```

In `backend` folder with `java -jar` command after jar build :

```java
java -jar target/guitarshop-1.0.jar
```

---

- ### Angular Client Interface (v.13.3)

In `frontend` folder with [npm](https://www.npmjs.com/) :
```npm
npm run start
```

## Project Status

Working on it when I have the time for 😄

## Visuals


![Guitar_shop_01](https://user-images.githubusercontent.com/67859167/213491962-916267e2-87bf-4f72-956f-77c9be61bcf1.png)


![Guitar_shop_02](https://user-images.githubusercontent.com/67859167/213491994-b3fa688f-67a2-4254-a899-fbbaf174c0d9.png)


![Guitar_shop_03](https://user-images.githubusercontent.com/67859167/213492026-6e657c4b-e4a1-4219-a450-72239aaec6ab.png)
