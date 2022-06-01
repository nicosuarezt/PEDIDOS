const express = require("express");
const router = express.Router();
const { dynamoClient, S3 } = require("../dynamo");
const { v4: uuidv4 } = require("uuid");

const table_name = process.env.AWS_PRODUCT_TABLE;

router.get("/api/getAllProducts", async (req, res) => {
  const params = {
    TableName: table_name,
    ScanIndexForward: false,
  };
  const products = await dynamoClient.scan(params).promise();
  res.send(products.Items);
});
router.get("/api/getProduct/:idSKU", async (req, res) => {
  const { idSKU } = req.params;

  const params = {
    Key: { id: idSKU },
    TableName: table_name,
  };
  const product = await dynamoClient.get(params).promise();
  if (product?.Item) {
    res.send(product?.Item);
  } else {
    res.send();
  }
});

router.post("/api/addProduct", (req, res) => {
  //   console.log(req);

  const { img } = req.files;
  const ext = img.name.match(/[^/]+(jpg|png|jpeg|gif)$/);
  const name_img = uuidv4() + "." + ext[1];
  const url_img = `https://${process.env.AWS_S3_BUCKET_NAME}.s3.amazonaws.com/${name_img}`;
  const resta = S3.putObject({
    Key: name_img,
    Bucket: process.env.AWS_S3_BUCKET_NAME,
    ContentType: img.mimetype,
    Body: img.data,
  }).promise();
  resta.then(
    function (data) {
      const product = req.body;
      product["img_url"] = url_img;
      const params = {
        TableName: table_name,
        Item: product,
      };
      const producto = dynamoClient.put(params).promise();
      producto.then(
        function () {
          res.status(200).send("success");
        },
        function (error) {
          res.status(400).send("fail");
        }
      );
    },
    function (error) {
      res.send(error);
    }
  );
});

module.exports = router;
