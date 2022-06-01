import {
  Bar,
  Button,
  ButtonDesign,
  Label,
  ObjectStatus,
  Table,
  TableCell,
  TableColumn,
  TableRow,
  Text,
  Title,
  Toast,
} from "@ui5/webcomponents-react";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteBrands, getBrands } from "../../api/request";
import FlexBoxContainer from "../Special/FlexBoxContainer";
import TitleBar from "../Special/TitleBar";

function Brands() {
  const navigate = useNavigate();
  const [marcas, setMarcas] = useState([]);
  const confirm = useRef();

  useEffect(async () => {
    setMarcas(await getBrands());
  }, []);

  function editBrand(marca) {
    navigate("/edit-brand", { state: marca });
  }
  function deleteBrand(marca) {
    deleteBrands(marca).then(async (data) => {
      console.log(data);
      setMarcas(await getBrands());
      confirm.current.show();
    });
  }
  return (
    <FlexBoxContainer>
      <TitleBar title={"Listado de Marcas"} url={"/"}>
        <Button
          icon="add-activity"
          design={ButtonDesign.Transparent}
          onClick={() => navigate("/add-brand")}
        >
          Añadir Marca
        </Button>
      </TitleBar>
      <Table
        noDataText="No hay Marcas"
        style={{ marginTop: "20px" }}
        growing="Scroll"
        columns={
          <>
            <TableColumn style={{ width: "12rem" }}>
              <Label>ID Marca</Label>
            </TableColumn>
            <TableColumn style={{ width: "12rem" }} minWidth={800}>
              <Label>Marca</Label>
            </TableColumn>
            <TableColumn minWidth={800}  >
              <Label>Desc. Marca</Label>
            </TableColumn>
            <TableColumn minWidth={800}  >
              <Label>Proovedor</Label>
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
        {marcas.map((marca) => (
          <TableRow key={marca.id}>
            <TableCell>
              <Text>{marca.id}</Text>
            </TableCell>
            <TableCell>{marca.marca}</TableCell>
            <TableCell>
              <Label>{marca.desc_marca}</Label>
            </TableCell>
            <TableCell>
              <Label>{marca.supplier}</Label>
            </TableCell>
            <TableCell>
              <ObjectStatus
                state={marca.estado_marca == "true" ? "Success" : "Error"}
              >
                {marca.estado_marca == "true" ? "ACTIVO" : "INACTIVO"}
              </ObjectStatus>
            </TableCell>
            <TableCell>
              <Button design="Positive" onClick={() => editBrand(marca)}>
                Editar
              </Button>
            </TableCell>
            <TableCell>
              <Button design="Negative" onClick={() => deleteBrand(marca.id)}>
                Eliminar
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </Table>
      <Toast ref={confirm}>La marca ha sido eliminada con éxito</Toast>
    </FlexBoxContainer>
  );
}

export default Brands;
