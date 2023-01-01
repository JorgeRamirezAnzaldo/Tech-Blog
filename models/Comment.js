//Import Model and DataTypes from sequelize
const { Model, DataTypes } = require('sequelize');
//Import sequelize connection
const sequelize = require('../config/connection');

//Initialize Comment model (table) by extending off Sequelize's Model class
class Comment extends Model {}

  //Set up fields and rules for Comment model
  Comment.init(
    //Define columns for Comment
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
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
      post_id: {
        type: DataTypes.INTEGER,
        //Reference to the post model using the id
        references: { 
          model: "post",
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
      modelName: 'comment', //Define model name for Comment
    }
  );
  
  module.exports = Comment; //Export Comment model