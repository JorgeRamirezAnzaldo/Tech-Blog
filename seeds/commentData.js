//Import Comment model
const { Comment } = require('../models');

//Create array with data to be seeded
const commentdata = [
  {
    content : 'I have just learned about this in my class',
    user_id : 3,
    post_id : 1,
    creation_date : 'December 31, 2022 20:00:00',
  },
  {
    content : 'I have just developed an app with this',
    user_id : 1,
    post_id : 2,
    creation_date : 'January 10, 2023 20:00:00',
  },
  {
    content : 'I have just made a homework for this topic',
    user_id : 2,
    post_id : 2,
    creation_date : 'January 01, 2023 20:00:00',
  },

];

//Function to create entries in Comment table
const seedComment = () => Comment.bulkCreate(commentdata);

//Export function to seed Comment table
module.exports = seedComment;