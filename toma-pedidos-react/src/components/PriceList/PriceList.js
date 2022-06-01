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
import { useNavigate } from "react-router-dom";
import { getListsPrice } from "../../api/requestPrice";
import FlexBoxContainer from "../Special/FlexBoxContainer";
import TitleBar from "../Special/TitleBar";

function PriceList() {
  const navigate = useNavigate();
  const [listas, setListas] = useState([]);

  useEffect(async () => {
    setListas(await getListsPrice());
  }, []);

  return (
    <FlexBoxContainer>
      <TitleBar title={"Listado precios"} url={"/"}>
        <Button
          icon="money-bills"
          design={ButtonDesign.Transparent}
          onClick={() => navigate("/add-price-list")}
        >
          Añadir Lista de precios
        </Button>
        <Button
          design={ButtonDesign.Transparent}
          onClick={() => navigate("price")}
        >
          Precios
        </Button>
      </TitleBar>
      <Table
        noDataText="No hay listas"
        style={{ marginTop: "20px" }}
        growing="Scroll"
        columns={
          <>
            <TableColumn style={{ width: "12rem" }}>
              <Label>ID Lista</Label>
            </TableColumn>
            <TableColumn style={{ width: "40rem" }} minWidth={800}>
              <Label>Descripción</Label>
            </TableColumn>
            <TableColumn>
              <Label>Eliminar</Label>
            </TableColumn>
          </>
        }
      >
        {listas.map((lista) => (
          <TableRow key={lista.id}>
            <TableCell>
              <Text>{lista.id}</Text>
            </TableCell>
            <TableCell>{lista.lista}</TableCell>
            <TableCell>
              <Button
                design="Negative"
                // onClick={() => delete_category(lista.id)}
              >
                Eliminar
              </Button>
            </TableCell>
            <TableCell></TableCell>
          </TableRow>
        ))}
      </Table>
      {/* <Toast ref={confirm}>La marca ha sido eliminada con éxito</Toast> */}
    </FlexBoxContainer>
  );
}

export default PriceList;
