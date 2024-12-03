const Color = require("../models/Color");
const Product = require("../models/Product");
const Size = require("../models/Size");
const Variant = require("../models/Variant");

const getAllVariant = async (req, res, next) => {
  const productVariant = await Variant.findAll();
  res.json({
    data: productVariant,
  });
};

const getVariantById = async (req, res, next) => {
  const { id } = req.params;

  const productVariant = await Variant.findByPk(id);
  if (!productVariant) {
    return res.status(404).json({
      message: "Không tìm thấy !",
    });
  }
  return res.status(200).json({
    data: productVariant,
  });
};

const deleteVariantById = async (req, res, next) => {
  const { id } = req.params;
  const productVariant = await Variant.findOne({ where: { id } });

  if (!productVariant) {
    return res.status(404).json({
      message: "Không tìm thấy ",
    });
  }

  await productVariant.destroy();
  return res.status(200).json({
    message: "Xóa thành công",
  });
};

const updateVariant = async (req, res, next) => {
  const { id } = req.params;
  const { productId, colorId, sizeId, price, price_promotion, quantity } =
    req.body;

  const productExists = await Product.findByPk(productId);
  if (!productExists) {
    return res.status(400).json({
      message: "Sản phẩm không hợp lệ , vui lòng kiểm tra lại ",
    });
  }

  const colorExists = await Color.findByPk(colorId);
  if (!colorExists) {
    return res.status(400).json({
      message: "Màu sắc không hợp lệ, vui lòng kiểm tra lại!",
    });
  }

  const sizeExists = await Size.findByPk(sizeId);
  if (!sizeExists) {
    return res.status(400).json({
      message: "Không tìm thấy kích thước đã cho",
    });
  }

  const productVariant = await Variant.findOne({ where: { id } });
  if (!productVariant) {
    return res.status(404).json({
      message: "Không tìm thấy ",
    });
  }
  productVariant.productId = productId;
  productVariant.colorId = colorId;
  productVariant.sizeId = sizeId;
  productVariant.price = price;
  productVariant.price_promotion = price_promotion;
  productVariant.quantity = quantity;
  await productVariant.save();

  return res.json({
    message: "Update thành công !",
    data: productVariant,
  });
};

module.exports = {
  getAllVariant,
  getVariantById,
  deleteVariantById,
  updateVariant,
};
