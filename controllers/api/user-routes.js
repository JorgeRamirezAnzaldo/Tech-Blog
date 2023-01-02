//Import router from express
const router = require('express').Router();
//Import User model
const { User } = require('../../models');

//POST route to create a new user
router.post('/', async (req, res) => {
  try {
    const newUser = await User.create({ //Create user in table using username and password
      username: req.body.username,
      password: req.body.password,
    });
    //Save session variables
    req.session.save(() => {    
      req.session.loggedIn = true; //Set loggedIn to true if user was created
      req.session.username = req.body.username; //Save the username 
      res.status(200).json(newUser); //Respond with status 200 and the data of the created user
    });
  } catch (err) { //Catch error
    res.status(500).json(err); //Respond with status 500 if there is a problem/error
  }
});

//POST route to Log In
router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({ //Find the username in the User table
      where: {
        username: req.body.username, //Use the username in the request body
      },
    });
    if (!userData) { //If no data was found in database
      res.status(400).json({ message: 'Username was not found in database. Please try again!' }); //Respond with 400 status and message
      return;
    }
    //If the username was found in database
    const validPassword = await userData.checkPassword(req.body.password); //Use the checkPasword method of the User model to validate the password
    if (!validPassword) { //If the password is not valid
      res.status(400).json({ message: 'Incorrect password. Please try again!' }); //Respond with 400 status and message
      return;
    }
    //If the password was valid, save the session variables
    req.session.save(() => {
      req.session.loggedIn = true; //Set loggedIn to true if username and password were correct
      req.session.username = req.body.username; //Save the username
      res.status(200).json({ user: userData, message: 'You are now logged in!' }); //Respond with 200 status and data
    });
  } catch (err) { //Catch error
    res.status(500).json(err); //Respond with status 500 if there is a problem/error
  }
});

//POST route to Log Out
router.post('/logout', (req, res) => {
  if (req.session.loggedIn) { //If the user was logged in
    req.session.destroy(() => { //Destroy the session
      res.status(204).end(); //Respond with 204 status and end
    });
  } else { //If not
    res.status(404).end(); //Respond with 404 status and end
  }
});

//Export router with corresponding routes
module.exports = router;