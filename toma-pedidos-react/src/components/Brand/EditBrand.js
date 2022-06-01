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
import { useLocation, useNavigate } from "react-router-dom";
import { editBrands } from "../../api/request";
import FlexBoxContainer from "../Special/FlexBoxContainer";

function EditBrand() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const confirm = useRef();

  function putBrand() {
    const data = getData();
    editBrands(data).then(({ status }) => {
      if (status == 200) {
        confirm.current.show();
      } else {
      }
    });
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
  return (
    <FlexBoxContainer>
      <Bar
        startContent={
          <>
            <Button
              icon="nav-back"
              design={ButtonDesign.Transparent}
              onClick={() => navigate(-1)}
            />

            <Title level="H4">Editar Marca</Title>
          </>
        }
      ></Bar>
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
            <Input
              id="idMarca"
              disabled
              value={state?.id}
              style={{ width: "100%" }}
            />
          </FormItem>
        </FormGroup>
        <FormGroup titleText="Nombre Marca">
          <FormItem>
            <Input id="marca" value={state?.marca} style={{ width: "100%" }} />
          </FormItem>
        </FormGroup>
        <FormGroup titleText="Descripción">
          <FormItem>
            <Input
              id="desc_marca"
              value={state?.desc_marca}
              style={{ width: "100%" }}
            />
          </FormItem>
        </FormGroup>
        <FormGroup titleText="Proovedor">
          <FormItem>
            <Input
              id="supplier"
              value={state?.supplier}
              style={{ width: "100%" }}
            />
          </FormItem>
        </FormGroup>
        <FormGroup titleText="Estado">
          <FormItem>
            <Select
              id="estado_marca"
              style={{ width: "100%" }}
              selectedOption="false"
            >
              <Option value="true">ACTIVO</Option>
              <Option value="false">INACTIVO</Option>
            </Select>
          </FormItem>
        </FormGroup>
      </Form>
      <ui5-bar design="FloatingFooter">
        <ui5-button
          design="Positive"
          slot="endContent"
          icon="add-activity"
          onClick={putBrand}
        >
          Editar Marca
        </ui5-button>
      </ui5-bar>
      <Toast ref={confirm}>La marca ha sido actualizada con éxito</Toast>
    </FlexBoxContainer>
  );
}

export default EditBrand;
