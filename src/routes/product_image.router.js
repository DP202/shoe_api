const { Router } = require("express");
const {
  getAllProductImage,
  getProductImageById,
  createProductImage,
  deleteProductImageById,
  updateProductImage,
} = require("../controllers/product_image.controller");

const productImageRouter = Router();

productImageRouter.get("/", getAllProductImage);
productImageRouter.get("/:id", getProductImageById);
productImageRouter.post("/", createProductImage);
productImageRouter.delete("/:id", deleteProductImageById);
productImageRouter.put("/:id", updateProductImage);

module.exports = productImageRouter;
