import {
  Button,
  ButtonDesign,
  Label,
  Table,
  TableCell,
  TableColumn,
  TableRow,
  Text,
} from "@ui5/webcomponents-react";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getList, getPrice } from "../../api/requestPrice";
import { getProducto } from "../../api/requestProduct";
import FlexBoxContainer from "../Special/FlexBoxContainer";
import TitleBar from "../Special/TitleBar";

function Prices() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [precios, setPrecios] = useState([]);

  useEffect(async () => {
    getPrice().then((precio) => {
      const price = precio.map((precioIndv) => {
        if (precioIndv?.id_sku) {
          return getProducto(precioIndv.id_sku).then((data) => {
            if (data) {
              precioIndv["id_sku"] = data.producto + "(" + data.id + ")";
              return getList(precioIndv.id_lista).then((lista) => {
                precioIndv["id_lista"] = lista.lista + "(" + lista.id + ")";
                return precioIndv;
              });
            }
            return precioIndv;
          });
        }
      });
      Promise.all(price).then((data) => {
        setPrecios(data)
      });
    });
  }, []);

  return (
    <FlexBoxContainer>
      <TitleBar title={"Listado de Precios"} url={"/"}>
        <Button
          icon="money-bills"
          design={ButtonDesign.Transparent}
          onClick={() => navigate("/add-price", { state: { state, precios } })}
        >
          Añadir Precio
        </Button>
      </TitleBar>
      <Table
        noDataText="No hay Precios"
        style={{ marginTop: "20px" }}
        growing="Scroll"
        columns={
          <>
            <TableColumn style={{ width: "12rem" }}>
              <Label>ID SKU</Label>
            </TableColumn>
            <TableColumn style={{ width: "12rem" }}>
              <Label>LISTA</Label>
            </TableColumn>
            <TableColumn style={{ width: "30rem" }} minWidth={800}>
              <Label>Precio</Label>
            </TableColumn>
            <TableColumn>
              <Label>Editar</Label>
            </TableColumn>
            <TableColumn>
              <Label>Eliminar</Label>
            </TableColumn>
          </>
        }
      >
        {precios.map((precio) => (
          <TableRow key={precio.id}>
            <TableCell>
              <Text>{precio.id_sku}</Text>
            </TableCell>
            <TableCell>
              <Text>{precio.id_lista}</Text>
            </TableCell>
            <TableCell>{precio.precio}</TableCell>
            <TableCell>
              <Button
                design="Positive"
                //   onClick={() => editCategory(precio)}
              >
                Editar
              </Button>
            </TableCell>
            <TableCell>
              <Button
                design="Negative"
                // onClick={() => delete_category(precio.id)}
              >
                Eliminar
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </Table>
      {/* <Toast ref={confirm}>La marca ha sido eliminada con éxito</Toast> */}
    </FlexBoxContainer>
  );
}

export default Prices;
