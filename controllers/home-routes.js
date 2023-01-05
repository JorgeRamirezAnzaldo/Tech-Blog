//Import router from express
const router = require('express').Router();
//Import Post, Comment and User models
const { Post, Comment, User } = require('../models');
//Import middleware to validate authorization
const withAuth = require("../utils/auth.js");

//GET route to obtain all the posts
router.get('/', async (req, res) => {
    try {
      const postsData = await Post.findAll({ //Find all posts in database
        //Bring Comment data related to the post
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
router.get('/post/:id', async (req, res) => { //Use the middleware to validate authorization
    try {
        const postData = await Post.findByPk(req.params.id, { //Find a post in the database using the id
        //Bring Comment data related to the post
        include: [
            {
              model: Comment, //Use the Comment model
              attributes: ['content', 'user_id', 'post_id', 'creation_date'], //Bring the data of the comments
              include: [
                {
                  model: User,
                  attributes: ['username'],
                }
              ],
            },
            {
              model: User,
              attributes: ['username'],
            }
          ],
        });
        const post = postData.get({ plain: true }); //Convert the data to plain text
        //Render the post view with the post obtained from database
        res.render('post', { post, loggedIn: req.session.loggedIn }); //Send the loggedIn session variable
        //res.status(200).json(postData);
      } catch (err) { //Catch any problem/error
        res.status(500).json(err); //Respond with 500 status and the problem/error
      }
});

//GET route to log in
router.get('/login', (req, res) => {
    if (req.session.loggedIn) { //If the user is logged in
      res.redirect('/dashboard'); //redirect to dashboard
      return;
    }
    res.render('login'); //If the user is not logged in, then render the login view
  });

  //GET route to log out
router.get('/logout', (req, res) => {
    res.redirect('/'); //redirect to home
});



//POST route to create a new comment
router.post('/comment', withAuth, async (req, res) => { //Use the middleware to validate authorization
  try {
      const userData = await User.findOne({ //Find the user id using the username that is connected
        where: {
          username:req.session.username, //Use the username saved in the session
        }
      });
      const user = userData.get({ plain: true }); //Convert to plain data
      const commentData = await Comment.create({ //Create comment in database with complete data
        content : req.body.content,
        user_id : user.id,
        post_id : req.body.post_id,
        creation_date : req.body.creation_date,
      })
      res.status(200).json(commentData); //Respond with status 200 and the new comment created
    } catch (err) { //Catch any error
      res.status(500).json(err); //Respond with status 500 if there is a problem/error
    }
});

//Export router with corresponding routes
module.exports = router;