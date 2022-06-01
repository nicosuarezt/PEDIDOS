const express = require("express");
// const db = require('../db')
const router = express.Router();
const { dynamoClient } = require("../dynamo");
const cors = require("cors");

// const productoController = require('../../sapui5/webapp/controller/productoController')

router.get("/api/productName", (req, res) => {
  db.db.exec(
    "select id_producto,producto from t_producto",
    function (err, rows) {
      if (err) {
        return console.error("Error:", err);
      }
      // console.log('Rows:', rows);
      res.send(rows);
    }
  );
});
router.get("/api/test", (req, res) => {});

router.get("/api/productos", (req, res) => {
  db.db.exec(
    "select id_producto,no_referencia,imagen_producto,producto,categoria,marca,estado_producto,rating,precio from t_producto join t_marca on marca_id_marca=id_marca join t_categoria on categoria_id_categoria=id_categoria",
    function (err, rows) {
      if (err) {
        return console.error("Error:", err);
      }
      // console.log('Rows:', rows);
      res.send(rows);
    }
  );
});

router.get("/api/clientes", (req, res) => {
  db.db.exec(
    "select id_cliente,id_usuario,primer_nombre,primer_apellido from t_cliente join t_usuario on usuario_id_usuario = id_usuario where estado_usuario=true",
    function (err, rows) {
      if (err) {
        return console.error("Error:", err);
      }
      // console.log('Rows:', rows);
      res.send(rows);
    }
  );
});

router.get("/api/marcas", (req, res) => {
  db.db.exec(
    "select * from t_marca where estado_marca=true",
    function (err, rows) {
      if (err) {
        return console.error("Error:", err);
      }
      // console.log('Rows:', rows);
      res.send(rows);
    }
  );
});

router.get("/api/categorias", async (req, res) => {
  db.db.exec(
    "select * from t_categoria where estado_categoria=true",
    function (err, rows) {
      if (err) {
        return console.error("Error:", err);
      }
      // console.log('Rows:', rows);
      res.send(rows);
    }
  );
});

router.get("/api/skuName", (req, res) => {
  db.db.exec("select id_sku,desc_sku from t_sku", function (err, rows) {
    if (err) {
      return console.error("Error:", err);
    }
    // console.log('Rows:', rows);
    res.send(rows);
  });
});

router.get("/api/getAllSkus", (req, res) => {
  db.db.exec(
    "select id_sku,desc_sku,producto,estado_sku from t_sku join t_producto on producto_id_producto=id_producto order by id_sku",
    function (err, rows) {
      if (err) {
        return console.error("Error:", err);
      }
      // console.log('Rows:', rows);
      res.send(rows);
    }
  );
});

router.get("/api/grupoCampoSkuName", (req, res) => {
  db.db.exec(
    "select id_grupo_campo_sku,desc_grupo_campo from t_grupo_campo_sku",
    function (err, rows) {
      if (err) {
        return console.error("Error:", err);
      }
      // console.log('Rows:', rows);
      res.send(rows);
    }
  );
});

router.get("/api/getAllGrupoCampoSku", (req, res) => {
  db.db.exec(
    "select id_grupo_campo_sku,desc_grupo_campo,desc_sku,estado_grupo_campo from t_grupo_campo_sku join t_sku on sku_id_sku=id_sku order by id_grupo_campo_sku",
    function (err, rows) {
      if (err) {
        return console.error("Error:", err);
      }
      // console.log('Rows:', rows);
      res.send(rows);
    }
  );
});

router.get("/api/campoSkuName", (req, res) => {
  db.db.exec(
    "select id_campo_sku,desc_campo_sku from t_campo_sku",
    function (err, rows) {
      if (err) {
        return console.error("Error:", err);
      }
      // console.log('Rows:', rows);
      res.send(rows);
    }
  );
});

router.get("/api/getAllCampoSku", (req, res) => {
  db.db.exec(
    "select id_campo_sku,desc_campo_sku,desc_grupo_campo,estado_campo_sku from t_campo_sku join t_grupo_campo_sku on t_campo_sku.id_grupo_campo_sku=t_grupo_campo_sku.id_grupo_campo_sku order by id_campo_sku",
    function (err, rows) {
      if (err) {
        return console.error("Error:", err);
      }
      // console.log('Rows:', rows);
      res.send(rows);
    }
  );
});

router.get("/api/getAllValorSku", (req, res) => {
  db.db.exec(
    "select id_valor_sku,valor_sku,desc_campo_sku,estado_valor_sku from t_valores_sku join t_campo_sku on campo_sku_id_campo_sku=id_campo_sku order by id_valor_sku",
    function (err, rows) {
      if (err) {
        return console.error("Error:", err);
      }
      // console.log('Rows:', rows);
      res.send(rows);
    }
  );
});

router.get("/api/productoById/:name", (req, res) => {
  db.db.exec(
    `select id_producto,producto,no_referencia,imagen_producto,precio,desc_producto,rating,estado_producto,id_categoria,categoria,id_marca,marca from t_categoria right join t_producto on categoria_id_categoria = id_categoria right join t_marca on marca_id_marca = id_marca where id_producto = '${req.params.name}'`,
    function (err, rows) {
      if (err) {
        return console.error("Error:", err);
      }
      // console.log('Rows:', rows);
      res.send(rows[0]);
    }
  );
});

router.get("/api/infoProducto/:name", (req, res) => {
  // console.log(req.params);
  db.db.exec(
    `select valor_sku,desc_campo_sku,desc_grupo_campo,desc_sku from t_valores_sku join t_campo_sku on campo_sku_id_campo_sku=id_campo_sku join t_grupo_campo_sku on t_campo_sku.id_grupo_campo_sku=t_grupo_campo_sku.id_grupo_campo_sku join t_sku on sku_id_sku=id_sku where producto_id_producto = '${req.params.name}'`,
    function (err, rows) {
      if (err) {
        return console.error("Error:", err);
      }
      // console.log('Rows:', rows);
      res.send(rows[0]);
    }
  );
});



router.post("/api/editProduct", (req, res) => {
  var query = `UPDATE "DBADMIN"."T_PRODUCTO" SET ID_PRODUCTO='${req.body.id_producto}',PRODUCTO='${req.body.producto}',NO_REFERENCIA=${req.body.no_ref},IMAGEN_PRODUCTO='${req.body.imagen_producto}',PRECIO=${req.body.precio},DESC_PRODUCTO='${req.body.desc_producto}',RATING=${req.body.rating},ESTADO_PRODUCTO='${req.body.estado_producto}',MARCA_ID_MARCA='${req.body.marca}',
    CATEGORIA_ID_CATEGORIA='${req.body.categoria}' WHERE ID_PRODUCTO='${req.body.id_producto}'`;
  db.db.exec(query, function (err, rows) {
    if (err) {
      console.error("Error:", err);
      return res.status(400).send(err);
    }
    // console.log('Rows:', rows);
    res.status(200).send(rows.toString());
  });
});

router.post("/api/addSku", (req, res) => {
  var query = `INSERT INTO "DBADMIN"."T_SKU" VALUES('${req.body.id_sku}','${req.body.desc_sku}',${req.body.estado_sku},'${req.body.id_producto}')`;
  db.db.exec(query, function (err, rows) {
    if (err) {
      console.error("Error:", err);
      return res.status(400).send(err);
    }
    // console.log('Rows:', rows);
    res.status(200).send(rows.toString());
  });
});

router.post("/api/addGrupoCampoSku", (req, res) => {
  var query = `INSERT INTO "DBADMIN"."T_GRUPO_CAMPO_SKU" VALUES('${req.body.id_grupo_campo_sku}','${req.body.desc_grupo_campo}',${req.body.estado_grupo_campo},'${req.body.id_sku}')`;
  db.db.exec(query, function (err, rows) {
    if (err) {
      console.error("Error:", err);
      return res.status(400).send(err);
    }
    // console.log('Rows:', rows);
    res.status(200).send(rows.toString());
  });
});

router.post("/api/addCampoSku", (req, res) => {
  var query = `INSERT INTO "DBADMIN"."T_CAMPO_SKU" VALUES('${req.body.id_campo_sku}','${req.body.desc_campo_sku}',${req.body.estado_campo_sku},'${req.body.id_grupo_campo_sku}')`;
  db.db.exec(query, function (err, rows) {
    if (err) {
      console.error("Error:", err);
      return res.status(400).send(err);
    }
    // console.log('Rows:', rows);
    res.status(200).send(rows.toString());
  });
});

router.post("/api/addValorSku", (req, res) => {
  var query = `INSERT INTO "DBADMIN"."T_VALORES_SKU" VALUES('${req.body.id_valor_sku}','${req.body.valor_sku}',${req.body.estado_valor_sku},'${req.body.id_campo_sku}')`;
  db.db.exec(query, function (err, rows) {
    if (err) {
      console.error("Error:", err);
      return res.status(400).send(err);
    }
    // console.log('Rows:', rows);
    res.status(200).send(rows.toString());
  });
});

router.delete("/api/deleteProduct/:name", (req, res) => {
  db.db.exec(
    `delete from t_producto where id_producto='${req.params.name}';`,
    function (err, rows) {
      if (err) {
        console.error("Error:", err);
        return res.status(400).send(err);
      }
      // console.log('Rows:', rows);
      res.status(200).send(rows.toString());
    }
  );
});

router.get("/api/category/:name", async (req, res) => {
  let { name } = req.params;
  const params = {
    TableName: "tpv_categorias",
    Key: { id: name },
  };
  try {
    const categoria = await dynamoClient.get(params).promise();
    res.status(200).send(categoria.Item);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

module.exports = router;
