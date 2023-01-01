//Import Model and DataTypes from sequelize
const { Model, DataTypes } = require('sequelize');
//Import sequelize connection
const sequelize = require('../config/connection');

//Initialize Post model (table) by extending off Sequelize's Model class
class Post extends Model {}

  //Set up fields and rules for Post model
  Post.init(
    //Define columns for Post
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      content: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      user_id: {
        type: DataTypes.INTEGER,
        //Reference to the user model using the id
        references: { 
          model: "user",
          key: "id",
        },
      },
      creation_date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {
      sequelize,
      timestamps: false,
      freezeTableName: true,
      underscored: true,
      modelName: 'post', //Define model name for Post
    }
  );
  
  module.exports = Post; //Export Post model