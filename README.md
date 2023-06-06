# E-Validify

E-Validify is a web application that allows users to register, login, and validate email contents. It provides a user-friendly interface for managing user accounts, sending emails for validation, and viewing previously sent emails.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)

## Features

- User registration: Users can create a new account by providing their name, username, email, and password.
- User login/logout: Registered users can log in and out of their accounts securely.
- User profile: Users can view their profile information, including their name, username, and email.
- Email validation: Users can send an email for validation, and the system will check its contents for validity.
- Email history: Users can view a list of their previously sent emails, including the validation status and timestamp.

## Technologies Used

- Node.js: JavaScript runtime environment for server-side development.
- Express.js: Web application framework for building RESTful APIs.
- Sequelize ORM: Object-Relational Mapping library for database interactions.
- MySQL: Relational database management system for storing user and email data.
- bcrypt: Library for password hashing and verification.

## Installation

1. Clone the repository to your local machine.
2. Install Node.js and MySQL if not already installed.
3. Create a new MySQL database.
4. Create a `.env` file in the root directory and add the following variables:

    ```
    DATABASE_URL=your_mysql_database_url
    ```

5. Run the following command to install the required dependencies:

    ```bash
    npm install
    ```

6. Start the server by running the following command:

    ```bash
    npm start
    ```

7. Access the application by opening `index.html` in the `client` directory in your browser.

## Usage

1. Open the E-Validify application in your browser.
2. Register a new account by clicking the "Sign Up" button and filling out the registration form.
3. Log in to your account by clicking the "Log In" button and entering your email and password.
4. View your profile information by clicking the "Profile" button.
5. Send an email for validation by filling out the email form on the home page and clicking the "Submit" button.
6. View a list of your previously sent emails on the profile page.

## API Endpoints

| Endpoint     | Description                                |
| ------------ | ------------------------------------------ |
| POST /register    | Creates a new user account.                      |
| POST /login       | Logs in a user and returns a JSON Web Token.     |
| POST /logout      | Logs out a user and destroys their session.      |
| GET /profile      | Retrieves the user's profile information.        |
| POST /validate    | Sends an email for validation.                   |
| GET /emails       | Retrieves a list of previously sent emails.      |

## Contributing

Contributions to the E-Validify project are welcome! If you find any issues or have suggestions for improvements, please open an issue or submit a pull request.

When contributing, please ensure that you follow the existing code style and conventions, write clear commit messages, and provide appropriate documentation for any new features or changes.

## License

The E-Validify project is licensed under the [MIT License](LICENSE).

---

Feel free to customize this `README.md` file according to

 your specific project requirements and add more details as needed.
