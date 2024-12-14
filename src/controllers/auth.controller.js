require("dotenv").config();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const register = async (req, res, next) => {
  const { name, email, password, avatar, roleId } = req.body;
  const emailExists = await User.findOne({ where: { email } });
  if (emailExists) {
    return res.status(400).json({
      message: "Email đã được sử dụng",
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({
    name,
    email,
    password: hashedPassword,
    avatar,
    roleId,
  });

  return res.status(201).json({
    message: "Đăng ký tài khoản thành công",
    data: {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      avatar: newUser.avatar,
      roleId: newUser.roleId,
    },
  });
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  const account = await User.findOne({ where: { email } }); // tì, tài khoản có email

  if (!account) {
    return res.status(400).json({
      message: "Tài khoản hoặc mật khẩu không đúng ",
    });
  }

  const checkPasssword = bcrypt.compareSync(password, account.password);
  if (!checkPasssword) {
    return res.status(400).json({
      message: "Tài khoản hoặc mật khẩu không đúng ",
    });
  }
  const payload = {
    email: account.email,
  };
  const access_token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE || "2d",
  });

  const userFinal = {
    name: account.name,
    email: account.email,
    avatar: account.avatar,
    roleId: account.roleId,
  };

  return res.status(200).json({
    message: "Đăng nhập thành công ",
    data: userFinal,
    access_token,
  });
};

module.exports = { register, login };
