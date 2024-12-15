const express = require("express");
const app = express();

const bodyParser = require("body-parser");
const fs = require("fs");
const mime = require("mime");

const port = 3000;
const morgan = require("morgan");
const sequelize = require("./connects");
const handleRouters = require("./routes");
const cors = require("cors");
const path = require("path");
app.use(morgan("dev"));
app.use(express.json());

app.use(cors());
require("./models/relationship");

const uploadsDirectory = path.join(__dirname, "uploads");
app.use("/uploads", express.static(uploadsDirectory));

sequelize
  .sync()
  .then(() => {
    console.log("Connected database successfully");
  })
  .catch(() => {
    console.log("Failed to connect database");
  });

handleRouters(app);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
