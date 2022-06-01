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
import { useLocation, useNavigate } from "react-router-dom";
import { getValores } from "../../api/requestGrupoSKU";
import FlexBoxContainer from "../Special/FlexBoxContainer";
import TitleBar from "../Special/TitleBar";

function ValueSKU() {
  const navigate = useNavigate();
  const { state } = useLocation();

  const [valores, setValores] = useState([]);
  useEffect(async () => {
    setValores(await getValores(state.state.id, state.index));
  }, []);
  return (
    <FlexBoxContainer>
      <TitleBar title={"Listado de Valores de valor SKU"} url={-1}>
        <Button
          icon="bar-code"
          design={ButtonDesign.Transparent}
          onClick={() =>
            navigate("add-field-value", { state: { state, valores } })
          }
        >
          Añadir Valor de valor SKU
        </Button>
      </TitleBar>
      <Table
        noDataText="No hay valores"
        style={{ marginTop: "20px" }}
        growing="Scroll"
        columns={
          <>
            <TableColumn style={{ width: "12rem" }}>
              <Label>ID valor</Label>
            </TableColumn>
            <TableColumn style={{ width: "22rem" }} minWidth={800}>
              <Label>valor</Label>
            </TableColumn>
            <TableColumn>
              <Label>Estado</Label>
            </TableColumn>
            <TableColumn>
              <Label>Eliminar</Label>
            </TableColumn>
          </>
        }
      >
        {valores.map((valor) => (
          <TableRow key={valor.id}>
            <TableCell>
              <Text>{valor.id}</Text>
            </TableCell>
            <TableCell>{valor.valor}</TableCell>
            <TableCell>
              <ObjectStatus
                state={valor.estado_valor == "true" ? "Success" : "Error"}
              >
                {valor.estado_valor == "true" ? "ACTIVO" : "INACTIVO"}
              </ObjectStatus>
            </TableCell>
            <TableCell>
              <Button
                design="Negative"
                // onClick={() => delete_category(valor.id)}
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

export default ValueSKU;
