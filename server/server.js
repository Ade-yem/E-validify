const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const session = require("express-session");
const bcrypt = require("bcryptjs");
require("dotenv").config();
const crypto = require('crypto');
// import User and Email models
const User = require('./models/userModel.js');
const Email = require('./models/emailModel.js');

const generateSecretKey = () => {
  return crypto.randomBytes(32).toString('hex');
}

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
// create app session
app.use(
  session({
    secret: generateSecretKey(),
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 // 1 hour
    }
  })
);

const db = process.env.mongoURI;


mongoose
  .connect(db)
  .then(() => console.log("💻 Mondodb Connected"))
  .catch(err => console.error(err));

app.get("/", (req, res) => {
  res.send("Server working 🔥");
});

// Registeration endpoint
app.post("/register", async (req, res) => {
  const { username, name, email, password } = req.body;
  try {
    // check if user exists
    const existingUser = await User.find({ username: username });
    if (existingUser && existingUser.length !== 0) {
      return res.status(409).json({ message: "Username already taken" });
    }
    // generate salt and hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    // create a new user
    const newUser = await User.create({
      username: username,
      name: name,
      email: email,
      password: hashedPassword
    });
    req.session.user = newUser;
    res.status(201).json({ message: "User registered successfully", user: newUser });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
});
// Login endpoint
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    // check if user exists
    const user = await User.find({ email: email });
    if (user && user.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }
    // check if password is correct
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    req.session.user = user;
    res.status(200).json({ message: "User logged in successfully", user: user });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

// User logout endpoint
app.get("/logout", async (req, res) => {
  try {
    await req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ message: "Internal server error" });
      }
      res.clearCookie("sid");
      res.status(200).json({ message: "User logged out successfully" });
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Email validation endpoint
app.post('/validate', async (req, res) => {
  try {
    const { email } = req.body;
    const isAuthenticated = req.session.user!== undefined;
    // Create url options for the fetch request
    const url = `https://mailcheck.p.rapidapi.com/?domain=${email}`;
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': process.env.API_KEY,
        'X-RapidAPI-Host': process.env.API_HOST
      }
    };
    // Fetch the response from the API
    const response = await fetch(url, options);
    const result = await response.json();
    if (isAuthenticated) {
      // Save the email to the database
      const newEmail = await Email.create({
        email: email,
        user: req.session.user._id,
        details: result
      });
      if (newEmail) {
        return res.json({ message: 'Email validated successfully', result: result });
      } else {
        return res.status(500).json({ message: 'Internal server error' });
      }
    } else {
      return res.json({ message: 'Email validated', result });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Get User endpoint if authenticated
app.get('/user', (req, res) => {
  const isAuthenticated = req.session.user !== undefined;
  if (isAuthenticated) {
      res.json({ message: 'User authenticated', user: req.session.user });
  } else {
      res.status(401).json({ message: 'User not authenticated' });
  }
});


// Get emails
app.get('/emails', async (req, res) => {
  try {
    const isAuthenticated = req.session.user !== undefined;
    if (isAuthenticated) {
      const emails = await Email.find({ user_id: req.session.user._id });
    if (emails) {
      return res.json({ message: 'Emails retrieved successfully', emails: emails });
    } else {
      return res.status(500).json({ message: 'Internal server error' });
    }
    } else {
      return res.status(401).json({ message: 'Not logged in' });
    }
  }
  catch (error) {
  console.log(error);
  res.status(500).json({ message: 'Internal server error' });
  }
});

const port = process.env.PORT || 5000;

app.listen(port, () => `Server running on port port 🔥`);