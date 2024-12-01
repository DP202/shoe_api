const { Router } = require("express");
const { getAllUsers } = require("../controllers/users.controler");

const userRouter = Router();

userRouter.get("/", getAllUsers);

module.exports = userRouter;
