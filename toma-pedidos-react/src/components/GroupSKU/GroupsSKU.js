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
} from "@ui5/webcomponents-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getGrupos } from "../../api/requestGrupoSKU";
import FlexBoxContainer from "../Special/FlexBoxContainer";
import TitleBar from "../Special/TitleBar";

function GroupsSKU() {
  const navigate = useNavigate();
  const [grupos, setGrupos] = useState([]);
  useEffect(async () => {
    setGrupos(await getGrupos());
    console.log(grupos);
  }, []);
  return (
    <FlexBoxContainer>
      <TitleBar title={"Listado de Grupos SKU"} url={"/"}>
        <Button
          icon="bar-code"
          design={ButtonDesign.Transparent}
          onClick={() => navigate("add-group-sku")}
        >
          Añadir Grupo SKU
        </Button>
      </TitleBar>
      <Table
        noDataText="No hay grupos"
        style={{ marginTop: "20px" }}
        growing="Scroll"
        columns={
          <>
            <TableColumn style={{ width: "12rem" }}>
              <Label>ID Grupo</Label>
            </TableColumn>
            <TableColumn style={{ width: "40rem" }} minWidth={800}>
              <Label>Grupo</Label>
            </TableColumn>
            <TableColumn>
              <Label>Eliminar</Label>
            </TableColumn>
            <TableColumn></TableColumn>
          </>
        }
      >
        {grupos.map((grupo) => (
          <TableRow key={grupo.id}>
            <TableCell>
              <Text>{grupo.id}</Text>
            </TableCell>
            <TableCell>{grupo.grupo}</TableCell>
            <TableCell>
              <Button
                design="Negative"
                // onClick={() => delete_category(grupo.id)}
              >
                Eliminar
              </Button>
            </TableCell>
            <TableCell>
              <Button onClick={() => navigate("field-sku", { state: grupo })}>
                Campos
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </Table>
      {/* <Toast ref={confirm}>La marca ha sido eliminada con éxito</Toast> */}
    </FlexBoxContainer>
  );
}

export default GroupsSKU;
