import {
  Bar,
  Button,
  ButtonDesign,
  Form,
  FormGroup,
  FormItem,
  Input,
  Option,
  Select,
  Title,
  Toast,
} from "@ui5/webcomponents-react";
import React, { useRef } from "react";
import { addBrands } from "../../api/request";
import FlexBoxContainer from "../Special/FlexBoxContainer";
import TitleBar from "../Special/TitleBar";

function AddBrand() {
  const confirm = useRef();
  const fail = useRef();

  async function postBrand() {
    const data = getData();
    if (data.id != "") {
      addBrands(data).then((data) => {
        confirm.current.show();
        clearData();
      });
    } else {
      fail.current.show();
    }
  }
  function getData(e) {
    let id = document.getElementById("idMarca").value;
    let marca = document.getElementById("marca").value;
    let desc_marca = document.getElementById("desc_marca").value;
    let supplier = document.getElementById("supplier").value;
    let estado_marca =
      document.getElementById("estado_marca").selectedOption.value;
    return {
      id,
      marca,
      desc_marca,
      supplier,
      estado_marca,
    };
  }
  function clearData() {
    document.getElementById("idMarca").value = "";
    document.getElementById("marca").value = "";
    document.getElementById("desc_marca").value = "";
    document.getElementById("supplier").value = "";

    document.getElementById("estado_marca").selectedOption.value = "";
  }
  return (
    <FlexBoxContainer>
      <TitleBar url={-1} title={"Añadir Marca"}></TitleBar>
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
        <FormGroup titleText="ID Marca">
          <FormItem>
            <Input id="idMarca" style={{ width: "100%" }} />
          </FormItem>
        </FormGroup>
        <FormGroup titleText="Nombre Marca">
          <FormItem>
            <Input id="marca" style={{ width: "100%" }} />
          </FormItem>
        </FormGroup>
        <FormGroup titleText="Descripción">
          <FormItem>
            <Input id="desc_marca" style={{ width: "100%" }} />
          </FormItem>
        </FormGroup>
        <FormGroup titleText="Proovedor">
          <FormItem>
            <Input id="supplier" style={{ width: "100%" }} />
          </FormItem>
        </FormGroup>
        <FormGroup titleText="Estado">
          <FormItem>
            <Select
              id="estado_marca"
              onChange={getData}
              style={{ width: "100%" }}
            >
              <Option value={"true"}>ACTIVO</Option>
              <Option value={"false"}>INACTIVO</Option>
            </Select>
          </FormItem>
        </FormGroup>
      </Form>
      <ui5-bar design="FloatingFooter">
        <ui5-button
          onClick={postBrand}
          design="Positive"
          slot="endContent"
          icon="add-activity"
        >
          Añadir Marca
        </ui5-button>
      </ui5-bar>
      <Toast ref={confirm}>La marca ha sido agregada con éxito</Toast>
      <Toast ref={fail}>Error al agregar marca</Toast>
    </FlexBoxContainer>
  );
}

export default AddBrand;
