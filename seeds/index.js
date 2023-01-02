//Import sequelize connection
const sequelize = require('../config/connection');
//Import functions to seed the tables
const seedUser = require('./userData');
const seedPost = require('./postData');
const seedComment = require('./commentData');
//Function to seed all tables
const seedAll = async () => {
    await sequelize.sync({ force: true }); //Sync sequelize models to the database
  
    await seedUser(); //Seed table for users
  
    await seedPost(); //Seed table for posts

    await seedComment(); //Seed table for comments
  
    process.exit(0); //Exit process
  };
  
  seedAll(); //Call function to seed all tables