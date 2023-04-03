const jwt = require('jsonwebtoken');
const schemas = require("../mongo");
const User = schemas.userSchema;

const authMiddleware = async (req, res, next) => {
  try {
    // Get token from headers
    const token = req.headers.authorization.split(' ')[1];

    // Verify token
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    // Find user in database by decoded token
    const user = await User.findById(decodedToken.userId);

    // Attach user to request object
    req.user = user;

    next();
  } catch (err) {
    res.status(401).json({ message: 'Unauthorized' });
  }
};

module.exports = authMiddleware;
