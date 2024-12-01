const { where } = require("sequelize");
const Brand = require("../models/Brand");

const createBrand = async (req, res, next) => {
  const { name } = req.body;
  const brand = await Brand.create({ name });
  res.status(201).json({
    message: "Thêm thương hiệu thành công !",
    data: brand,
  });
};

const getAllBrand = async (req, res, next) => {
  const brand = await Brand.findAll();
  res.status(200).json({
    data: brand,
  });
};

const getBrandById = async (req, res, next) => {
  const { id } = req.params;
  const brand = await Brand.findByPk(id);
  if (!brand) {
    return res.status(404).json({
      message: "Không tìm thấy thương hiệu với id này",
      data: brand,
    });
  }

  return res.json({
    data: brand,
  });
};

const deleteBrandById = async (req, res, next) => {
  const { id } = req.params;
  const brand = await Brand.findOne({ where: { id } });

  if (!brand) {
    res.status(400).json({
      message: `Không tìm thấy thương hiệu với ID = ${id}`,
    });
  }

  await brand.destroy();
  return res.json({
    message: "Xóa thương hiệu thành công",
  });
};

const updateBrand = async (req, res, next) => {
  const { id } = req.params;
  const { name } = req.body;

  const brand = await Brand.findOne({ where: { id } });
  if (!brand) {
    return res.status(404).json({
      message: `Không tìm thấy thương hiệu với id là ${id}`,
    });
  }
  brand.name = name;
  await brand.save();
  return res.json({
    message: "Update thương hiệu thành công ",
    data: brand,
  });
};

module.exports = {
  createBrand,
  getAllBrand,
  getBrandById,
  deleteBrandById,
  updateBrand,
};
