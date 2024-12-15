const { where } = require("sequelize");
const Brand = require("../models/Brand");
const Category = require("../models/Category");
const Color = require("../models/Color");
const Product = require("../models/Product");
const ProductImages = require("../models/ProductImages");
const Size = require("../models/Size");
const Variant = require("../models/Variant");

const uploadImage = async (req, res, next) => {};

const fs = require("fs");
const path = require("path");
const createProduct = async (req, res, next) => {
  try {
    const {
      name,
      desc,
      brandId,
      categoryId,
      price,
      price_promotion,
      quantity,
    } = req.body;

    let colorIds = req.body.colorIds || "[]";
    let sizeIds = req.body.sizeIds || "[]";

    console.log("colorIds", colorIds);

    if (typeof colorIds === "string") {
      colorIds = JSON.parse(colorIds);
    }
    if (typeof sizeIds === "string") {
      sizeIds = JSON.parse(sizeIds);
    }

    if (!Array.isArray(colorIds) || colorIds.length === 0) {
      return res.status(400).json({
        message: "Mảng ColorIds không hợp lệ! Vui lòng gửi ít nhất một màu.",
      });
    }

    if (!Array.isArray(sizeIds) || sizeIds.length === 0) {
      return res.status(400).json({
        message:
          "Mảng SizeIds không hợp lệ! Vui lòng gửi ít nhất một kích thước.",
      });
    }

    let thumbnai = "";
    if (req.file) {
      thumbnai = req.file.filename;
    }

    // Tạo sản phẩm mới
    const product = await Product.create({
      name,
      desc,
      thumbnai,
      brandId,
      categoryId,
      price,
      price_promotion,
      quantity,
    });

    const validSizeIds = await Size.findAll({
      where: {
        id: sizeIds,
      },
    });

    if (validSizeIds.length !== sizeIds.length) {
      return res.status(400).json({
        message: "Một số sizeId không hợp lệ hoặc không tồn tại trong hệ thống",
      });
    }

    // for (let i = 0; i < colorIds.length; i++) {
    //   for (let j = 0; j < sizeIds.length; j++) {
    //     // Tạo variant cho mỗi kết hợp color và size
    //     await Variant.create({
    //       productId: product.id,
    //       colorId: colorIds[i],
    //       sizeId: sizeIds[j],
    //       price,
    //       product_name: product.name,
    //       price_promotion,
    //       quantity,
    //     });
    //   }
    // }

    for (const colorId of colorIds) {
      for (const sizeId of sizeIds) {
        // Tạo variant cho mỗi kết hợp color và size
        await Variant.create({
          productId: product.id,
          colorId,
          sizeId,
          price,
          product_name: product.name,
          price_promotion,
          quantity,
        });
      }
    }

    // Trả về kết quả
    res.status(201).json({
      message: "Thêm sản phẩm thành công",
      data: product,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Có lỗi xảy ra khi tạo sản phẩm: " + error.message,
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
  uploadImage,
};
