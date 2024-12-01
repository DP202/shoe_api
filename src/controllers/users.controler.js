const User = require("../models/user");

const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.findAll();
    res.status(200).json({
      data: users,
    });
  } catch (error) {
    console.log(1);
  }
};

module.exports = {
  getAllUsers,
};
