import {
  Button,
  Label,
  ObjectStatus,
  RatingIndicator,
  Table,
  TableCell,
  TableColumn,
  TableRow,
  Text,
} from "@ui5/webcomponents-react";
import React from "react";
import { useNavigate } from "react-router-dom";

function ProductTable({ products, load, clienteOrden }) {
  console.log(products);
  console.log(clienteOrden); 
  const navigate = useNavigate();

  return (
    <>
      <Table
        busy={load}
        noDataText="No se han elegido productos"
        style={{ marginTop: "20px" }}
        growing="Scroll"
        columns={
          <>
            <TableColumn style={{ width: "12rem" }}>
              <Label>No. Ref</Label>
            </TableColumn>
            <TableColumn style={{ width: "12rem" }}>
              <Label>Producto</Label>
            </TableColumn>
            <TableColumn style={{ width: "12rem" }} minWidth={800}>
              <Label>Imagen</Label>
            </TableColumn>
            <TableColumn minWidth={800} popinText="Categoría" demandPopin>
              <Label>Categoría</Label>
            </TableColumn>
            <TableColumn minWidth={800} popinText="Marca" demandPopin>
              <Label>Marca</Label>
            </TableColumn>
            <TableColumn>
              <Label>Disponibilidad</Label>
            </TableColumn>
            <TableColumn>
              <Label>Precio</Label>
            </TableColumn>
            <TableColumn>
              <Label>Detalle</Label>
            </TableColumn>
          </>
        }
      >
        {products.map((product) => (
          <TableRow key={product.id}>
            <TableCell>
              <Text>{product.no_ref}</Text>
            </TableCell>
            <TableCell>
              <Text>{product.producto}</Text>
            </TableCell>
            <TableCell>
              <img src={product.img_url} width={100} alt="Product img" />
            </TableCell>
            <TableCell>
              <Label>{product.categoria}</Label>
            </TableCell>
            <TableCell>
              <Label>{product.marca}</Label>
            </TableCell>
            <TableCell>
              <ObjectStatus state={"Success"}>IN STOCK</ObjectStatus>
            </TableCell>
            <TableCell>
              <Label>{product.precio}</Label>
            </TableCell>
            <TableCell>
              <Button>Detalle</Button>
            </TableCell>
          </TableRow>
        ))}
      </Table>
      {products.length == 0 ? (
        <></>
      ) : (
        <ui5-bar design="FloatingFooter">
          <ui5-button
            onClick={() => navigate("checkout", { state: {products,clienteOrden} })}
            design="Positive"
            slot="endContent"
            icon="money-bills"
          >
            Ir a CheckOut
          </ui5-button>
        </ui5-bar>
      )}
    </>
  );
}

export default ProductTable;
