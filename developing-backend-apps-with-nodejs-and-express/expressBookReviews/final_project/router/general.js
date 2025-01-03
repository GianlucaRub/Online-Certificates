const express = require('express');
let books = require('./booksdb.js');
let fs = require('fs');

let isValid = require('./auth_users.js').isValid;
let users = require('./auth_users.js').users;

const public_users = express.Router();

public_users.post('/register', (req, res) => {
  const username = req.body.username || req.query.username;
  const password = req.body.password || req.query.password;

  // Check if both username and password are provided
  if (username && password) {
    // Check if the user does not already exist
    if (!isValid(username)) {
      // Add the new user to the users array
      users.push({ username: username, password: password });
      return res
        .status(200)
        .json({ message: 'User successfully registered. Now you can login' });
    } else {
      return res.status(404).json({ message: 'User already exists!' });
    }
  }
  // Return error if username or password is missing
  return res.status(404).json({ message: 'Unable to register user.' });
});

// Get the book list available in the shop
public_users.get('/', function (req, res) {
  res.send(JSON.stringify(books));
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn', function (req, res) {
  const isbn = req.params.isbn;
  if (isbn) {
    res.send(books[isbn]);
  }
});

// Get book details based on author
public_users.get('/author/:author', function (req, res) {
  const author = req.params.author;
  if (author) {
    books_array = Object.values(books);
    res.send(books_array.filter((elem) => elem['author'] == author));
  }
});

// Get all books based on title
public_users.get('/title/:title', function (req, res) {
  const title = req.params.title;
  if (title) {
    books_array = Object.values(books);
    res.send(books_array.filter((elem) => elem['title'] == title));
  }
});

//  Get book review
public_users.get('/review/:isbn', function (req, res) {
  const isbn = req.params.isbn;
  if (isbn) {
    res.send(books[isbn]['reviews']);
  }
});

module.exports.general = public_users;
