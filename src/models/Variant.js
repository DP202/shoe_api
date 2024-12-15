const { DataTypes } = require("sequelize");

const sequelize = require("../connects");
const Product = require("./Product");
const Color = require("./Color");
const Size = require("./Size");

const Variant = sequelize.define(
  "Variant",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Product,
        key: "id",
      },
    },
    product_name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    colorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Color,
        key: "id",
      },
    },
    sizeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Size,
        key: "id",
      },
    },
    price: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    price_promotion: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "variants",
  }
);
module.exports = Variant;
