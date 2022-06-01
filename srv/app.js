const express = require("express");
const cors = require("cors");
const fileUpload = require("express-fileupload");
// const db = require('./db');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cors());
app.use(
  fileUpload({
    createParentPath: true,
  })
);

//routes
app.use(require("./routes/user_routes"));
app.use(require("./routes/brand_routes"));
app.use(require("./routes/category_routes"));
app.use(require("./routes/watherhouse_routes"));
app.use(require("./routes/product_routes"));
app.use(require("./routes/sku_routes"));
app.use(require("./routes/price_routes"));
app.use(require("./routes/update_aws_routes"));
app.use(require("./routes/client_routes"));

app.listen(8082, function () {
  console.log("!Server UP! on http://localhost:8082/");
});
