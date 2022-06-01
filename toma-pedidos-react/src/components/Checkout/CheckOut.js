import {
  Bar,
  Button,
  Label,
  ObjectStatus,
  Table,
  TableCell,
  TableColumn,
  TableRow,
  Text,
} from "@ui5/webcomponents-react";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import FlexBoxContainer from "../Special/FlexBoxContainer";
import TitleBar from "../Special/TitleBar";
import ClientInfo from "./ClientInfo";

function CheckOut() {
  const { state } = useLocation();
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const calcTotal = state.products.reduce((acc, prod) => {
      return acc + prod.subtotal;
    }, 0);
    setTotal(calcTotal)
  }, []);

  return (
    <FlexBoxContainer>
      <TitleBar title={"CHECKOUT"} url={-1}></TitleBar>
      <ClientInfo/>
      <Table
        noDataText="No se han elegido productos"
        style={{ marginTop: "20px" }}
        growing="Scroll"
        columns={
          <>
            <TableColumn style={{ width: "8rem" }}>
              <Label>Producto</Label>
            </TableColumn>
            <TableColumn style={{ width: "12rem" }}></TableColumn>
            <TableColumn style={{ width: "30rem" }} minWidth={800}>
              <Label>Cantidad</Label>
            </TableColumn>
            <TableColumn>
              <Label>Precio</Label>
            </TableColumn>
            <TableColumn>
              <Label>SUBTOTAL</Label>
            </TableColumn>
          </>
        }
      >
        {state.products.map((product) => (
          <TableRow key={product.id}>
            <TableCell>
              <img src={product.img_url} width={50} alt="Product img" />
            </TableCell>
            <TableCell>
              <Text>{product.producto}</Text>
            </TableCell>
            <TableCell>
              <Label>{product.cantidad}</Label>
            </TableCell>
            <TableCell>
              <Label>{product.precio}</Label>
            </TableCell>
            <TableCell>
              <Label>{product.subtotal}</Label>
            </TableCell>
          </TableRow>
        ))}
        <TableRow style={{ color: "F0f0f0" }}>
          <TableCell></TableCell>
          <TableCell></TableCell>
          <TableCell></TableCell>
          <TableCell>
            <Label>TOTAL:</Label>
          </TableCell>
          <TableCell>
            <Label>{total}</Label>
          </TableCell>
        </TableRow>
      </Table>
    </FlexBoxContainer>
  );
}

export default CheckOut;
