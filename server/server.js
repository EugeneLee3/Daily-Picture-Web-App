// Importing dependencies
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv").config();

//
const { loginRoutes } = require('./routes/loginRoutes');
const { registerRoutes } = require('./routes/registerRoutes');
const { signOutRoutes } = require('./routes/signoutRoutes');
const { protectedRoutes } = require('./routes/protectedRoutes');

//
const app = express();
app.use(express.json()); // enables JSON request bodies
app.use(cors());

//
app.use(loginRoutes(express, cors));
app.use(registerRoutes(express, cors));
app.use(signOutRoutes(express, cors));
app.use(protectedRoutes(express, cors));

// Port
const port = process.env.PORT;

//
app.listen(port, () => {
  console.log(`Listening on Port ${port}`);
});
