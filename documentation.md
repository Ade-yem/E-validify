# E-validify Project Documentation

The E-validify project is a web application that allows users to validate email addresses using the E-mail Check Invalid or Disposable Domain API. The application also provides user authentication functionalities such as login, logout, and signup. It is built using the Flask web framework, Flask-CORS for cross-origin resource sharing, and Flask-Login for user authentication.

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

- User Registration: Users can sign up for an account by providing their email address, username, and password.

- User Login: Registered users can log in to the application using their email and password.

- User Logout: Logged-in users can log out of the application.

## Endpoints

The E-validify project exposes the following API endpoints:

- `POST /signup`: Create a new user account.
  - Request body parameters:
    - `email`: The user's email address.
    - `username`: The desired username.
    - `password`: The user's password.
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

- `POST /validate-email`: Validate an email address using the E-mail Check Invalid or Disposable Domain API.
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