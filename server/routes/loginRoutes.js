const loginRoutes = (express, cors) => {
    //
    const jwt = require('jsonwebtoken');
    const router = express.Router();

    const { comparePassword } = require('../utils/password');
    const { validateEmail } = require('../utils/validateEmail');
    const { verifyToken } = require('../utils/auth')

    // Schemas
    const schemas = require("../mongo");
    const User = schemas.userSchema;

    // validate email does not quite work atm
    router.post('/sign-in', cors(), async (req, res) => {
        if (req.body.email.trim().length === 0 || req.body.password.trim().length === 0) {
          res.status(400).send({ message: 'Please fill all required fields' });
        } 
        // else if (!validateEmail(req.body.email)) {
        //   res.status(400).send({ message: 'Please enter a valid email' });
        // } 
        else {
          try {
            const existingUser = await User.find({ email: req.body.email });
            const hashedPassword = existingUser[0].password;
            const match = await comparePassword(req.body.password, hashedPassword);
      
            if (match) {
              res.status(200).send({ message: 'Log in successful' });
              // Create a JWT token with a payload containing the user ID and expiration date
              const token = jwt.sign({ id: existingUser[0]._id }, 'secret', { expiresIn: '1h' });

              // Send the token back to the client
              res.json({ token });
              // When the user logs in and receives a token, store the token in local storage or cookies
              localStorage.setItem('token', token);
            } else {
              res.status(401).send({ message: 'Incorrect email or password' });
            }
          } catch (error) {
            res.status(404).send({ message: 'Account not found' });
          }
        }
      });


      // determining if user is logged in
      // Route that requires authentication
      router.get('/', verifyToken, (req, res) => {
        try {
          // The user is authenticated, so return some protected data
          res.json({ message: 'You are authenticated' });
        } catch(error) {
          res.send('/login');
        }
      });

    return router;
};

module.exports = { loginRoutes };