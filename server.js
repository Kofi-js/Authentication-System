const express = require('express');
const connectDB = require('./db');
const { json } = require('express');
const routes = require('./routes/user');
require('dotenv').config();
const port = process.env.PORT;

// connect to db
connectDB();

// Initialize express
const app = express();

// pre-route middleware
require('./middleware/pre-route')(app);

//seeders
const { seedAdmin } = require('./seeder/admin');
// console.log("new admin created successfully", seedAdmin());

app.use(json());

// connect to app routes
app.use('/', routes);

// listen to connection
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
