//Import Post model
const { Post } = require('../models');

//Create array with data to be seeded
const postdata = [
  {
    title: 'Why MVC is so important',
    content : 'MVC allows developers to maintain true separation of concerns, devising their code between the Model layer of data, the View layer for design and the Controller layer for application logic',
    user_id : 1,
    creation_date : 'December 27, 2022 20:00:00',
  },
  {
    title: 'Authentication vs. Authorization',
    content : 'There is a difference between authentication and authorization. Authentication means confirming your own identity, whereas authorization means being allowed access to the system',
    user_id : 1,
    creation_date : 'December 28, 2022 21:00:00',
  },
  {
    title: 'Object-Relational Mapping',
    content : 'I have really loved learning about ORMs. It\'s really simplified the way I create queries in SQL',
    user_id : 3,
    creation_date : 'December 29, 2022 22:00:00',
  },

];

//Function to create entries in Post table
const seedPost = () => Post.bulkCreate(postdata);

//Export function to seed Post table
module.exports = seedPost;