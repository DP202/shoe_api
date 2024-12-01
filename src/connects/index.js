const { Sequelize } = require("sequelize");
const sequelize = new Sequelize("shoes_api", "root", "", {
  logging: false,
  host: "localhost",
  port: 3306,
  dialect: "mysql",
});

module.exports = sequelize;
