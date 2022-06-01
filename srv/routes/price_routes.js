const express = require("express");
const router = express.Router();
const { dynamoClient } = require("../dynamo");

const table = process.env.AWS_PRICE_LIST_TABLE;
const table_price = process.env.AWS_PRICE_TABLE;

router.get("/api/getAllListPrice", async (req, res) => {
  const params = {
    TableName: table,
    ScanIndexForward: false,
  };
  const list = await dynamoClient.scan(params).promise();
  res.send(list.Items);
});
router.get("/api/getAllPrices", async (req, res) => {
  const params = {
    TableName: table_price,
    ScanIndexForward: false,
  };
  const price = await dynamoClient.scan(params).promise();
  res.send(price.Items);
});
router.get("/api/getList/:idLista", async (req, res) => {
  const { idLista } = req.params;

  const params = {
    Key: { id: idLista },
    TableName: table,
  };
  const price = await dynamoClient.get(params).promise();
  if (price?.Item) {
    res.send(price?.Item);
  } else {
    res.send();
  }
});
router.get("/api/getSKUPrice/:idSKU", async (req, res) => {
  const { idSKU } = req.params;

  const params = {
    Key: { id_sku: idSKU },
    TableName: table_price,
  };
  const price = await dynamoClient.get(params).promise();
  if (price?.Item) {
    res.send(price?.Item);
  } else {
    res.send();
  }
});

router.post("/api/addListPrice", async (req, res) => {
  let data = req.body;
  const params = {
    TableName: table,
    Item: data,
  };
  try {
    await dynamoClient.put(params).promise();
    res.status(200).send("success");
  } catch (error) {
    res.status(400).send("fail");
  }
});
router.post("/api/addPrice", async (req, res) => {
  let data = req.body;
  const params = {
    TableName: table_price,
    Item: data,
  };
  try {
    await dynamoClient.put(params).promise();
    res.status(200).send("success");
  } catch (error) {
    res.status(400).send("fail");
  }
});
module.exports = router;
