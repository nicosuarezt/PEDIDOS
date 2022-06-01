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
import { getCampos } from "../../api/requestGrupoSKU";
import FlexBoxContainer from "../Special/FlexBoxContainer";
import TitleBar from "../Special/TitleBar";

function Fields() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [campos, setCampos] = useState([]);
  useEffect(async () => {
    setCampos(await getCampos(state.id));
  }, []);
  return (
    <FlexBoxContainer>
      <TitleBar title={"Listado de Campos SKU"} url={-1}>
        <Button
          icon="bar-code"
          design={ButtonDesign.Transparent}
          onClick={() =>
            navigate("add-field-sku", { state: { state, campos } })
          }
        >
          Añadir Campo SKU
        </Button>
      </TitleBar>
      <Table
        noDataText="No hay campos"
        style={{ marginTop: "20px" }}
        growing="Scroll"
        columns={
          <>
            <TableColumn style={{ width: "12rem" }}>
              <Label>ID Campo</Label>
            </TableColumn>
            <TableColumn style={{ width: "40rem" }} minWidth={800}>
              <Label>Campo</Label>
            </TableColumn>
            <TableColumn>
              <Label>Tipo</Label>
            </TableColumn>
            <TableColumn>
              <Label>Eliminar</Label>
            </TableColumn>
            <TableColumn></TableColumn>
          </>
        }
      >
        {campos.map((campo, index) => (
          <TableRow key={campo.id}>
            <TableCell>
              <Text>{campo.id}</Text>
            </TableCell>
            <TableCell>{campo.campo}</TableCell>
            <TableCell>{campo.tipo}</TableCell>
            <TableCell>
              <Button
                design="Negative"
                // onClick={() => delete_category(campo.id)}
              >
                Eliminar
              </Button>
            </TableCell>
            <TableCell>
              {campo.tipo == "text" ? (
                <></>
              ) : (
                <Button
                  onClick={() =>
                    navigate("./field-value", {
                      state: { campo, index, state },
                    })
                  }
                >
                  Valores
                </Button>
              )}
            </TableCell>
          </TableRow>
        ))}
      </Table>
      {/* <Toast ref={confirm}>La marca ha sido eliminada con éxito</Toast> */}
    </FlexBoxContainer>
  );
}

export default Fields;
