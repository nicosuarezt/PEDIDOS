const express = require("express");
const router = express.Router();
const { dynamoClient } = require("../dynamo");

const table = process.env.AWS_GROUP_SKU_TABLE;

router.get("/api/getAllGroupSKU", async (req, res) => {
  const params = {
    TableName: table,
    ScanIndexForward: false,
  };
  const grupos = await dynamoClient.scan(params).promise();
  res.send(grupos.Items);
});
router.get("/api/getAllFieldSKU/:idGroup", async (req, res) => {
  const { idGroup } = req.params;
  const params = {
    Key: { id: idGroup },
    TableName: table,
  };
  const campos = await dynamoClient.get(params).promise();
  console.log(campos);
  if (campos?.Item?.camposku) {
    res.send(campos?.Item?.camposku);
  } else {
    res.send([]);
  }
});
router.get("/api/getAllFieldValue/:idField/:idValue", async (req, res) => {
  const { idField, idValue } = req.params;
  const params = {
    Key: { id: idField },
    TableName: table,
  };
  const campos = await dynamoClient.get(params).promise();
  console.log(campos);
  if (campos?.Item) {
    res.send(campos?.Item?.camposku[idValue].values);
  } else {
    res.send([]);
  }
});

router.post("/api/addGroupSKU", async (req, res) => {
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
router.post("/api/addFieldSKU", async (req, res) => {
  let data = req.body;
  // console.log(data);
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
module.exports = router;
router.post("/api/addValueFieldSKU", async (req, res) => {
  let data = req.body;
  // console.log(data);
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
module.exports = router;
