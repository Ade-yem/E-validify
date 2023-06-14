const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const axios = require('axios');
const session = require('express-session');
const bcrypt = require('bcryptjs');
require('dotenv').config();
const crypto = require('crypto');
// import User
const User = require('./models/userModel.js');
const MongoBDStore = require('connect-mongodb-session')(session);

const generateSecretKey = () => {
  return crypto.randomBytes(32).toString('hex');
};

const app = express();

app.use(express.json());
const corsOptions = {
  // origin: process.env.FRONTEND_URL,
};
app.use(cors());
app.use(express.urlencoded({ extended: true }));
// connect to mongodbstore
const store = new MongoBDStore({
  uri: process.env.mongoURI,
  collection: 'sessions'
});
store.on('error', function (error) {
  console.log(error);
});

// create app session

app.use(
  session({
    secret: generateSecretKey(),
    resave: true,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 // 1 hour
    },
    store: store
  })
);

// connect to mongodb
const db = process.env.mongoURI;
mongoose
  .connect(db)
  .then(() => console.log('💻 Mondodb Connected'))
  .catch(err => console.error(err));

app.get('/', (req, res) => {
  res.send('Server working 🔥');
});

// Registeration endpoint
app.post('/register', async (req, res) => {
  const { username, name, email, password } = req.body;
  try {
    // check if user exists
    const existingUser = await User.findOne({ username: username });
    if (existingUser && existingUser.length !== 0) {
      return res.status(409).json({ message: 'Username already taken' });
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
    // create a session
    req.session.user = newUser;
    req.session.save();
    res.status(201).json({ message: 'User registered successfully', user: newUser });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Login endpoint
app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    // check if user exists
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    // check if password is correct
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    // create a session
    req.session.user = user;
    req.session.save((err) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ message: 'Internal server error' });
      }
    });
    res.status(201).json({ message: 'User registered successfully', user: user });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// User logout endpoint
app.post('/logout', async (req, res) => {
  try {
    await req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ message: 'Internal server error' });
      }
      res.clearCookie('sid');
      res.status(200).json({ message: 'User logged out successfully' });
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Email validation endpoint
app.post('/validate', async (req, res) => {
  try {
    const { email, userId } = req.body;
    // check if user is authenticated
    // console.log(req.session.user);
    const isAuthenticated = req.session.user !== undefined;
    // Create url options for the fetch request
    const options = {
      method: 'GET',
      url: 'https://mailcheck.p.rapidapi.com/',
      params: {
        domain: email
      },
      headers: {
        'X-RapidAPI-Key': process.env.API_KEY,
        'X-RapidAPI-Host': process.env.API_HOST
      }
    };
    // use axios to get the response from the API
    const response = await axios.request(options);
    const result = await response.data;
    if (isAuthenticated || userId) {
      // Save the email to the database

      const id = userId || req.session.user._id;
      console.log(id)
      const updatedUser = await User.findByIdAndUpdate(
        id,
        { $push: { emails: { email: email, details: result } } },
        { new: true }
      );
      console.log(updatedUser);
      if (updatedUser) {
        console.log("saved")
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

// Get User endpoint with userid
app.get('/user/:id', async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);
    if (user) {
      res.json({ message: 'User found', user: user });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

const port = process.env.PORT || 3000;

app.listen(port, () => 'Server running on port port 🔥');
