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
import { getClientes } from "../../api/requestClient";
import FlexBoxContainer from "../Special/FlexBoxContainer";
import TitleBar from "../Special/TitleBar";

function Clients() {
  const navigate = useNavigate();
  const [clientes, setClientes] = useState([]);
  const confirm = useRef();

  useEffect(async () => {
    setClientes(await getClientes());
  }, []);
  return (
    <FlexBoxContainer>
      <TitleBar title={"Listado de Clientes"} url={"/"}></TitleBar>
      <Table
        noDataText="No hay Clientes"
        style={{ marginTop: "20px" }}
        growing="Scroll"
        columns={
          <>
            <TableColumn style={{ width: "12rem" }}>
              <Label>ID Cliente</Label>
            </TableColumn>
            <TableColumn style={{ width: "12rem" }} minWidth={800}>
              <Label>Cliente</Label>
            </TableColumn>
            <TableColumn>
              <Label>Razón Social</Label>
            </TableColumn>
            <TableColumn>
              <Label>NIT</Label>
            </TableColumn>
          </>
        }
      >
        {clientes.map((cliente) => (
          <TableRow key={cliente.id}>
            <TableCell>
              <Text>{cliente.id}</Text>
            </TableCell>
            <TableCell>{cliente.cliente}</TableCell>
            <TableCell>
              <Text>{cliente.razonSocial}</Text>
            </TableCell>
            <TableCell>
              <Text>{cliente.nit}</Text>
            </TableCell>
          </TableRow>
        ))}
      </Table>
      <Toast ref={confirm}>El cliente ha sido eliminada con éxito</Toast>
    </FlexBoxContainer>
  );
}

export default Clients;
