//Import Model and DataTypes from sequelize
const { Model, DataTypes } = require('sequelize');
//Import bcrypt to hash passwords
const bcrypt = require('bcrypt');
//Import sequelize connection
const sequelize = require('../config/connection');

//Initialize User model (table) by extending off Sequelize's Model class
class User extends Model {
    //Create method to check password when logging in
    checkPassword(loginPassword) {
      return bcrypt.compareSync(loginPassword, this.password); //Compare passwords using bcrypt
    }
  }
  //Set up fields and rules for User model
  User.init(
    //Define columns for User
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [6],
        },
      },
    },
    {
      //Define hook to hash password when creating a new user
      hooks: {
        async beforeCreate(newUserData) { //Before creating user in the database
          newUserData.password = await bcrypt.hash(newUserData.password, 10); //Hash password
          return newUserData; //Return user data with hashed password
        },
      },
      sequelize,
      timestamps: false,
      freezeTableName: true,
      underscored: true,
      modelName: 'user', //Define model name for User
    }
  );
  
  module.exports = User; //Export User model
  