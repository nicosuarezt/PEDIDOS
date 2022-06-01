const express = require("express");
const router = express.Router();
const axios = require("axios");
const { dynamoClient } = require("../dynamo");

const table = process.env.AWS_CLIENT_TABLE;

router.get("/api/getAllClients", async (req, res) => {
  const params = {
    TableName: table,
    ScanIndexForward: false,
  };
  const clientes = await dynamoClient.scan(params).promise();
  res.send(clientes.Items);
});

module.exports = router;
