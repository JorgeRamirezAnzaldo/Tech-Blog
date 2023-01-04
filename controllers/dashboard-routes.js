//Import router from express
const router = require('express').Router();
//Import Post, Comment and User models
const { Post, Comment, User } = require('../models');
//Import middleware to validate authorization
const withAuth = require("../utils/auth.js");

//GET route to get all posts by user id
router.get('/', withAuth, async (req, res) => {
    try {
        const userData = await User.findOne({ //Find the user id using the username that is connected
            where: {
              username:req.session.username, //Use the username saved in the session
            }
          });
        const user = userData.get({ plain: true }); //Convert to plain data
        const postsData = await Post.findAll({ //Find all posts in database
          where: {
            user_id: user.id,
          },
          include: [
            {
              model: User,
              attributes: ['username'],
            }
          ],
        });
    
        const posts = postsData.map((post) => //Convert the data obtained from database into plain text
          post.get({ plain: true })
        );
        //Render the dashboard view with the posts obtained from the database
        res.render('dashboard', {   
          posts,
          loggedIn: req.session.loggedIn, //Send the loggedIn session variable
        });
      } catch (err) { //Catch any problem/error
        res.status(500).json(err); //Respond with 500 status and the problem/error
      }
});

//GET route to get a post
router.get('/post/:id', withAuth, async (req, res) => { //Use the middleware to validate authorization
    try {
        const postData = await Post.findByPk(req.params.id, { //Find a post in the database using the id
        //Bring Comment data related to the post
        include: [
            {
              model: User,
              attributes: ['username'],
            }
          ],
        });
        const post = postData.get({ plain: true }); //Convert the data to plain text
        //Render the dashpost view with the post obtained from database
        res.render('dashpost', { post, loggedIn: req.session.loggedIn }); //Send the loggedIn session variable
        //res.status(200).json(postData);
      } catch (err) { //Catch any problem/error
        res.status(500).json(err); //Respond with 500 status and the problem/error
      }
});

//GET route to render post creation screen
router.get('/creation', withAuth, async (req, res) => { //Use the middleware to validate authorization
    try {
        res.render('dashpostcreate', {loggedIn: req.session.loggedIn }); //Render screen for post creation
      } catch (err) { //Catch any problem/error
        res.status(500).json(err); //Respond with 500 status and the problem/error
      }
});



//POST route to create a post 
router.post('/', withAuth, async (req, res) => {
    try {
        const userData = await User.findOne({ //Find the user id using the username that is connected
          where: {
            username:req.session.username, //Use the username saved in the session
          }
        });
        const user = userData.get({ plain: true }); //Convert to plain data
        const postData = await Post.create({ //Create post in database with complete data
          title : req.body.title,
          content : req.body.content,
          user_id : user.id,
          creation_date : req.body.creation_date,
        })
        res.status(200).json(postData); //Respond with status 200 and the new post created
      } catch (err) { //Catch any error
        res.status(500).json(err); //Respond with status 500 if there is a problem/error
      }
    });

//Export router with corresponding routes
module.exports = router;