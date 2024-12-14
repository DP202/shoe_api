const Brand = require("../models/Brand");
const Category = require("../models/Category");
const Color = require("../models/Color");
const Product = require("../models/Product");
const ProductImages = require("../models/ProductImages");
const Size = require("../models/Size");
const Variant = require("../models/Variant");

const createProduct = async (req, res, next) => {
  try {
    const {
      name,
      desc,
      thumbnai,
      brandId,
      categoryId,
      colorIds,
      sizeIds,
      price,
      price_promotion,
      quantity,
    } = req.body;

    // Tạo sản phẩm mới
    const product = await Product.create({
      name,
      desc,
      thumbnai,
      brandId,
      categoryId,
    });

    if (!colorIds || !Array.isArray(colorIds) || colorIds === 0) {
      return res.status(400).json({
        message: "Mảng ColorIds không hợp lệ !",
      });
    }

    if (!sizeIds || !Array.isArray(sizeIds) || sizeIds.length === 0) {
      return res.status(400).json({
        message: "Mảng SizeIds không hợp lệ !",
      });
    }

    for (let i = 0; i < colorIds.length; i++) {
      for (let j = 0; j < sizeIds.length; j++) {
        if (!colorIds[i] || !sizeIds[j]) {
          return res.status(400).json({
            message: "ColorId hoặc SizeId không hợp lệ !",
          });
        }
        await Variant.create({
          productId: product.id,
          colorId: colorIds[i],
          sizeId: sizeIds[j],
          price,
          price_promotion,
          quantity,
        });
      }
    }

    res.status(201).json({
      message: "Thêm sản phẩm thành công",
      data: product,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Có lỗi xảy ra khi tạo sản phẩm : " + error,
    });
  }
};

const getAllProducts = async (req, res, next) => {
  try {
    const product = await Product.findAll({
      include: [
        { model: Category, as: "category" },
        { model: Brand, as: "brand" },
        {
          model: Variant,
          as: "variants",
          include: [
            {
              model: Color,
              as: "colors",
            },
            {
              model: Size,
              as: "sizes",
            },
          ],
        },
      ],
    });
    res.status(200).json({
      data: product,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

const getProductById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const product = await Product.findByPk(id, {
      include: [
        { model: Category, as: "category" },
        { model: Brand, as: "brand" },
        {
          model: Variant,
          as: "variants",
          include: [
            {
              model: Color,
              as: "colors",
            },
            {
              model: Size,
              as: "sizes",
            },
          ],
        },
      ],
    });

    if (!product) {
      return res.status(404).json({
        message: "Không tìm thấy sản phẩm với ID này!",
      });
    }

    return res.status(200).json({
      data: product,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Lỗi xảy ra khi lấy sản phẩm : " + error.message,
    });
  }
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
