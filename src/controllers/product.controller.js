const Product = require("../models/Product");

const createProduct = async (req, res, next) => {
  const { name, desc, thumbnai, brandId, categoryId } = req.body;

  const product = await Product.create({
    name,
    desc,
    thumbnai,
    brandId,
    categoryId,
  });
  res.status(201).json({
    message: "Thêm sản phẩm thành công",
    data: product,
  });
};

const getAllProducts = async (req, res, next) => {
  const product = await Product.findAll();
  res.status(200).json({
    data: product,
  });
};

const getProductById = async (req, res, next) => {
  const { id } = req.params;
  const product = await Product.findByPk(id);
  if (!product) {
    return res.status(404).json({
      message: "Không tìm thấy sản phẩm với ID này!",
    });
  }

  return res.status(200).json({
    data: product,
  });
};

const deleteProductById = async (req, res, next) => {
  const { id } = req.params;
  const product = await Product.findOne({ where: { id } });
  if (!product) {
    return res.status(404).json({
      message: "Không tìm thấy sản phẩm với ID này!",
    });
  }
  await product.destroy();

  return res.json({
    message: "Xóa sản phẩm thành công",
  });
};

const updateProduct = async (req, res, next) => {
  const { id } = req.params;
  const { name, desc, thumbnai, brandId, categoryId } = req.body;
  const product = await Product.findOne({ where: { id } });

  if (!product) {
    return res.status(404).json({
      message: `Không tìm thấy sản phẩm có id là ${id}`,
    });
  }
  product.name = name;
  product.desc = desc;
  product.thumbnai = thumbnai;
  product.brandId = brandId;
  product.categoryId = categoryId;
  await product.save();

  return res.json({
    message: "Update sản phẩm thành công ",
    data: product,
  });
};

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  deleteProductById,
  updateProduct,
};
