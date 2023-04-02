const { verifyToken } = require("../utils/auth");

const protectedRoutes = (express, cors) => {
    const router = express.Router();

    // Protected route that requires login
    router.get('/', cors(), verifyToken, (req, res) => {
        res.render('/', { user: req.user });
    });

    return router
}

module.exports = { protectedRoutes };