const { DataTypes } = require("sequelize");
const Order = require("./Order");
const Variant = require("./Variant");
const sequelize = require("../connects");

const Order_Details = sequelize.define(
  "Order_Details",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    price: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    orderId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Order,
        key: "id",
      },
    },
    variantId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Variant,
        key: "id",
      },
    },
  },
  {
    tableName: "order_details",
  }
);
module.exports = Order_Details;
