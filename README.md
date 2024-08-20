# Sama E-commerce API

This is a RESTful API for an e-commerce application, built using Node.js, Express.js, MongoDB, and Mongoose. The API includes JWT-based authentication, user and product management, and integrates with Redux on the frontend.

## Features

- **Authentication**: JWT-based authentication for secure access.
- **User Management**: Create, read, update, and delete users.
- **Product Management**: CRUD operations on products, including categories, sizes, and colors.
- **Order Management**: Handle orders and payments.
- **Middleware**: Error handling, authentication, and more.

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/Siymiel/sama-ecommerce-api.git
    cd sama-ecommerce-api
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Set up your environment variables:
    - Create a `.env` file in the root directory.
    - Add the following variables:

      ```plainText
      MONGO_URI=<Your MongoDB URI>
      JWT_SECRET=<Your JWT Secret>
      PASSWORD_PHRASE=<Your Encryption Phrase>
      ```

4. Start the server:
    ```bash
    npm start
    ```

## API Endpoints

- **Users**
  - `POST /api/register`: Register a new user.
  - `POST /api/login`: Login a user.
  - `GET /api/users`: Get all users (Admin).
  - `GET /api/users/:id`: Get user by ID (Admin).

- **Products**
  - `POST /api/products`: Create a new product.
  - `GET /api/products`: Get all products.
  - `GET /api/products/:id`: Get product by ID.
  - `PUT /api/products/:id`: Update product by ID.
  - `DELETE /api/products/:id`: Delete product by ID.

- **Orders**
  - `POST /api/orders`: Create a new order.
  - `GET /api/orders`: Get all orders (Admin).
  - `GET /api/orders/:userId`: Get orders by user ID.

## Technologies Used

- **Node.js**: Server-side JavaScript runtime.
- **Express.js**: Web application framework for Node.js.
- **MongoDB**: NoSQL database.
- **Mongoose**: ODM for MongoDB.
- **JWT**: JSON Web Tokens for authentication.
- **Bcrypt**: Password hashing.
- **Redux**: State management on the frontend.
- **Slugify**: Generate slug from title when creating products.

## License

This project is licensed under the MIT License.
