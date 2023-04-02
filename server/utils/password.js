//
const bcrypt = require('bcrypt');

// Salt rounds for bcrypt
const saltRounds = parseInt(process.env.SALT_ROUNDS);

// 
const hashPassword = async (password) => {
  const hash = await bcrypt.hash(password, saltRounds);
  return hash;
};

//
const comparePassword = async (password, hash) => {
  const match = await bcrypt.compare(password, hash);
  return match;
};

//
module.exports = {
  hashPassword,
  comparePassword
};