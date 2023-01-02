//Create function to validate authorization
const withAuth = (req, res, next) => {
    if (!req.session.loggedIn) { //If the user is not logged in
      res.redirect('/login'); //Redirect to the login page
    } else { //If the user is logged in
      next(); //Continue to allow the user visualize the data
    }
  };
  
  //Export function for authorization
  module.exports = withAuth;