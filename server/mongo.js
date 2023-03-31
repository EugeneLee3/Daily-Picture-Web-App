const mongoose = require("mongoose")
require('dotenv').config();

const uri = process.env.MONGODB_URI;

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB\n'))
  .catch((err) => console.error('Failed to connect to MongoDB\n', err));

const newSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    }
})

const collection = mongoose.model("collection", newSchema)

module.exports = collection 