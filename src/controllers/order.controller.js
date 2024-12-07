const Order = require("../models/Order");
const User = require("../models/User");
const OrderDetail = require("../models/Order_Details");

const getAllOrders = async (req, res, next) => {
  const orders = await Order.findAll({
    include: [
      {
        model: User,
        as: "users",
        attributes: ["id", "name", "email"],
      },
      {
        model: OrderDetail,
        as: "order_details",
        attributes: [],
      },
    ],
  });
};

module.exports = {
  getAllOrders,
};
