const brandRouter = require("./brand.router");
const categoryRouter = require("./category.router");
const colorRouter = require("./color.router");
const sizeRouter = require("./size.router");
const userRouter = require("./users.router");

const handleRouters = (app) => {
  app.use("/api/v1/users", userRouter);
  app.use("/api/v1/categories", categoryRouter);
  app.use("/api/v1/sizes", sizeRouter);
  app.use("/api/v1/brands", brandRouter);
  app.use("/api/v1/colors", colorRouter);
};

module.exports = handleRouters;
