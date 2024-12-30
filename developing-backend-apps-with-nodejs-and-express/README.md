https://www.coursera.org/learn/developing-backend-apps-with-nodejs-and-express/home/welcome

**API Structure:**

- `api-project/`
  - `node_modules/`
  - `config/`
    - `db.js`: Database connection and configuration
    - `credentials.js`: Passwords/API keys for external services used by your app
  - `models/` (For mongoose schemas)
    - `items.js`
    - `prices.js`
  - `routes/` (All routes for different entities in different files)
    - `items.js`
    - `prices.js`
  - `app.js`
  - `routes.js`: Require all routes in this file, then require this file in the app
  - `package.json`
