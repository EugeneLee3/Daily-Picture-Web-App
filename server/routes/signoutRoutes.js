const signOutRoutes = (express, cors) => {
    const router = express.Router();
  
    router.post('/sign-out', cors(), (req, res) => {
      req.session.destroy((error) => {
        if (error) {
          console.error(error);
          res.status(500).send({ message: 'Unable to sign out' });
        } else {
          res.status(200).send({ message: 'Signed out successfully' });
        }
      });
    });
  
    return router;
  };
  
  module.exports = { signOutRoutes };