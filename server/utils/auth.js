const jwt = require('jsonwebtoken');

// Middleware to verify the JWT for protected routes
const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Missing token' });
  }

  jwt.verify(token, 'secret', (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Invalid token' });
    }

    // Set the decoded token on the request object to be used in subsequent middleware or routes
    req.user = decoded;
    next();
  });
};

module.exports = { verifyToken }; 