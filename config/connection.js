//Import sequelize
let Sequelize = require('sequelize');
//Import dotenv and configure it
require('dotenv').config();

//Create new connection with environment variables
if (process.env.JAWSDB_URL){
  Sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
  Sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      host: 'localhost',
      dialect: 'mysql',
      port: 3306,
    }
  );
}



//Export connection
module.exports = sequelize;