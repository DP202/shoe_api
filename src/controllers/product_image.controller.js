const Product = require("../models/Product");
const ProductImage = require("../models/ProductImages");

const createProductImage = async (req, res, next) => {
  const { url, productId } = req.body;
  const product = await Product.findByPk(productId);
  if (!product) {
    return res.status(404).json({
      message: "Không tìm thấy sản phẩm với id này",
    });
  }

  try {
    const productImage = await ProductImage.create({ url, productId });
    return res.status(201).json({
      message: "Thêm hình ảnh sản phẩm thành công ",
      data: productImage,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Có lỗi xãy ra khi thêm hình ảnh vào sản phẩm",
      error: error.message,
    });
  }
};

const getAllProductImage = async (req, res, next) => {
  const productImage = await ProductImage.findAll();
  res.status(200).json({
    data: productImage,
  });
};

const getProductImageById = async (req, res, next) => {
  const { id } = req.params;
  const productImage = await ProductImage.findByPk(id);
  if (!productImage) {
    return res
      .status(404)
      .json({ message: "Không tìm thấy hình ảnh sản phẩm với ID này!" });
  }

  return res.json({
    data: productImage,
  });
};

const deleteProductImageById = async (req, res, next) => {
  const { id } = req.params;

  const productImage = await ProductImage.findOne({ where: { id } });
  if (!productImage) {
    res.status(400).json({
      message: `Không tìm thấy hình ảnh sản phẩm với ID = ${id}`,
    });
  }

  // Xóa
  await productImage.destroy();

  return res.json({
    message: "Xóa hình ảnh của sản phẩm thành công ",
  });
};

const updateProductImage = async (req, res, next) => {
  const { id } = req.params;
  const { url, productId } = req.body;

  const productImage = await ProductImage.findOne({ where: { id } });
  if (!productImage) {
    return res.status(404).json({
      message: `Không tìm thấy hình ảnh của sản phẩm có id là ${id}`,
    });
  }
  productImage.url = url;
  productImage.productId = productId;
  await productImage.save();
  return res.json({
    message: "Update hình ảnh của sản phẩm thành công ",
    data: productImage,
  });
};

module.exports = {
  createProductImage,
  getAllProductImage,
  getProductImageById,
  deleteProductImageById,
  updateProductImage,
};
