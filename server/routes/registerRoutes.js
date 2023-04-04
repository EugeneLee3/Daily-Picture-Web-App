const registerRoutes = (express, cors) => {
    // Importing all dependencies
    const router = express.Router();
    const { hashPassword } = require('../utils/password');
    const { validateEmail } = require('../utils/validateEmail');

    // Schemas
    const User = require('../mongodb/schemas/Users');

    // All Requests for the register page
    router.post('/register', cors(), async (req, res) => {
        if (req.body.email.trim().length === 0 || req.body.password.trim().length === 0) {
            res.status(400).send({ message: 'Please fill all required fields' });
        } else {
            try {
                const existingUser = await User.findOne({ email: req.body.email });
                if (existingUser) {
                    return res.status(409).send({ message: "Email already exists" });
                } else {
                    const hashedPassword = await hashPassword(req.body.password);
                    const user = new User({ email: req.body.email, password: hashedPassword });
                    await user.save();
                    res.status(201).send(user); // sends the saved user object back to the client
                }
              } catch (error) {
                res.status(400).send(error); // sends the error message back to the client
              }
        }
    });


    return router;
};

module.exports = { registerRoutes };