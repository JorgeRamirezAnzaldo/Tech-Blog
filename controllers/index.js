//Import router from express
const router = require('express').Router();
//Import api routes
const apiRoutes = require('./api');
//Import home routes
const homeRoutes = require('./home-routes.js');
//Make the router use the home routes with / endpoint
router.use('/', homeRoutes);
//Make the router use the api routes with /api endpoint
router.use('/api', apiRoutes);
//Export router with the proper routes
module.exports = router;