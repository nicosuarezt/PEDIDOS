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
import { editAlmacen } from "../../api/requestWarehouse";
import FlexBoxContainer from "../Special/FlexBoxContainer";
import TitleBar from "../Special/TitleBar";

function EditWarehouse() {
  const confirm = useRef();
  const { state } = useLocation();

  function putWarehouse() {
    const data = getData();
    editAlmacen(data).then(({ status }) => {
      if (status == 200) {
        confirm.current.show();
      } else {
      }
    });
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
  return (
    <FlexBoxContainer>
      <TitleBar url={-1} title={"Actualizar Almacén"}></TitleBar>
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
            <Input disabled id="id_almacen" value={state?.id} style={{ width: "100%" }} />
          </FormItem>
        </FormGroup>
        <FormGroup titleText="Nombre Almacén">
          <FormItem>
            <Input id="almacen" value={state?.almacen} style={{ width: "100%" }} />
          </FormItem>
        </FormGroup>
        <FormGroup titleText="Desc. Almacén">
          <FormItem>
            <Input id="desc_almacen" value={state?.desc_almacen} style={{ width: "100%" }} />
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
          onClick={() => putWarehouse()}
          design="Positive"
          slot="endContent"
          icon="factory"
        >
          Actualizar Almacén
        </ui5-button>
      </ui5-bar>
      <Toast ref={confirm}>El almacén ha sido actualizado con éxito</Toast>
    </FlexBoxContainer>
  );
}

export default EditWarehouse;
