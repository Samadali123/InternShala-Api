# Internshala-like API

This project is a RESTful API for an Internshala-like application built using Express.js, MongoDB, and Node.js. It includes features for authentication, authorization, managing internships and jobs, and user roles (student and HR manager).

## Table of Contents
- [Demo](#demo)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Demo
You can see a live demo of the project [here](#).

## Features
- User authentication and authorization
- Password management (forgot password and reset password)
- Create, read, update, and delete internships
- Create, read, update, and delete jobs
- Apply for internships and jobs
- User roles: student and HR manager

## Technologies Used
- [Express.js](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Node.js](https://nodejs.org/)
- [JWT (JSON Web Tokens)](https://jwt.io/)
- [Nodemailer](https://nodemailer.com/)
- [bcrypt](https://www.npmjs.com/package/bcrypt)

## Installation
1. Clone the repository:
    ```bash
    git clone https://github.com/yourusername/internshala-api.git
    cd internshala-api
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Create a `.env` file in the root directory and add the following environment variables:
    ```env
    PORT=5000
    MONGODB_URI=your_mongodb_uri
    JWT_SECRET=your_jwt_secret
    EMAIL_SERVICE=your_email_service
    EMAIL_USER=your_email_user
    EMAIL_PASS=your_email_password
    ```

4. Run the development server:
    ```bash
    npm run dev
    ```

5. The server will be running at `http://localhost:5000`.

## Usage
- **User Registration**: Register as a student or an HR manager.
- **User Login**: Login with your registered credentials.
- **Forgot Password**: Request a password reset link to be sent to your email.
- **Reset Password**: Reset your password using the link sent to your email.
- **Create Internships and Jobs**: HR managers can create new internships and job postings.
- **Apply for Internships and Jobs**: Students can apply for available internships and job postings.
- **Manage Internships and Jobs**: HR managers can update or delete their posted internships and jobs.

## Project Structure
