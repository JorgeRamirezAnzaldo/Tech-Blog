//Import User model
const { User } = require('../models');

//Create array with data to be seeded
const userdata = [
  {
    username: "Xandromus",
    password: "123456",
  },
  {
    username: "Lernantino",
    password: "123456",
  },
  {
    username: "Mike",
    password: "123456",
  },
  {
    username: "Ralph",
    password: "123456",
  },

];

//Function to create entries in User table
const seedUser = () => User.bulkCreate(userdata, {
    individualHooks: true,
    returning: true,
});

//Export function to seed User table
module.exports = seedUser;