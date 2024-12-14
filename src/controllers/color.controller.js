const { where } = require("sequelize");
const Color = require("../models/Color");
const Variant = require("../models/Variant");

const createColor = async (req, res, next) => {
  try {
    const { value } = req.body;
    const color = await Color.create({ value });
    return res.status(201).json({
      message: "Thêm màu sắc thành công !",
      data: color,
    });
  } catch (err) {
    return res.json({ message: err });
  }
};

const getAllColor = async (req, res, next) => {
  const color = await Color.findAll();
  res.status(200).json({
    data: color,
  });
};

const getColorById = async (req, res, next) => {
  const { id } = req.params;
  const color = await Color.findByPk(id);
  if (!color) {
    return res.status(404).json({
      message: "Không tìm thấy màu sắc với id này",
    });
  }

  return res.json({
    data: color,
  });
};

const deleteColorById = async (req, res, next) => {
  const { id } = req.params;
  const color = await Color.findOne({ where: { id } });

  if (!color) {
    res.status(400).json({
      message: `Không tìm thấy màu sắc với ID = ${id}`,
    });
  }

  const relatedVariants = await Variant.findOne({ where: { colorId: id } });
  if (relatedVariants) {
    return res.status(400).json({
      message: "Không thể xóa màu sắc này vì nó nằm trong bảng ghi Variants",
    });
  }

  await color.destroy();
  return res.json({
    message: "Xóa màu sắc thành công",
  });
};

const updateColor = async (req, res, next) => {
  const { id } = req.params;
  const { value } = req.body;

  const color = await Color.findOne({ where: { id } });
  if (!color) {
    return res.status(404).json({
      message: `Không tìm thấy màu sắc với id là ${id}`,
    });
  }
  color.value = value;
  await color.save();
  return res.json({
    message: "Update màu sắc thành công ",
    data: color,
  });
};

module.exports = {
  createColor,
  getAllColor,
  getColorById,
  deleteColorById,
  updateColor,
};
