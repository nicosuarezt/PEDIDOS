const express = require("express");
const router = express.Router();
const { dynamoClient } = require("../dynamo");
const cors = require("cors");

const table = process.env.AWS_CATEGORY_TABLE;


router.get("/api/getAllCategorias", async (req, res) => {
  
  const params = {
    TableName: table,
    ScanIndexForward: false,
  };
  const categories = await dynamoClient.scan(params).promise();
  res.send(categories.Items);
});
router.get("/api/getCategory/:idCategory", async (req, res) => {
  const { idCategory } = req.params;

  const params = {
    Key: { id: idCategory },
    TableName: table,
  };
  const category = await dynamoClient.get(params).promise();
  if (category?.Item) {
    res.send(category?.Item);
  } else {
    res.send();
  }
});

router.post("/api/addCategory", async (req, res) => {
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

router.put("/api/updateCategory", async (req, res) => {
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
router.delete("/api/deleteCategory/:name", async (req, res) => {
  let { name } = req.params;
  const params = {
    TableName: table,
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
