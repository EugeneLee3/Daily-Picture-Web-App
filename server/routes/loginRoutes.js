const loginRoutes = (express, cors) => {
    //
    const jwt = require('jsonwebtoken');
    const router = express.Router();

    const { comparePassword } = require('../utils/password');
    const { validateEmail } = require('../utils/validateEmail');

    // Schemas
    const User = require('../mongodb/schemas/Users');

    // validate email does not quite work atm
    router.post('/sign-in', cors(), async (req, res) => {
        console.log('wow')
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
            } else {
              res.status(401).send({ message: 'Incorrect email or password' });
            }
          } catch (error) {
            res.status(404).send({ message: 'Account not found' });
          }
        }
      });


    return router;
};

module.exports = { loginRoutes };