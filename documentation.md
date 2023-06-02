# E-validify Project Documentation

E-validify is a web application that provides email validation services. It is built using Python and Flask framework. The application allows users to sign up, sign in, and update their profile information. It also provides the functionality to delete a user account.

The application uses a MySQL database to store user information and SQLAlchemy as the ORM. The database is accessed through a custom storage class that provides methods for querying, adding, updating, and deleting objects from the database.

The application uses Flask-Login to manage user authentication and authorization. Passwords are encrypted using the md5 algorithm before being stored in the database.

The email validation service is provided by a third-party API called E-mail Check Invalid or Disposable Domain. The API is accessed using the RapidAPI platform.

The application is structured using the Model-View-Controller (MVC) design pattern. The models are defined in separate files and inherit from a base model class that provides common functionality such as saving and deleting objects. The views are defined in separate files and provide the endpoints for the API. The controllers are defined in separate files and provide the logic for handling requests and responses.

The application is documented using Swagger. The documentation provides information about the endpoints, their parameters, and their responses. It also provides information about the data models used in the application.

Overall, E-validify is a simple and easy-to-use email validation service that provides basic user management functionality.



## Table of Contents

1. [Installation](#installation)
2. [Configuration](#configuration)
3. [API Setup](#api-setup)
4. [User Authentication](#user-authentication)
5. [Endpoints](#endpoints)
6. [Error Handling](#error-handling)
7. [Conclusion](#conclusion)

## Installation

To set up the E-validify project, follow these steps:

1. Clone the project repository from GitHub:

   ```bash
   git clone <repository_url>
   ```

2. Navigate to the project directory:

   ```bash
   cd e-validify
   ```

3. Create a virtual environment (optional but recommended):

   ```bash
   python3 -m venv env
   source env/bin/activate
   ```

4. Install the project dependencies:

   ```bash
   pip install -r requirements.txt
   ```

## Configuration

Before running the application, you need to configure the necessary settings. Open the `config.py` file in the project directory and modify the following variables:

- `SECRET_KEY`: Set this to a secure secret key for your application.
- `SQLALCHEMY_DATABASE_URI`: Set the URI for your database.

## API Setup

The E-validify project uses the E-mail Check Invalid or Disposable Domain API from RapidAPI to validate email addresses. To use this API, you need to sign up for a RapidAPI account and obtain an API key.

1. Sign up for a RapidAPI account at [https://rapidapi.com/](https://rapidapi.com/).
2. Search for the "E-mail Check Invalid or Disposable Domain" API and subscribe to it.
3. Obtain your API key from RapidAPI.
4. Open the `config.py` file and set the `RAPIDAPI_KEY` variable to your API key.

## User Authentication

The E-validify application provides user authentication functionalities using Flask-Login.

- User Registration: Users can sign up for an account by providing their email address, username, names and password.

- User Login: Registered users can log in to the application using their email and password.

- User Logout: Logged-in users can log out of the application.

## Endpoints

The E-validify project exposes the following API endpoints:

- `POST /signup`: Create a new user account.
  - Request body parameters:
    - `email`: The user's email address.
    - `username`: The desired username.
    - `password`: The user's password.
    - `first_name`: The user's first name.
    - `last_name`: The user's last name.

  - Response:
    - `200 OK`: User account created successfully.
    - `400 Bad Request`: Invalid request parameters.

- `POST /login`: Authenticate a user and generate a session.
  - Request body parameters:
    - `email`: The user's email address.
    - `password`: The user's password.
  - Response:
    - `200 OK`: User authenticated successfully.
    - `401 Unauthorized`: Invalid email or password.

- `POST /logout`: Log out the currently logged-in user.
  - Response:
    - `200 OK`: User logged out successfully.
    - `401 Unauthorized`: User not logged in.

- `POST /validate`: Validate an email address using the E-mail Check Invalid or Disposable Domain API.
  - Request body parameters:
    - `email`: The email address to validate.
  - Response:
    - `200

 OK`: Email address validated successfully.
      - Response body:
        - `is_valid`: Boolean indicating if the email is valid.
        - `is_disposable`: Boolean indicating if the email is from a disposable domain.
    - `400 Bad Request`: Invalid request parameters.
    - `401 Unauthorized`: User not logged in.

- `POST /validate-guest`: Validate an email address for guest user using the E-mail Check Invalid or Disposable Domain API.
  - Request body parameters:
    - `email`: The email address to validate.
  - Response:
    - `200

 OK`: Email address validated successfully.
      - Response body:
        - `is_valid`: Boolean indicating if the email is valid.
        - `is_disposable`: Boolean indicating if the email is from a disposable domain.
    - `400 Bad Request`: Invalid request parameters.
    - `401 Unauthorized`: User not logged in.

## Error Handling

The E-validify project implements error handling for various scenarios. The API endpoints return appropriate HTTP status codes and error messages in case of errors. The following error codes are used:

- `400 Bad Request`: Invalid request parameters or malformed request.
- `401 Unauthorized`: User authentication required or invalid credentials.
- `404 Not Found`: Requested resource or endpoint not found.
- `500 Internal Server Error`: Internal server error or unexpected error occurred.

Error responses are returned in JSON format and include an error message describing the issue.

## Conclusion

The E-validify project is a Flask-based web application that allows users to validate email addresses using the E-mail Check Invalid or Disposable Domain API. It provides user authentication functionalities for user registration, login, and logout. The project is built using Flask, Flask-CORS, and Flask-Login, and it follows RESTful principles for API design.

By following the installation and configuration steps outlined in this documentation, you can set up and run the E-validify project on your local environment. Use the provided endpoints to interact with the API and validate email addresses effectively.

## Authors
- Adeyemi Adejumo - [email] (adejumoadeyemi32@gmail.com)
- Princewill Onyema - [email] (Princewillodinakachukwu@gmail.com)