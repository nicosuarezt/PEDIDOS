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
import { useLocation } from "react-router-dom";
import { addPrice, getListsPrice } from "../../api/requestPrice";
import { getProductos } from "../../api/requestProduct";
import FlexBoxContainer from "../Special/FlexBoxContainer";
import TitleBar from "../Special/TitleBar";

function AddPrice() {
  const [productos, setProductos] = useState([]);
  const [listas, setListas] = useState([]);

  const confirm = useRef();
  const fail = useRef();

  useEffect(async () => {
    setProductos(await getProductos());
    setListas(await getListsPrice());
  }, []);

  async function postPrecio() {
    const data = getData();
    if (data.id != "") {
      addPrice(data).then((data) => {
        confirm.current.show();
        clearData();
      });
    } else {
      fail.current.show();
    }
  }
  const getData = () => {
    const id_sku = document.getElementById("id_sku").selectedOption.value;
    const id_lista = document.getElementById("id_lista").selectedOption.value;
    const precio = document.getElementById("precio").value;

    return {
      id_sku,
      id_lista,
      precio,
    };
  };
  function clearData() {
    document.getElementById("precio").value = "";
  }

  return (
    <FlexBoxContainer>
      <TitleBar url={-1} title={"Añadir Precio "}></TitleBar>
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
        <FormGroup titleText="ID SKU">
          <FormItem>
            <Select id="id_sku" style={{ width: "100%" }}>
              <Option value="">Elegir el SKU</Option>
              {productos.map((producto) => (
                <Option key={producto.id} value={producto.id}>
                  {producto.id}-{producto.producto}
                </Option>
              ))}
            </Select>
          </FormItem>
        </FormGroup>
        <FormGroup titleText="Lista de precios">
          <FormItem>
            <Select id="id_lista" style={{ width: "100%" }}>
              <Option value="">Elegir lista</Option>
              {listas.map((lista) => (
                <Option key={lista.id} value={lista.id}>
                  {lista.id}-{lista.lista}
                </Option>
              ))}
            </Select>
          </FormItem>
        </FormGroup>

        <FormGroup titleText="Precio">
          <FormItem>
            <Input id="precio" style={{ width: "100%" }} />
          </FormItem>
        </FormGroup>
      </Form>
      <ui5-bar design="FloatingFooter">
        <ui5-button
          onClick={() => postPrecio()}
          design="Positive"
          slot="endContent"
          icon="money-bills"
        >
          Añadir precio
        </ui5-button>
      </ui5-bar>
      <Toast ref={confirm}>El precio ha sido agregado con éxito</Toast>
      <Toast ref={fail}>Error al agregar precio</Toast>
    </FlexBoxContainer>
  );
}

export default AddPrice;
