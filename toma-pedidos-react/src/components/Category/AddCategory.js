import {
  Form,
  FormGroup,
  FormItem,
  Input,
  Option,
  Select,
  Toast,
} from "@ui5/webcomponents-react";
import React, { useRef } from "react";
import { addCategory } from "../../api/requestCategory";
import FlexBoxContainer from "../Special/FlexBoxContainer";
import TitleBar from "../Special/TitleBar";

function AddCategory() {
  const confirm = useRef();
  const fail = useRef();
  async function postCategorie() {
    const data = getData();
    if (data.id != "") {
      addCategory(data).then((data) => {
        confirm.current.show();
        clearData();
      });
    } else {
      fail.current.show();
    }
  }
  const getData = (e) => {
    let id = document.getElementById("id_categoria").value;
    let categoria = document.getElementById("categoria").value;
    let estado_categoria =
      document.getElementById("estado_categoria").selectedOption.value;
    return {
      id,
      categoria,
      estado_categoria,
    };
  };
  const clearData = () => {
    document.getElementById("id_categoria").value = "";
    document.getElementById("categoria").value = "";
  };
  return (
    <FlexBoxContainer>
      <TitleBar url={-1} title={"Añadir Categoría"}></TitleBar>

      <Form
        columnsXL={3}
        columnsL={3}
        columnsM={3}
        columnsS={1}
        labelSpanS={12}
        labelSpanM={12}
        labelSpanL={12}
        labelSpanXL={12}
        style={{ rowGap: "3rem", marginBottom: "2.5rem" }}
      >
        <FormGroup titleText="ID Categoría">
          <FormItem>
            <Input id="id_categoria" style={{ width: "100%" }} />
          </FormItem>
        </FormGroup>
        <FormGroup titleText="Nombre Categoría">
          <FormItem>
            <Input id="categoria" style={{ width: "100%" }} />
          </FormItem>
        </FormGroup>
        <FormGroup titleText="Estado">
          <FormItem>
            <Select id="estado_categoria" style={{ width: "100%" }}>
              <Option value={"true"}>ACTIVO</Option>
              <Option value={"false"}>INACTIVO</Option>
            </Select>
          </FormItem>
        </FormGroup>
      </Form>
      <ui5-bar design="FloatingFooter">
        <ui5-button
          onClick={postCategorie}
          design="Positive"
          slot="endContent"
          icon="group"
        >
          Añadir Categoría
        </ui5-button>
      </ui5-bar>
      <Toast ref={confirm}>La categoría ha sido agregada con éxito</Toast>
      <Toast ref={fail}>Error al agregar categoría</Toast>
    </FlexBoxContainer>
  );
}

export default AddCategory;
