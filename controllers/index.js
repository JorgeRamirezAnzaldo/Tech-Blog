//Import router from express
const router = require('express').Router();
//Import api routes
const apiRoutes = require('./api');
//Import home routes
const homeRoutes = require('./home-routes.js');
//Import dashboard routes
const dashRoutes = require('./dashboard-routes.js');
//Make the router use the home routes with / endpoint
router.use('/', homeRoutes);
//Make the router use the dashboard routes with /dashboard endpoint
router.use('/dashboard', dashRoutes);
//Make the router use the api routes with /api endpoint
router.use('/api', apiRoutes);
//Export router with the proper routes
module.exports = router;