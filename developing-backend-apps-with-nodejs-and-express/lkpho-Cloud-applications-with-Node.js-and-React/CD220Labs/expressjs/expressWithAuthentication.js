// Importing required modules: Express.js, JSON Web Token (JWT), and Express session
const express = require('express');
const jwt = require('jsonwebtoken');
const session = require('express-session');

let users = [];

// Function to check if the user exists
const doesExist = (username) => {
  let userswithsamename = users.filter((user) => {
    return user.username === username;
  });
  return userswithsamename.length > 0;
};

// Function to check if the user is authenticated
const authenticatedUser = (username, password) => {
  let validusers = users.filter((user) => {
    return user.username === username && user.password === password;
  });
  return validusers.length > 0;
};

const app = express();

app.use(express.json()); // Middleware to parse JSON request bodies

app.use(express.urlencoded({ extended: true })); // Middleware to parse URL-encoded bodies => uses query

app.use(session({ secret: 'fingerpint' })); // Middleware to handle sessions

// Middleware to authenticate users using JWT
app.use('/auth', function auth(req, res, next) {
  if (req.session.authorization) {
    // Get the authorization object stored in the session
    token = req.session.authorization['accessToken']; // Retrieve the token from authorization object
    jwt.verify(token, 'access', (err, user) => {
      // Use JWT to verify token
      if (!err) {
        req.user = user;
        next();
      } else {
        return res.status(403).json({ message: 'User not authenticated' });
      }
    });
  } else {
    return res.status(403).json({ message: 'User not logged in' });
  }
});

// Route to handle user login
app.post('/login', (req, res) => {
  const username = req.body.username || req.query.username; // Handle both body(json) and query(url encoded)
  const password = req.body.password || req.query.password;

  if (!username || !password) {
    return res.status(404).json({ message: 'Error logging in' });
  }

  if (authenticatedUser(username, password)) {
    let accessToken = jwt.sign(
      {
        data: password,
      },
      'access',
      { expiresIn: 60 * 60 }
    );

    req.session.authorization = {
      // token is stored in the session and can be saved in a file (e.g. .txt)
      accessToken,
      username,
    };
    return res.status(200).send('User successfully logged in');
  } else {
    return res
      .status(208)
      .json({ message: 'Invalid Login. Check username and password' });
  }
});

// Route to handle user registration
app.post('/register', (req, res) => {
  const username = req.body.username || req.query.username; // Handle both body(json) and query(url encoded)
  const password = req.body.password || req.query.password;
  if (username && password) {
    if (!doesExist(username)) {
      users.push({ username: username, password: password });
      return res
        .status(200)
        .json({ message: 'User successfully registered. Now you can login' });
    } else {
      return res.status(404).json({ message: 'User already exists!' });
    }
  }
  return res.status(404).json({ message: 'Unable to register user.' });
});

// Main endpoint to be accessed by authenticated users
app.get('/auth/get_message', (req, res) => {
  return res.status(200).json({
    message: 'Hello, You are an authenticated user. Congratulations!',
  });
});

const PORT = 5000; // Define the port number

app.listen(PORT, () => console.log('Server is running')); // Start the server and listen on the specified port

// curl localhost:5000/auth/get_message
// curl -X POST -d "username=user12&password=password12" http://localhost:5000/register
// curl -X POST "http://localhost:5000/register?username=user12&password=password12"

// logging in ans saving the token

// curl -c cookies.txt -X POST "http://localhost:5000/login?username=user12&password=password12"
// curl -b cookies.txt "http://localhost:5000/auth/get_message"
