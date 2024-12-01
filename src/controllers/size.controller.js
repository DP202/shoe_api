const Size = require("../models/Size");

const createSize = async (req, res, next) => {
  const { name } = req.body;
  const size = await Size.create({ name });
  res.status(201).json({
    message: "Thêm kích thước thành công ",
    data: size,
  });
};

const getAllSizes = async (req, res, next) => {
  const sizes = await Size.findAll();
  res.status(200).json({
    data: sizes,
  });
};

const getSizeById = async (req, res, next) => {
  const { id } = req.params;
  const size = await Size.findByPk(id);
  if (!size) {
    return res
      .status(404)
      .json({ message: "Không tìm thấy kích thước với ID này!" });
  }

  return res.json({
    data: size,
  });
};

const deleteSizeById = async (req, res, next) => {
  const { id } = req.params;

  const size = await Size.findOne({ where: { id } }); // tìm kích thước với id được cung cấp
  if (!size) {
    res.status(400).json({
      message: `Không tìm thấy kích thước với ID = ${id}`,
    });
  }

  // Xóa
  await size.destroy();

  return res.json({
    message: "Xóa kích thước thành công ",
  });
};

const updateSize = async (req, res, next) => {
  const { id } = req.params;
  const { name } = req.body;

  const size = await Size.findOne({ where: { id } });
  if (!size) {
    return res.status(404).json({
      message: `Không tìm thấy kích thước có id là ${id}`,
    });
  }
  size.name = name;
  await size.save();
  return res.json({
    message: "Update kích thước thành công ",
    data: size,
  });
};

module.exports = {
  getAllSizes,
  createSize,
  getSizeById,
  deleteSizeById,
  updateSize,
};
