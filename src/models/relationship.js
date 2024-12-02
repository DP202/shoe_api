// Role-User : 1-N

const Brand = require("./Brand");
const Category = require("./Category");
const Product = require("./Product");
const ProductImages = require("./ProductImages");
const Role = require("./Role");
const User = require("./User");

// Một Role có nhiều User #  Mỗi user chỉ có 1 role duy nhất
Role.hasMany(User, {
  foreignKey: "role",
});
User.belongsTo(Role, {
  foreignKey: "role",
  as: "roles",
});

// Category - Product : 1 -N
// Một danh mục có nhiều sản phẩm # Mỗi sản phẩm thuộc về 1 danh mục
Category.hasMany(Product, {
  foreignKey: "categoryId",
});

Product.belongsTo(Category, {
  foreignKey: "categoryId",
  as: "categories",
});

// Brand - Product : 1-N
// 1 thương hiệu có nhiều sản phẩm # Sản phẩm thuộc về 1 thương hiệu duy nhất
Brand.hasMany(Product, {
  foreignKey: "brandId",
});

Product.belongsTo(Brand, {
  foreignKey: "brandId",
  as: "brands",
});

// product - product_image
// 1 Sp có nhiều ảnh

Product.hasMany(ProductImages, {
  foreignKey: "productId",
});

ProductImages.belongsTo(Product, {
  foreignKey: "productId",
  as: "products",
});
