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
import { useLocation } from "react-router-dom";
import { addValorCampo } from "../../api/requestGrupoSKU";
import FlexBoxContainer from "../Special/FlexBoxContainer";
import TitleBar from "../Special/TitleBar";

function AddValueSKU() {
  const { state } = useLocation();

  const confirm = useRef();
  const fail = useRef();

  async function addValueField() {
    const data = getData();
    state.state.state.camposku[state.state.index].values = [
      ...state.valores,
      data,
    ];
    state.valores = [...state.valores, data];

    if (data.id != "") {
      addValorCampo(state.state.state).then((data) => {
        confirm.current.show();
        clearData();
      });
    } else {
      fail.current.show();
    }
  }
  const getData = () => {
    const id = document.getElementById("id_valor").value;
    const valor = document.getElementById("valor").value;
    const estado_valor =
      document.getElementById("estado_valor").selectedOption.value;

    return {
      id,
      valor,
      estado_valor,
    };
  };
  function clearData() {
    document.getElementById("id_valor").value = "";
    document.getElementById("valor").value = "";
  }
  return (
    <FlexBoxContainer>
      <TitleBar url={-1} title={"Añadir Valor valor SKU"}></TitleBar>

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
        <FormGroup titleText="ID Valor">
          <FormItem>
            <Input id="id_valor" style={{ width: "100%" }} />
          </FormItem>
        </FormGroup>
        <FormGroup titleText="Valor">
          <FormItem>
            <Input id="valor" style={{ width: "100%" }} />
          </FormItem>
        </FormGroup>
        <FormGroup titleText="Estado">
          <FormItem>
            <Select id="estado_valor" style={{ width: "100%" }}>
              <Option value={""}>Seleccionar estado</Option>
              <Option value={"true"}>ACTIVO</Option>
              <Option value={"false"}>INACTIVO</Option>
            </Select>
          </FormItem>
        </FormGroup>
      </Form>
      <ui5-bar design="FloatingFooter">
        <ui5-button
          onClick={addValueField}
          design="Positive"
          slot="endContent"
          icon="bar-code"
        >
          Añadir Valor valor SKU
        </ui5-button>
      </ui5-bar>
      <Toast ref={confirm}>La categoría ha sido agregada con éxito</Toast>
      <Toast ref={fail}>Error al agregar categoría</Toast>
    </FlexBoxContainer>
  );
}

export default AddValueSKU;
