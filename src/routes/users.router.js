const { Router } = require("express");
const {
  getAllUsers,
  getUserById,
  deleteUser,
  updateUser,
} = require("../controllers/users.controler");

const userRouter = Router();

userRouter.get("/", getAllUsers);
userRouter.get("/:id", getUserById);
userRouter.delete("/:id", deleteUser);
userRouter.put("/:id", updateUser);

module.exports = userRouter;
