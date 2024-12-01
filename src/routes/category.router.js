const { Router } = require("express");
const {
  createCategory,
  updateCategory,
  getAllCategory,
  deleteCategory,
  getCategoryById,
} = require("../controllers/category.controller");

const categoryRouter = Router();
categoryRouter.get("/", getAllCategory);
categoryRouter.get("/:id", getCategoryById);
categoryRouter.post("/", createCategory);
categoryRouter.put("/:id", updateCategory);
categoryRouter.delete("/:id", deleteCategory);

module.exports = categoryRouter;
