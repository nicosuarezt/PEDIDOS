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
import { deleteCateogory, getCategories } from "../../api/requestCategory";
import FlexBoxContainer from "../Special/FlexBoxContainer";
import TitleBar from "../Special/TitleBar";

function Categories() {
  const navigate = useNavigate();
  const [categorias, setCategorias] = useState([]);
  const confirm = useRef();

  useEffect(async () => {
    setCategorias(await getCategories());
  }, []);
  const editCategory = (categoria) => {
    navigate("/edit-category", { state: categoria });
  };
  function delete_category(categoria) {
    deleteCateogory(categoria).then(async (data) => {
      console.log(data);
      setCategorias(await getCategories());
      confirm.current.show();
    });
  }
  return (
    <FlexBoxContainer>
      <TitleBar title={"Listado de Categorías"} url={"/"}>
        <Button
          icon="group"
          design={ButtonDesign.Transparent}
          onClick={() => navigate("/add-category")}
        >
          Añadir Categoría
        </Button>
      </TitleBar>
      <Table
        noDataText="No hay Categorías"
        style={{ marginTop: "20px" }}
        growing="Scroll"
        columns={
          <>
            <TableColumn style={{ width: "12rem" }}>
              <Label>ID Categoría</Label>
            </TableColumn>
            <TableColumn style={{ width: "12rem" }} minWidth={800}>
              <Label>Categoría</Label>
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
        {categorias.map((categoria) => (
          <TableRow key={categoria.id}>
            <TableCell>
              <Text>{categoria.id}</Text>
            </TableCell>
            <TableCell>{categoria.categoria}</TableCell>
            <TableCell>
              <ObjectStatus
                state={
                  categoria.estado_categoria == "true" ? "Success" : "Error"
                }
              >
                {categoria.estado_categoria == "true" ? "ACTIVO" : "INACTIVO"}
              </ObjectStatus>
            </TableCell>
            <TableCell>
              <Button design="Positive" onClick={() => editCategory(categoria)}>
                Editar
              </Button>
            </TableCell>
            <TableCell>
              <Button
                design="Negative"
                onClick={() => delete_category(categoria.id)}
              >
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

export default Categories;
