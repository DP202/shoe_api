const { DataTypes } = require("sequelize");
const sequelize = require("../connects");

const Size = sequelize.define(
  "Size",
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
    tableName: "sizes",
  }
);

module.exports = Size;
