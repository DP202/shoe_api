// Role-User : 1-N

const Brand = require("./Brand");
const Category = require("./Category");
const Color = require("./Color");
const Order = require("./Order");
const Order_Details = require("./Order_Details.js");
const Product = require("./Product");
const ProductImages = require("./ProductImages");
const Role = require("./Role");
const Size = require("./Size");
const User = require("./User");
const Variant = require("./Variant");

// Một Role có nhiều User #  Mỗi user chỉ có 1 role duy nhất
Role.hasMany(User, {
  foreignKey: "roleId",
});
User.belongsTo(Role, {
  foreignKey: "roleId",
  as: "roles",
});

// Category - Product : 1 -N
// Một danh mục có nhiều sản phẩm # Mỗi sản phẩm thuộc về 1 danh mục
Category.hasMany(Product, {
  foreignKey: "categoryId",
  as: "products",
});

Product.belongsTo(Category, {
  foreignKey: "categoryId",
  as: "category",
});

// Brand - Product : 1-N
// 1 thương hiệu có nhiều sản phẩm # Sản phẩm thuộc về 1 thương hiệu duy nhất
Brand.hasMany(Product, {
  foreignKey: "brandId",
});

Product.belongsTo(Brand, {
  foreignKey: "brandId",
  as: "brand",
});

// product - product_image
// 1 Sp có nhiều ảnh

Product.hasMany(ProductImages, {
  foreignKey: "productId",
  as: "products",
});

ProductImages.belongsTo(Product, {
  foreignKey: "productId",
  as: "products",
});

// Product - Variant : 1 - N
// 1 SP có nhiều biến thể  #  Mỗi biến thể thuộc về 1 SP duy nhất
Product.hasMany(Variant, {
  foreignKey: "productId",
  as: "variants",
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
  as: "sizes",
});

// User - Order : 1 - N

User.hasMany(Order, {
  foreignKey: "userId",
});

Order.belongsTo(User, {
  foreignKey: "userId",
  as: "users",
});

// OrderDetail - Order
Order.hasMany(Order_Details, {
  foreignKey: "orderId",
});

Order_Details.belongsTo(Order, {
  foreignKey: "orderId",
  as: "orders",
});

// Variant - OrdeDetail

Variant.hasMany(Order_Details, {
  foreignKey: "variantId",
});

Order_Details.belongsTo(Variant, {
  foreignKey: "variantId",
  as: "variants",
});
