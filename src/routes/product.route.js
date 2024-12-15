const { Router } = require("express");
const {
  getAllProducts,
  getProductById,
  createProduct,
  deleteProductById,
  updateProduct,
  uploadImage,
} = require("../controllers/product.controller");
const uploadMiddleware = require("../middlewares/uploadMiddleware");

const productRouter = Router();

productRouter.get("/", getAllProducts);
productRouter.get("/:id", getProductById);
productRouter.post("/", uploadMiddleware.single("thumbnail"), createProduct);
productRouter.delete("/:id", deleteProductById);
productRouter.put("/:id", updateProduct);
productRouter.post("/upload", uploadImage);
module.exports = productRouter;
