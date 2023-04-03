const googleRoutes = (express, cors) => {
    const { OAuth2Client } = require('google-auth-library');
    const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

    const router = express.Router();

    router.post('/google-signin', cors(), async (req, res) => {
    const { id_token } = req.body;
    try {
        const ticket = await client.verifyIdToken({
        idToken: id_token,
        audience: process.env.GOOGLE_CLIENT_ID,
        });
        const { email } = ticket.getPayload();
        // Check if the user with the email exists in your database
        // If the user exists, create a JWT token and send it in the response
        // If the user doesn't exist, create a new user in your database and then create a JWT token
        const token = createJwtToken(email);
        res.json({ token });
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: 'Invalid Google token' });
    }
    });

    return router;

}

module.exports = { googleRoutes };
