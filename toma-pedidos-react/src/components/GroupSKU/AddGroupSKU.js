import {
  Form,
  FormGroup,
  FormItem,
  Input,
  Option,
  Select,
  Toast,
} from "@ui5/webcomponents-react";
import React, { useEffect, useRef, useState } from "react";
import { getCategories } from "../../api/requestCategory";
import { addGrupo } from "../../api/requestGrupoSKU";
import FlexBoxContainer from "../Special/FlexBoxContainer";
import TitleBar from "../Special/TitleBar";

function AddGroupSKU() {
  const [categorias, setCategorias] = useState([]);
  const confirm = useRef();
  const fail = useRef();

  useEffect(async () => {
    setCategorias(await getCategories());
  }, []);

  async function addGrupoSKU() {
    const data = getData();
    if (data.id != "") {
      addGrupo(data).then((data) => {
        confirm.current.show();
        clearData();
      });
    } else {
      fail.current.show();
    }
  }

  const getData = () => {
    const id = document.getElementById("id_grupo").value;
    const grupo = document.getElementById("grupo").value;
    const categoria = document.getElementById("categoria").selectedOption.value;
    const camposku = []

    return {
      id,
      grupo,
      categoria,
      camposku
    };
  };
  function clearData() {
    document.getElementById("id_grupo").value = "";
    document.getElementById("grupo").value = "";
  }
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
        <FormGroup titleText="ID Grupo SKU">
          <FormItem>
            <Input id="id_grupo" style={{ width: "100%" }} />
          </FormItem>
        </FormGroup>
        <FormGroup titleText="Nombre Grupo">
          <FormItem>
            <Input id="grupo" style={{ width: "100%" }} />
          </FormItem>
        </FormGroup>
        <FormGroup titleText="Categoría">
          <FormItem>
            <Select id="categoria" style={{ width: "100%" }}>
              <Option value="">Elegir Categoría</Option>
              {categorias.map((categoria) => (
                <Option key={categoria.id} value={categoria.id}>{categoria.categoria}</Option>
              ))}
            </Select>
          </FormItem>
        </FormGroup>
      </Form>
      <ui5-bar design="FloatingFooter">
        <ui5-button
          onClick={() => addGrupoSKU()}
          design="Positive"
          slot="endContent"
          icon="bar-code"
        >
          Añadir Grupo
        </ui5-button>
      </ui5-bar>
      <Toast ref={confirm}>El grupo ha sido agregado con éxito</Toast>
      <Toast ref={fail}>Error al agregar grupo</Toast>
    </FlexBoxContainer>
  );
}

export default AddGroupSKU;
