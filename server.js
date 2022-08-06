const express = require("express");
const { json } = require("express");
const connectDB =require('./db/index');
const router= require('./routes/user')
const debug = require('debug');


debug(express);

const port = process.env.PORT;
require("dotenv").config();

connectDB();

const app = express();

app.use(json());

const { seedAdmin } = require("./seeder/admin");
console.log(seedAdmin());

app.use("/", router);

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
