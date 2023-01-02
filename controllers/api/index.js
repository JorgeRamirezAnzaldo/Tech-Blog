//Import router from express
const router = require('express').Router();
//Import the user routes
const userRoutes = require('./user-routes');
//Make the router use the user routes with /users endpoint
router.use('/users', userRoutes);
//Export router with routes
module.exports = router;