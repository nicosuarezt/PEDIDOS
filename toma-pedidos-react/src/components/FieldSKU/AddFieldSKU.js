import {
  Form,
  FormGroup,
  FormItem,
  Input,
  Option,
  Select,
  Toast,
} from "@ui5/webcomponents-react";
import React, { useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { addCampo } from "../../api/requestGrupoSKU";
import FlexBoxContainer from "../Special/FlexBoxContainer";
import TitleBar from "../Special/TitleBar";

function AddFieldSKU() {
  const { state } = useLocation();
  const confirm = useRef();
  const fail = useRef();

  async function addCampoSKU() {
    const data = getData();
    state.state.camposku = [...state.campos, data];
    state.campos = [...state.campos, data];
    console.log(state);
    if (data.id != "") {
      addCampo(state.state)
      .then((data) => {
        confirm.current.show();
        clearData();
      });
    } else {
      fail.current.show();
    }
  }
  const getData = () => {
    const id = document.getElementById("id_campo").value;
    const campo = document.getElementById("campo").value;
    const tipo = document.getElementById("tipo").selectedOption.value;
    let values;
    if (tipo == "text") {
      values = [{ valor: "text" }];
    } else {
      values = [];
    }

    return {
      id,
      campo,
      tipo,
      values,
    };
  };
  function clearData() {
    document.getElementById("id_campo").value = "";
    document.getElementById("campo").value = "";
  }
  return (
    <FlexBoxContainer>
      <TitleBar url={-1} title={"Añadir Campo SKU"}></TitleBar>
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
        <FormGroup titleText="ID Campo SKU">
          <FormItem>
            <Input id="id_campo" style={{ width: "100%" }} />
          </FormItem>
        </FormGroup>
        <FormGroup titleText="Nombre Campo">
          <FormItem>
            <Input id="campo" style={{ width: "100%" }} />
          </FormItem>
        </FormGroup>
        <FormGroup titleText="Tipo">
          <FormItem>
            <Select id="tipo" style={{ width: "100%" }}>
              <Option value="">Elegir el tipo</Option>
              <Option value="text">Texto</Option>
              <Option value="checkbox">Checkbox</Option>
            </Select>
          </FormItem>
        </FormGroup>
      </Form>
      <ui5-bar design="FloatingFooter">
        <ui5-button
          onClick={() => addCampoSKU()}
          design="Positive"
          slot="endContent"
          icon="bar-code"
        >
          Añadir campo
        </ui5-button>
      </ui5-bar>
      <Toast ref={confirm}>El campo ha sido agregado con éxito</Toast>
      <Toast ref={fail}>Error al agregar campo</Toast>
    </FlexBoxContainer>
  );
}

export default AddFieldSKU;
