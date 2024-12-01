const { Router } = require("express");
const {
  getAllColor,
  getColorById,
  createColor,
  deleteColorById,
  updateColor,
} = require("../controllers/color.controller");

const colorRouter = Router();

colorRouter.get("/", getAllColor);
colorRouter.get("/:id", getColorById);
colorRouter.post("/", createColor);
colorRouter.delete("/:id", deleteColorById);
colorRouter.put("/:id", updateColor);

module.exports = colorRouter;
