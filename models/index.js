//Import models
const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');

// Comment belongsTo Post
Comment.belongsTo(Post, {
  foreignKey: "post_id", //Define custom key to match the model
});
// Post has many Comments
Post.hasMany(Comment, {
  foreignKey: "post_id", //Define custom key to match the model
  onDelete: "Cascade",
});
// Post belongsTo User
Post.belongsTo(User, {
    foreignKey: "user_id", //Define custom key to match the model
  });
// User has many Posts
User.hasMany(Post, {
    foreignKey: "user_id", //Define custom key to match the model
    onDelete: "Cascade",
});
// Comment belongsTo User
Comment.belongsTo(User, {
    foreignKey: "user_id", //Define custom key to match the model
  });
// User has many Comments
User.hasMany(Comment, {
    foreignKey: "user_id", //Define custom key to match the model
    onDelete: "Cascade",
});

//Export models with associations
module.exports = {
  User,
  Post,
  Comment
};
