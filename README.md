# E-validify

E-validify is a web application that allows users to validate email addresses using the E-mail Check Invalid or Disposable Domain API. It provides user registration, login, and logout functionality, allowing authenticated users to validate email addresses conveniently.

The application is built using Flask, Flask-CORS for cross-origin resource sharing, and Flask-Login for user authentication. It leverages the E-mail Check Invalid or Disposable Domain API from RapidAPI to perform email validation.

## Features

- User registration: Users can create new accounts by providing their email, username, and password.
- User login: Registered users can log in to access the email validation feature.
- User logout: Authenticated users can log out of their accounts.
- Email validation: Users can enter an email address to validate if it is valid or associated with a disposable domain.

## Prerequisites

Before running the E-validify application, ensure you have the following:

- Python 3 installed on your machine.
- API key for the E-mail Check Invalid or Disposable Domain API from RapidAPI. (Sign up at https://rapidapi.com/) and obtain the API key.

## Installation

1. Clone the repository: `git clone <repository-url>`
2. Navigate to the project directory: `cd E-validify`
3. Create a virtual environment (optional): `python3 -m venv venv`
4. Activate the virtual environment (optional):
   - For Windows: `venv\Scripts\activate.bat`
   - For Unix or Linux: `source venv/bin/activate`
5. Install the dependencies: `pip install -r requirements.txt`

## Configuration

1. Rename the `.env.example` file to `.env`.
2. Open the `.env` file and set the following variables:
   - `SECRET_KEY`: Secret key for Flask session management. Generate a secure key.
   - `DATABASE_URI`: URI of your database (e.g., SQLite, MySQL, PostgreSQL).
   - `RAPIDAPI_KEY`: Your RapidAPI key for the E-mail Check Invalid or Disposable Domain API.

## Usage

1. Start the Flask development server:
   ```bash
   flask run
   ```
2. Open your web browser and go to `http://localhost:5000`.

## API Usage

To use the E-mail Check Invalid or Disposable Domain API, make a POST request to the `/validate` endpoint with the following JSON payload:

```json
{
  "email": "example@example.com"
}
```

The response will contain the validation result for the provided email address.

## Contributing

Contributions to E-validify are welcome! If you find any bugs or want to add new features, please submit an issue or pull request on the GitHub repository.

## License

E-validify is licensed under the [MIT License](https://opensource.org/licenses/MIT).

## Credits

- E-mail Check Invalid or Disposable Domain API by RapidAPI: https://rapidapi.com/
