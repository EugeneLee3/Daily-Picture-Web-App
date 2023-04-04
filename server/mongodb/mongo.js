const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = (url) => {
  mongoose.set("strictQuery", true);

  mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
      console.log('Connected to MongoDB');
    })
    .catch(err => {
      console.error('Failed to connect to MongoDB', err);
    });
};

module.exports = connectDB;