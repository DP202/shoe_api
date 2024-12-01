const { Router } = require("express");
const {
  getAllSizes,
  createSize,
  getSizeById,
  deleteSizeById,
  updateSize,
} = require("../controllers/size.controller");

const sizeRouter = Router();
sizeRouter.get("/", getAllSizes);
sizeRouter.get("/:id", getSizeById);
sizeRouter.post("/", createSize);
sizeRouter.delete("/:id", deleteSizeById);
sizeRouter.put("/:id", updateSize);
module.exports = sizeRouter;
