import {
  Form,
  FormGroup,
  FormItem,
  Input,
  Option,
  Select,
} from "@ui5/webcomponents-react";
import React from "react";
import FlexBoxContainer from "../Special/FlexBoxContainer";

function AddSKU() {
  return (
    <FlexBoxContainer>
      <Form
        titleText="Añadir Marca"
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
        <FormGroup titleText="ID SKU">
          <FormItem>
            <Input style={{ width: "100%" }} />
          </FormItem>
        </FormGroup>
        <FormGroup titleText="Nombre SKU">
          <FormItem>
            <Input style={{ width: "100%" }} />
          </FormItem>
        </FormGroup>
        <FormGroup titleText="Producto SKU">
          <FormItem>
            <Select style={{ width: "100%" }}>
              <Option key={false}>INACTIVO</Option>
            </Select>
          </FormItem>
        </FormGroup>
        <FormGroup titleText="Estado">
          <FormItem>
            <Select style={{ width: "100%" }}>
              <Option key={true}>ACTIVO</Option>
              <Option key={false}>INACTIVO</Option>
            </Select>
          </FormItem>
        </FormGroup>
      </Form>
      <ui5-bar design="FloatingFooter">
        <ui5-button
          onClick={() => console.log("Agregar")}
          design="Positive"
          slot="endContent"
          icon="bar-code"
        >
          Añadir SKU
        </ui5-button>
      </ui5-bar>
    </FlexBoxContainer>
  );
}

export default AddSKU;
