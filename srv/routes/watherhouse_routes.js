const express = require("express");
const router = express.Router();
const { dynamoClient } = require("../dynamo");
const cors = require("cors");

router.get("/api/getAllAlmacenes", async (req, res) => {
  const table = "tpv_almacen";
  const params = {
    TableName: table,
    ScanIndexForward: false,
  };
  const warehouses = await dynamoClient.scan(params).promise();
  res.send(warehouses.Items);
});

router.post("/api/addWarehouse", async (req, res) => {
  let data = req.body;
  const params = {
    TableName: "tpv_almacen",
    Item: data,
  };
  try {
    await dynamoClient.put(params).promise();
    res.status(200).send("success");
  } catch (error) {
    res.status(400).send("fail");
  }
});
router.put("/api/updateWarehouse", async (req, res) => {
  let data = req.body;
  const params = {
    TableName: "tpv_almacen",
    Item: data,
  };
  try {
    await dynamoClient.put(params).promise();
    res.status(200).send("success");
  } catch (error) {
    res.status(400).send("fail");
  }
});
router.delete("/api/deleteWarehouse/:name", async (req, res) => {
  let { name } = req.params;
  const params = {
    TableName: "tpv_almacen",
    Key: { id: name },
  };
  try {
    await dynamoClient.delete(params).promise();
    res.status(200).send("success");
  } catch (error) {
    console.log(error);
    res.status(400).send("fail");
  }
});

module.exports = router;
