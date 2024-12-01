const { DataTypes } = require("sequelize");
const sequelize = require("../connects");

const Color = sequelize.define(
  "Color",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    value: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "colors",
  }
);

module.exports = Color;
