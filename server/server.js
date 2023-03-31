const express = require("express");
const collection = require("./mongo")
const cors = require("cors")
const app = express()

require('dotenv').config();
const port = process.env.PORT

app.listen(port, () => {
    console.log(`Connected to Port ${port}`)
})