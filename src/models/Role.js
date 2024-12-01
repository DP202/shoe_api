const { DataTypes } = require("sequelize");
const sequelize = require("../connects");

const Role = sequelize.define(
  "Role",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "roles", // rang buoc sai cai nay
  }
);

module.exports = Role;
