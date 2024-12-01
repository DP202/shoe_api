const Category = require("../models/Category");

const getAllCategory = async (req, res, next) => {
  const categories = await Category.findAll();

  res.status(200).json({
    data: categories,
  });
};

const getCategoryById = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "ID không được cung cấp" });
    }

    const category = await Category.findByPk(id);

    if (!category) {
      return res
        .status(404)
        .json({ message: "Không tìm thấy danh mục với ID này!" });
    }

    // Nếu category tồn tại, trả về dữ liệu
    return res.json({ data: category });
  } catch (error) {
    next(error);
  }
};
const updateCategory = async (req, res, next) => {
  const { id } = req.params;
  const { name } = req.body;
  const category = await Category.findOne({
    where: {
      id,
    },
  });
  if (!category) {
    return res.status(404).json({
      message: "Không tìm thấy danh mục",
    });
  }
  category.name = name;
  await category.save();
  res.json({
    message: "Update danh mục thành công",
    data: category,
  });
};

const deleteCategory = async (req, res, next) => {
  try {
    const { id } = req.params;

    const category = await Category.findOne({
      where: { id },
    });
    if (!category) {
      return res.status(404).json({
        message: `Không tìm thấy danh mục với ID = ${id}`,
      });
    }
    await category.destroy();

    return res.json({
      message: "Xóa danh mục thành công",
    });
  } catch (error) {
    next(error);
  }
};

const createCategory = async (req, res, next) => {
  const { name } = req.body;
  const category = await Category.create({
    name,
  });
  res.status(201).json({
    message: "Thêm danh mục thành công",
    data: category,
  });
};

module.exports = {
  createCategory,
  getCategoryById,
  getAllCategory,
  updateCategory,
  deleteCategory,
};
