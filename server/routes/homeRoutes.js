const homeRoutes = (express, cors) => {
    const router = express.Router();
    const authMiddleware = require('../middlewares/authMiddleware');

    // Schemas
    const User = require('../mongodb/schemas/Users');

    router.get('/users', cors(), authMiddleware, async (req, res) => {
        // Use req.user to access the authenticated user
        const user = req.user;
      
        // Retrieve user data from the database
        const dbUser = await User.findById(user._id);

        // Return user data in the response
        res.json({ email: dbUser.email });
    });

    return router;
}

module.exports = { homeRoutes };

