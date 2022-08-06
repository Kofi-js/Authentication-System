const express = require("express");
const { json } = require("express");
const connectDB = (require = "./db");
const routes = require("./routes/user");
const debug = require('debug');

debug(express);

const port = process.env.PORT;
require("dotenv").config();

connectDB();

const app = express();

app.use(json());

const { seedAdmin } = require("./seeder/admin");
console.log(seedAdmin());

app.use("/", routes);

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
