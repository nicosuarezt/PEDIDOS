import {
  Button,
  ButtonDesign,
  Label,
  ObjectStatus,
  Table,
  TableCell,
  TableColumn,
  TableRow,
  Text,
  Toast,
} from "@ui5/webcomponents-react";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteAlmacen, getAlmacenes } from "../../api/requestWarehouse";
import FlexBoxContainer from "../Special/FlexBoxContainer";
import TitleBar from "../Special/TitleBar";

function Warehouses() {
  const navigate = useNavigate();
  const [almacenes, setAlmacenes] = useState([]);
  const confirm = useRef();

  useEffect(async () => {
    setAlmacenes(await getAlmacenes());
  }, []);

  function editWarehouse(almacen) {
    navigate("/edit-warehouse", { state: almacen });
  }
  function delete_warehouse(categoria) {
    deleteAlmacen(categoria).then(async (data) => {
      console.log(data);
      setAlmacenes(await getAlmacenes());
      confirm.current.show();
    });
  }
  return (
    <FlexBoxContainer>
      <TitleBar title={"Listado de Almacenes"} url={"/"}>
        <Button
          icon="factory"
          design={ButtonDesign.Transparent}
          onClick={() => navigate("/add-warehouse")}
        >
          Añadir Almacen
        </Button>
      </TitleBar>
      <Table
        noDataText="No hay Almacenes"
        style={{ marginTop: "20px" }}
        growing="Scroll"
        columns={
          <>
            <TableColumn style={{ width: "12rem" }}>
              <Label>ID Almacen</Label>
            </TableColumn>
            <TableColumn style={{ width: "12rem" }} minWidth={800}>
              <Label>Almacen</Label>
            </TableColumn>
            <TableColumn>
              <Label>Desc. Almacen</Label>
            </TableColumn>
            <TableColumn>
              <Label>Estado</Label>
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
        {almacenes.map((almacen) => (
          <TableRow key={almacen.id}>
            <TableCell>
              <Text>{almacen.id}</Text>
            </TableCell>
            <TableCell>{almacen.almacen}</TableCell>
            <TableCell>{almacen.desc_almacen}</TableCell>
            <TableCell>
              <ObjectStatus
                state={almacen.estado_almacen == "true" ? "Success" : "Error"}
              >
                {almacen.estado_almacen == "true" ? "ACTIVO" : "INACTIVO"}
              </ObjectStatus>
            </TableCell>
            <TableCell>
              <Button design="Positive" onClick={() => editWarehouse(almacen)}>
                Editar
              </Button>
            </TableCell>
            <TableCell>
              <Button
                design="Negative"
                onClick={() => delete_warehouse(almacen.id)}
              >
                Eliminar
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </Table>
      <Toast ref={confirm}>El almacén ha sido eliminada con éxito</Toast>
    </FlexBoxContainer>
  );
}

export default Warehouses;
