//Import router from express
const router = require('express').Router();
//Import Post and Comment models
const { Post, Comment } = require('../models');
//Import middleware to validate authorization
const withAuth = require("../utils/auth.js");

//GET route to obtain all the posts
router.get('/', async (req, res) => {
    try {
      const postsData = await Post.findAll({ //Find all posts in database
        //Bring Comment data related to the post
        include: [
          {
            model: Comment, //Use the Comment model
            attributes: ['content'], //Bring the content of the comments
          },
        ],
      });
  
      const posts = postsData.map((post) => //Convert the data obtained from database into plain text
        post.get({ plain: true })
      );
  
      //Render the homepage view with the posts obtained from the database
      res.render('homepage', {   
        posts,
        loggedIn: req.session.loggedIn, //Send the loggedIn session variable
      });
    } catch (err) { //Catch any problem/error
      res.status(500).json(err); //Respond with 500 status and the problem/error
    }
  });

//GET route to obtain one post
router.get('/post/:id', withAuth, async (req, res) => { //Use the middleware to validate authorization
    try {
        const postData = await Post.findByPk(req.params.id, { //Find a post in the database using the id
        //Bring Comment data related to the post
        include: [
            {
              model: Comment, //Use the Comment model
              attributes: ['content', 'user_id', 'post_id', 'creation_date'], //Bring the data of the comments
            },
          ],
        });
        const post = postData.get({ plain: true }); //Convert the data to plain text
        //Render the post view with the post obtained from database
        res.render('post', { post, loggedIn: req.session.loggedIn }); //Send the loggedIn session variable
      } catch (err) { //Catch any problem/error
        res.status(500).json(err); //Respond with 500 status and the problem/error
      }
});

//GET route to log in
router.get('/login', (req, res) => {
    if (req.session.loggedIn) { //If the user is logged in
      res.redirect('/'); //redirect to home
      return;
    }
    res.render('login'); //If the user is not logged in, then render the login view
  });

//Export router with corresponding routes
module.exports = router;