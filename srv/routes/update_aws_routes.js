const express = require("express");
const router = express.Router();
const axios = require("axios");
const { dynamoClient } = require("../dynamo");

const instance = axios.create({
  baseURL: process.env.URL_SAP,
  auth: {
    username: process.env.USER_SAP,
    password: process.env.PWD_SAP,
  },
});

router.get("/sap/getMarcas_CDS", async (req, res) => {
  instance({
    url: "/ZTESTMARC_CDS/ZTESTMARC?sap-client=110",
    method: "GET",
  }).then((marcas) => {
    console.log(marcas.data.d.results);
    const params = {
      RequestItems: {
        tpv_marca: formRequestJSON(marcas.data.d.results),
      },
    };
    dynamoClient.batchWrite(params, (err, data) => {
      if (err) {
        console.log(err);
        res.status(err.statusCode).send("fail");
      } else {
        res.status(200).send("success");
      }
    });
  });
});
router.get("/sap/getSKU_CDS", async (req, res) => {
  instance({
    url: "/ZTESTSKU_CDS/ZTESTSKU?sap-client=110",
    method: "GET",
  }).then((SKU) => {
    console.log(SKU.data.d.results);
    const params = {
      RequestItems: {
        tpv_productos: formRequestSKUJSON(SKU.data.d.results),
      },
    };
    dynamoClient.batchWrite(params, (err, data) => {
      if (err) {
        console.log(err);
        res.status(err.statusCode).send("fail");
      } else {
        res.status(200).send("success");
      }
    });
  });
});

formRequestJSON = (data) => {
  let reqData = [];
  data.forEach((marca) => {
    reqData.push({
      PutRequest: {
        Item: {
          id: marca.id,
          marca: marca.marca,
        },
      },
    });
  });
  return reqData;
};
formRequestSKUJSON = (data) => {
  let reqData = [];
  data.forEach((sku) => {
    reqData.push({
      PutRequest: {
        Item: {
          id: sku.id,
          producto: sku.producto,
          marca: sku.marca,
          categoria: sku.categoria,
        },
      },
    });
  });
  return reqData;
};

module.exports = router;
