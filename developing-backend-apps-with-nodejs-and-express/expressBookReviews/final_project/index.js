const express = require('express');
const jwt = require('jsonwebtoken');
const session = require('express-session');
const customer_routes = require('./router/auth_users.js').authenticated;
const genl_routes = require('./router/general.js').general;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Middleware to parse URL-encoded bodies => uses query

app.use(
  '/customer',
  session({
    secret: 'fingerprint_customer',
    resave: true,
    saveUninitialized: true,
  })
);

app.use('/customer/auth/*', function auth(req, res, next) {
  // Check if user is logged in and has valid access token
  if (req.session.authorization) {
    let token = req.session.authorization['accessToken'];

    // Verify JWT token
    jwt.verify(token, 'access', (err, user) => {
      if (!err) {
        req.user = user;
        next(); // Proceed to the next middleware
      } else {
        return res.status(403).json({ message: 'User not authenticated' });
      }
    });
  } else {
    return res.status(403).json({ message: 'User not logged in' });
  }
});

const PORT = 5000;

app.use('/customer', customer_routes);
app.use('/', genl_routes);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

// curl http://localhost:5000/
// curl http://localhost:5000/isbn/1
// curl http://localhost:5000/author/Dante%20Alighieri
// curl http://localhost:5000/title/Pride%20and%20Prejudice
// curl -X POST "http://localhost:5000/register?username=user12&password=password12"
// curl -c cookies.txt -X POST "http://localhost:5000/customer/login?username=user12&password=password12"
// curl http://localhost:5000/review/1
// curl -b cookies.txt -X PUT "http://localhost:5000/customer/auth/review/1?review=Nice!"
// curl -b cookies.txt -X PUT "http://localhost:5000/customer/auth/review/1?review=I%20really%20liked%20this%20book"
// curl -b cookies.txt -X DELETE "http://localhost:5000/customer/auth/review/1"
