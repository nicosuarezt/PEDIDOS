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
import { addAlmacen } from "../../api/requestWarehouse";
import FlexBoxContainer from "../Special/FlexBoxContainer";
import TitleBar from "../Special/TitleBar";

function AddWarehouse() {
  const confirm = useRef();
  const fail = useRef();

  async function postWarehouse() {
    const data = getData();
    if (data.id != "") {
      addAlmacen(data).then((data) => {
        confirm.current.show();
        clearData();
      });
    } else {
      fail.current.show();
    }
  }
  function getData() {
    let id = document.getElementById("id_almacen").value;
    let almacen = document.getElementById("almacen").value;
    let desc_almacen = document.getElementById("desc_almacen").value;
    let estado_almacen =
      document.getElementById("estado_almacen").selectedOption.value;
    return {
      id,
      almacen,
      desc_almacen,
      estado_almacen,
    };
  }
  function clearData() {
    document.getElementById("id_almacen").value = "";
    document.getElementById("almacen").value = "";
    document.getElementById("desc_almacen").value = "";
  }
  return (
    <FlexBoxContainer>
      <TitleBar url={-1} title={"Añadir Almacén"}></TitleBar>
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
        <FormGroup titleText="ID Almacén">
          <FormItem>
            <Input id="id_almacen" style={{ width: "100%" }} />
          </FormItem>
        </FormGroup>
        <FormGroup titleText="Nombre Almacén">
          <FormItem>
            <Input id="almacen" style={{ width: "100%" }} />
          </FormItem>
        </FormGroup>
        <FormGroup titleText="Desc. Almacén">
          <FormItem>
            <Input id="desc_almacen" style={{ width: "100%" }} />
          </FormItem>
        </FormGroup>
        <FormGroup titleText="Estado">
          <FormItem>
            <Select id="estado_almacen" style={{ width: "100%" }}>
              <Option value="true">ACTIVO</Option>
              <Option value="false">INACTIVO</Option>
            </Select>
          </FormItem>
        </FormGroup>
      </Form>
      <ui5-bar design="FloatingFooter">
        <ui5-button
          onClick={() => postWarehouse()}
          design="Positive"
          slot="endContent"
          icon="factory"
        >
          Añadir Almacén
        </ui5-button>
      </ui5-bar>
      <Toast ref={confirm}>El almacén ha sido agregada con éxito</Toast>
      <Toast ref={fail}>Error al agregar almacén</Toast>
    </FlexBoxContainer>
  );
}

export default AddWarehouse;
