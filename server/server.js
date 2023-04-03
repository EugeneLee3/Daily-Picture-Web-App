// Importing dependencies
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv").config();

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

// Your code
if (process.env.NODE_ENV === "production") {
  const path = require("path");
  app.use(express.static(path.resolve(__dirname, 'client', 'build')));
  app.get("*", (req, res) => {
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'),function (err) {
          if(err) {
              res.status(500).send(err)
          }
      });
  })
}
// Your code


// // Port
// const port = process.env.PORT;

// //
// app.listen(port, () => {
//   console.log(`Listening on Port ${port}`);
// });
