const express = require("express");
const app = express();
const port = 3000;
const morgan = require("morgan");
const sequelize = require("./connects");
const handleRouters = require("./routes");
app.use(express.json());
app.use(morgan("dev"));

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
