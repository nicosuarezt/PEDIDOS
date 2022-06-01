const express = require("express");
const router = express.Router();
const { dynamoClient } = require("../dynamo");
const cors = require("cors");

const table = process.env.AWS_BRAND_TABLE;


router.post("/api/addBrand", async (req, res) => {
  let data = req.body;
  const params = {
    TableName:  table,
    Item: data,
  };
  dynamoClient.put(params, (err, data) => {
    if (err) {
      res.status(err.statusCode).send("fail");
    } else {
      res.status(200).send("success");
    }
  });
});
router.get("/api/getAllMarcas", async (req, res) => {
  const params = {
    TableName: table,
    ScanIndexForward: false,
  };
  const marcas = await dynamoClient.scan(params).promise();
  res.send(marcas.Items);
});

router.get("/api/getMarca/:idBrand", async (req, res) => {
  const { idBrand } = req.params;

  const params = {
    Key: { id: idBrand },
    TableName: table,
  };
  const brand = await dynamoClient.get(params).promise();
  if (brand?.Item) {
    res.send(brand?.Item);
  } else {
    res.send();
  }
});

router.put("/api/updateBrand", async (req, res) => {
  let data = req.body;
  const params = {
    TableName:  table,
    Item: data,
  };
  try {
    await dynamoClient.put(params).promise();
    res.status(200).send("success");
  } catch (error) {
    res.status(400).send("fail");
  }
});

router.delete("/api/deleteBrand/:name", async (req, res) => {
  let { name } = req.params;
  const params = {
    TableName:  table,
    Key: { id: name },
  };
  try {
    const categoria = await dynamoClient.delete(params).promise();
    res.status(200).send("success");
  } catch (error) {
    console.log(error);
    res.status(400).send("fail");
  }
});

module.exports = router;
