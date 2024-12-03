// Role-User : 1-N

const Brand = require("./Brand");
const Category = require("./Category");
const Color = require("./Color");
const Product = require("./Product");
const ProductImages = require("./ProductImages");
const Role = require("./Role");
const Size = require("./Size");
const User = require("./User");
const Variant = require("./Variant");

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

// Product - Variant : 1 - N
// 1 SP có nhiều biến thể  #  Mỗi biến thể thuộc về 1 SP duy nhất
Product.hasMany(Variant, {
  foreignKey: "productId",
});

Variant.belongsTo(Product, {
  foreignKey: "productId",
  as: "products",
});

// Color - Variant : 1 - N

Color.hasMany(Variant, {
  foreignKey: "colorId",
});

Variant.belongsTo(Color, {
  foreignKey: "colorId",
  as: "colors",
});

// Size - Variant : 1 - N

Size.hasMany(Variant, {
  foreignKey: "sizeId",
});

Variant.belongsTo(Size, {
  foreignKey: "colorId",
  as: "colors",
});
