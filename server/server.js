// Importing dependencies
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv").config();
const connectDB = require('./mongodb/mongo');

//
const { loginRoutes } = require('./routes/loginRoutes');
const { registerRoutes } = require('./routes/registerRoutes');
const { homeRoutes } = require("./routes/homeRoutes");
//const { googleRoutes } = require("./routes/googleRoutes");

//
const app = express();
app.use(express.json()); // enables JSON request bodies
app.use(cors());

//
app.use(loginRoutes(express, cors));
app.use(registerRoutes(express, cors));
app.use(homeRoutes(express, cors));
// app.use(googleRoutes(express, cors))

const startServer = async () => {
  try {
    console.log('server started')
    const uri = process.env.MONGODB_URI;
    connectDB(uri);

    // Port
    const port = process.env.PORT;

    //
    app.listen(port, () => {
      console.log(`Listening on Port ${port}`);
});
  } catch (error) {
      console.log(error);
  }
};

startServer();
