const express = require('express');
const bcrypt = require('bcryptjs');
const { Sequelize, DataTypes } = require('sequelize');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const cors = require('cors');

const app = express();
const port = 3000;

// Create a Sequelize instance and connect to the MySQL database
const sequelize = new Sequelize('validify_db', 'validify', 'validify_pwd', {
  host: 'localhost',
  dialect: 'mysql'
});

// Define a User model
const User = sequelize.define('User', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

// Define Email model
const Email = sequelize.define('Email', {
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  details: {
    type: DataTypes.JSON,
    allowNull: false,
    defaultValue: {}
    }
});

// Define relationship between User and Email
User.hasMany(Email, { foreignKey: 'user_id' });
Email.belongsTo(User, { foreignKey: 'user_id' });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
    store: new SequelizeStore({
      db: sequelize
    })
  })
);
app.use(cors()); // Enable CORS

// User registration endpoint
app.post('/register', async (req, res) => {
  try {
    const { name, username, email, password } = req.body;
    // Check if username is already taken
    const existingUser = await User.findOne({ where: { username: username } });
    if (existingUser) {
      return res.status(409).json({ message: 'Username already taken' });
    }
    // Generate salt and hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    // Create a new user
    await User.create({
      name: name,
      username: username,
      email: email,
      password: hashedPassword
    }).then((user) => {
      req.session.user = user;
      res.status(201).json({ message: 'User registered successfully', user: user });
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// User login endpoint
app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    // Find the user with the provided email
    const user = await User.findOne({ where: { email: email } });
    // Check if the user exists
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    // Compare the provided password with the stored hashed password
    const passwordMatch = await bcrypt.compare(password, user.password);
    // Check if the passwords match
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    // Create a session after login
    req.session.user = user;
    // User login successful
    res.json({ message: 'User logged in successfully', user_id: user.id });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// User logout endpoint
app.post('/logout', (req, res) => {
  // Perform any necessary logout logic (e.g., clear session, tokens, etc.)
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ message: 'Internal server error' });
    }
    res.json({ message: 'User logged out successfully' });
  });
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

// Email validation endpoint
app.post('/validate', async (req, res) => {
    try {
        const { email } = req.body;
        const isAuthenticated = req.session.user !== undefined;
        // Create url options for the fetch request
        const url = `https://mailcheck.p.rapidapi.com/?domain=${email}`;
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': '6f999abc05msha0292f7decce763p1bcbe4jsn9fbbb20e0536',
                'X-RapidAPI-Host': 'mailcheck.p.rapidapi.com'
            }
            };
        // Fetch the response from the API
        const response = await fetch(url, options);
        const result = await response.json();
        if (isAuthenticated) {
            // Save the email to the database
            const newEmail = await Email.create({
                email: email,
                user_id: req.session.user.id,
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
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Get emails
app.get('/emails', async (req, res) => {
    try {
        const isAuthenticated = req.session.user !== undefined;
        if (isAuthenticated) {
            const emails = await Email.findAll({ where: { user_id: req.session.user.id } });
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


// User profile endpoint
app.get('/profile', async (req, res) => {
  const user = req.session.user;
  if (!user) {
    return res.status(401).json({ message: 'Not logged in' });
  } else {
    return res.json({ message: 'User profile retrieved successfully', user: user });
  }
});

// Sync the models with the database and start the server
sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
});
