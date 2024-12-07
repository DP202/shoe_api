const User = require("../models/User");

const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.findAll({
      attributes: ["id", "name", "email", "avatar", "roleId"],
    });
    res.status(200).json({
      data: users,
    });
  } catch (error) {
    console.log(1);
  }
};

const getUserById = async (req, res, next) => {
  const { id } = req.params;
  const user = await User.findByPk(id, {
    attributes: ["name", "email", "avatar", "roleId"],
  });
  if (!user) {
    return res.status(404).json({
      message: "Không tìm thấy user với id này ",
    });
  }

  return res.status(200).json({
    data: user,
  });
};

const deleteUser = async (req, res, next) => {
  const { id } = req.params;
  const user = await User.findByPk(id);
  if (!user) {
    return res.status(404).json({
      message: "Không tìm thấy user với id này",
    });
  }
  await user.destroy();
  return res.status(200).json({
    message: "Xóa thành công ",
  });
};

const updateUser = async (req, res, next) => {
  const { id } = req.params;
  const { name, email, avatar, roleId } = req.body;

  const user = await User.findOne({ where: { id } });
  if (!user) {
    return res.status(404).json({
      message: "Không tìm thấy user",
    });
  }
  user.name = name;
  user.email = email;
  user.avatar = avatar;
  user.roleId = roleId;
  await user.save();

  return res.status(200).json({
    message: "Update user thành công",
    data: user,
  });
};

module.exports = {
  getAllUsers,
  getUserById,
  deleteUser,
  updateUser,
};
