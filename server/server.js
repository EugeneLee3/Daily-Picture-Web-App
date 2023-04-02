const express = require("express");
const cors = require("cors");

require('dotenv').config();
const port = process.env.PORT

const schemas = require("./mongo");
const User = schemas.userSchema;

const app = express();
app.use(express.json()); // enables JSON request bodies
app.use(cors());

app.post('/register', async (req, res) => {
  try {
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
        return res.status(409).send({ message: "Email already exists" });
    } else {
        const user = new User(req.body);
        await user.save();
        res.status(201).send(user); // sends the saved user object back to the client
    }
  } catch (error) {
    res.status(400).send(error); // sends the error message back to the client
  }
});

app.listen(port, () => {
    console.log(`Listening on Port ${port}`)
})