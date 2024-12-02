const { DataTypes } = require("sequelize");
const sequelize = require("../connects");
const Product = require("./Product");

const ProductImages = sequelize.define(
  "ProductImages",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    url: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    productId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Product,
        key: "id",
      },
    },
  },
  {
    tableName: "productImages",
  }
);

module.exports = ProductImages;
