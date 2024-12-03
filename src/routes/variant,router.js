const { Router } = require("express");
const {
  getAllVariant,
  getVariantById,
  deleteVariantById,
  updateVariant,
} = require("../controllers/variant.controller");

const variantRouter = Router();

variantRouter.get("/", getAllVariant);
variantRouter.get("/:id", getVariantById);
variantRouter.delete("/:id", deleteVariantById);
variantRouter.put("/:id", updateVariant);

module.exports = variantRouter;
