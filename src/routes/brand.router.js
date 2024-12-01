const { Router } = require("express");
const {
  getAllBrand,
  getBrandById,
  createBrand,
  deleteBrandById,
  updateBrand,
} = require("../controllers/brand.controller");

const brandRouter = Router();

brandRouter.get("/", getAllBrand);
brandRouter.get("/:id", getBrandById);
brandRouter.post("/", createBrand);
brandRouter.delete("/:id", deleteBrandById);
brandRouter.put("/:id", updateBrand);

module.exports = brandRouter;
