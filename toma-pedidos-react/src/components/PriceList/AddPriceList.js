import { Form, FormGroup, FormItem, Input, Toast } from "@ui5/webcomponents-react";
import React, { useRef } from "react";
import { addListPrice } from "../../api/requestPrice";
import FlexBoxContainer from "../Special/FlexBoxContainer";
import TitleBar from "../Special/TitleBar";

function AddPriceList() {
  const confirm = useRef();
  const fail = useRef();
  async function addList() {
    const data = getData();
    if (data.id != "") {
      addListPrice(data).then((data) => {
        confirm.current.show();
        clearData();
      });
    } else {
      fail.current.show();
    }
  }
  const getData = (e) => {
    let id = document.getElementById("id_lista").value;
    let lista = document.getElementById("lista").value;
    let precios=[]
    return {
      id,
      lista,
      precios
    };
  };
  const clearData = () => {
    document.getElementById("id_lista").value = "";
    document.getElementById("lista").value = "";
  };
  return (
    <FlexBoxContainer>
      <TitleBar url={-1} title={"Añadir Grupo SKU"}></TitleBar>
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
        <FormGroup titleText="ID Lista">
          <FormItem>
            <Input id="id_lista" style={{ width: "100%" }} />
          </FormItem>
        </FormGroup>
        <FormGroup titleText="Descripción">
          <FormItem>
            <Input id="lista" style={{ width: "100%" }} />
          </FormItem>
        </FormGroup>
      </Form>
      <ui5-bar design="FloatingFooter">
        <ui5-button
            onClick={() => addList()}
          design="Positive"
          slot="endContent"
          icon="money-bills"
        >
          Añadir Lista
        </ui5-button>
      </ui5-bar>
      <Toast ref={confirm}>La lista ha sido agregado con éxito</Toast>
      <Toast ref={fail}>Error al agregar lista</Toast>
    </FlexBoxContainer>
  );
}

export default AddPriceList;
