# Assignment 3: Registration & Login (Web Technologies - Back End)

## Student

Name: Merey Ibraim
Group: SE-2308

## Project Overview

This project implements a user registration and login system using Node.js and PostgreSQL.
It allows users to create an account, log in, and view a personalized welcome page.

## Setup & Installation

1. Install dependencies:
   Ensure you have Node.js and PostgreSQL installed.
   Then, install the necessary dependencies:
   ```bash
   npm install
   ```
3. Start PostgreSQL and create the `Users` database:
   ```sql
   CREATE DATABASE Users;
   ```
   Inside the `Users` database, create the `users` table:
   ```sql
   CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
   );
   ```
4. Start the server:
   ```bash
   node index.js
   ```
5. Open in browser:
   - Registration: [http://localhost:8080](http://localhost:8080)
   - Login: [http://localhost:8080/login](http://localhost:8080/login)

## How It Works?

### User Registration
- A user enters their *username, email, and password* in the *registration form* (`index.html`).
- The server (`index.js`):
    - Hashes the password using `bcrypt.js`.
    - Stores the user in the PostgreSQL `users` table.
- After successful registration, the user is redirected to the *login page* (`/login`).
### User Login
- The user enters *email & password* on the *login page* (`login.html`).
- The server:
    - Checks if the email exists in the database.
    - Compares the hashed password.
    - If successful, generates a *JWT token* and redirects to welcome page (`/welcome.html?username=...`).
### Welcome Page
- After login, the *username* is extracted from the URL.
- A *personalized welcome message* is displayed.
