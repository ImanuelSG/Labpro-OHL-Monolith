# Proflix - Labpro OHL

This project was created to fulfill the third task of the Programming Laboratory selection process. Proflix is a simple monolithic website that allows users to buy, watch, review, and add movies to their wishlist. The site is built using Handlebars, TailwindCSS, and NestJS.

# Author

**Name** : Imanuel Sebastian Girsang
**NIM** : 13522058

# How to run

1. Clone this repository

```bash
git clone https://github.com/ImanuelSG/Labpro-OHL-Monolith
cd Labpro-OHL-Monolith
```

2. Run `npm install` in the root directory

```bash
npm install
```

3. Fill in the `.env` file with the following content

```bash

DATABASE_URL="YOUR_DATABASE_URL"
CLOUDINARY_CLOUD_NAME="YOUR_CLOUD_NAME"
CLOUDINARY_API_KEY="YOUR_API_KEY"
CLOUDINARY_API_SECRET="YOUR_API_SECRET"
JWT_SECRET="YOUR_JWT_SECRET"
PORT=3000
```

4. Migrate and seed the database by doing the following command

```bash
npm run db:full
```

5. Open Docker and run the following command

```bash
docker-compose up --build
```

6. The App should be up and running

# Design Pattern Used

1. Dependency Injection
   Dependency Injection is used to inject the necessary services into controllers, ensuring loose coupling between controllers and services. This pattern is a natural fit for a NestJS application, which uses the @Injectable decorator to inject dependencies such as PrismaService, CloudinaryService, JWTService, etc.
2. MVC Pattern
   The MVC (Model-View-Controller) pattern is employed to separate concerns: Models define the database schema, Views handle the UI, and Controllers contain the application logic. This pattern also supports Server-Side Rendering (SSR) via the template engine by passing data from the controller to the view.
3. Decorator Pattern
   The decorator pattern is inherent to NestJS and is used to define routes cleanly and concisely. For example, the @Controller decorator defines controllers, while the @Get, @Post, @Put, and @Delete decorators define routes.

# Technologies Used

1. NestJS v8.0.0
   Main framework for building the backend and routing.
2. Handlebars v4.2.0
   Templating engine for rendering the frontend.
3. TailwindCSS v3.4.10
   Used as the main CSS framework for the app to style the FE.
4. Prisma v5.18.0
   Used as the main ORM for the app to interact with the database.
5. Cloudinary
   Used as the main image and video storage for the app to store the images and video of the movies.
6. NeonDB
   Used as the main database for the app to store the data of the app.
7. Bcrypt v5.1.1
   Used as the main hashing algorithm for the app to hash the password of the users.
8. Nest/jwt v10.2.0
   Used as the main JWT library for the app to authenticate the users.
9. Multer v1.4.5 and Multer-storage cloudinary v4.0.0
   Used as the main library to help upload the images and videos to cloudinary.
10. Class validator v0.14.1 and Class transformer v0.5.1
    Used as the main library to validate the data of the app.
11. Swagger
    Used as the main library to document the API of the app.
12. Railway
    Used to deploy the app to the cloud.

# Endpoints made

| ENDPOINT            | METHOD | DESCRIPTION                                                            |
| ------------------- | ------ | ---------------------------------------------------------------------- |
| /login              | POST   | Login endpoint for admin                                               |
| /self               | GET    | Get the current admin                                                  |
| /logout             | POST   | Logout the current admin                                               |
| /films              | POST   | Create a new film                                                      |
| /films              | GET    | Get all films                                                          |
| /films/id           | GET    | Get a film by id                                                       |
| /films/id           | PUT    | Update a film by id                                                    |
| /films/id           | DELETE | Delete a film by id                                                    |
| /users              | GET    | Get all users                                                          |
| /users/id           | GET    | Get a user by id                                                       |
| /users/id           | DELETE | Delete a user by id                                                    |
| /users/register     | POST   | Register a new User                                                    |
| /users/id/balance   | POST   | Increment the users balance                                            |
| /web-films/films    | GET    | Get all films for the web (with added data)                            |
| /web-films/id       | GET    | Get data for specific film including review, transaction, and wishlist |
| /web-auth/login     | POST   | Login endpoint for user                                                |
| /web-auth/logout    | POST   | Logout the current user                                                |
| /reviews/filmId     | POST   | Create a review for the filmId by                                      |
| /reviews/filmId     | GET    | Get all reviews from a certain filmId id                               |
| /wishlist/filmId    | PATCH  | Toggle the wishlist status of the filmId from a certain user           |
| /transaction/filmId | POST   | Buys a film for the user                                               |
| /transaction        | GET    | Get all bought films for the user                                      |

There are also 6 more endpoints that are used for the Frontend Routing of the website.

# Bonuses Done

## B02 - Deployment

The website is deployed in https://labpro-production.up.railway.app/

## B05 - Lighthouse

1. Register Page
2. Login Page
3. Home Page
4. Detail Movie Page
5. Wishlist Page
6. Bought Films Page

## B06 - Responsive Layout

The deployed website is responsive up to 350px width. It is mainly done by using flexboxes and grid layout in tailwindcss.s

## B07 - API Documentation

The API Documentation is made using Swagger and can be accessed in
https://labpro-production.up.railway.app/docs or in the local machine in
/docs route

## B08 - SOLID

1. Single Responsibility Principle
   The Single Responsibility Principle is used in this project to ensure that each class has only one responsibility. This is done by separating the concerns of the application into different classes. For example, the PrismaService is used to interact with the database, the CloudinaryService is used to interact with the cloudinary API, the JWTService is used to interact with the JWT API, and the Controller is used to define the routes of the application. This is done to ensure that each class has only one responsibility.
2. Open/Closed Principle
   The Open/Closed Principle is used in this project to ensure that the classes are open for extension but closed for modification. This is done by using the Dependency Injection pattern to inject the services that are needed in the controller. This is done to ensure that the controller is not tightly coupled with the services that are used in the application. This is done to ensure that the classes are open for extension but closed for modification.
3. Liskov Substitution Principle
   The Liskov Substitution Principle is used in this project to ensure that the subclasses can be substituted for the superclass. This is done by using the Dependency Injection pattern to inject the services that are needed in the controller. This is done to ensure that the controller is not tightly coupled with the services that are used in the application. This is done to ensure that the subclasses can be substituted for the superclass.
4. Interface Segregation Principle
   The Interface Segregation Principle is used in this project to ensure that the interfaces are small and focused. This is done by using the Dependency Injection pattern to inject the services that are needed in the controller. This is done to ensure that the controller is not tightly coupled with the services that are used in the application. This is done to ensure that the interfaces are small and focused.
5. Dependency Inversion Principle
   The Dependency Inversion Principle is used in this project to ensure that the high-level modules do not depend on the low-level modules. This is done by using the Dependency Injection pattern to inject the services that are needed in the controller. This is done to ensure that the controller is not tightly coupled with the services that are used in the application. This is done to ensure that the high-level modules do not depend on the low-level modules.

## B10 - Aditional Features

1. Wishlist
   The wishlist feature is made to allow users to add movies to their wishlist. This is done by using the PATCH method to toggle the wishlist status of the filmId from a certain user.
2. Rating and Review
   The rating and review feature is made to allow users to rate and review movies. This is done by using the POST method to create a review for the filmId by the user. Only users that have bought the movie can review the movie.
3. Recommended Films based on genre
   On Films detail page there is also recommended similar film accordint to the matching of their genre.

## B11 - Ember

Image and Video is stored in a cloudinary server. The image and video is uploaded to the cloudinary server using the Multer library and the Multer-storage-cloudinary library. The image and video is then stored in the cloudinary server and the URL of the image and video is then stored in the database. Max Upload size is 100 mb
