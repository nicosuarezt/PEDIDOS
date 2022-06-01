import {
  Button,
  ButtonDesign,
  Label,
  ObjectStatus,
  RatingIndicator,
  Table,
  TableCell,
  TableColumn,
  TableRow,
  Text,
} from "@ui5/webcomponents-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getProductos } from "../../api/requestProduct";
import FlexBoxContainer from "../Special/FlexBoxContainer";
import TitleBar from "../Special/TitleBar";

function Products() {
  const navigate = useNavigate();
  const [productos, setProductos] = useState([]);
  useEffect(async () => {
    setProductos(await getProductos());
  }, []);

  return (
    <FlexBoxContainer>
      <TitleBar title={"Listado de Productos"} url={"/"}>
        <Button
          icon="add-product"
          design={ButtonDesign.Transparent}
          onClick={() => navigate("/add-product")}
        >
          Añadir Producto
        </Button>
      </TitleBar>
      <Table
        noDataText="No hay Productos"
        style={{ marginTop: "20px" }}
        growing="Scroll"
        columns={
          <>
            <TableColumn style={{ width: "14rem" }}>
              <Label>Imagen</Label>
            </TableColumn>
            <TableColumn style={{ width: "12rem" }}>
              <Label>ID Producto</Label>
            </TableColumn>
            <TableColumn style={{ width: "12rem" }} minWidth={800}>
              <Label>Producto</Label>
            </TableColumn>
            <TableColumn>
              <Label>Puntuación</Label>
            </TableColumn>
            <TableColumn>
              <Label>Estado</Label>
            </TableColumn>
            {/* <TableColumn>
              <Label>Detalle</Label>
            </TableColumn> */}
            <TableColumn>
              <Label>Eliminar</Label>
            </TableColumn>
          </>
        }
      >
        {productos.map((producto) => (
          <TableRow key={producto.id}>
            <TableCell>
              <img src={producto.img_url} width={120}/>
            </TableCell>
            <TableCell>
              <Text>{producto.id}</Text>
            </TableCell>
            <TableCell>
              <Text>{producto.producto}</Text>
            </TableCell>
            <TableCell>
              <RatingIndicator
                value={producto.reputacion}
                style={{ opacity: "1" }}
                disabled
              />
            </TableCell>
            <TableCell>
              <ObjectStatus
                state={producto.estado_producto == "true" ? "Success" : "Error"}
              >
                {producto.estado_producto == "true" ? "ACTIVO" : "INACTIVO"}
              </ObjectStatus>
            </TableCell>
            {/* <TableCell>
              <Button
                design="Positive"
                //   onClick={() => editCategory(producto)}
              >
                Ver Detalle
              </Button>
            </TableCell> */}
            <TableCell>
              <Button
                design="Negative"
                // onClick={() => delete_category(producto.id)}
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

export default Products;
