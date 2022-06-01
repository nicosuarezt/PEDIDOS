import {
  Button,
  FileUploader,
  Form,
  FormGroup,
  FormItem,
  Input,
  Option,
  RatingIndicator,
  Select,
  TextArea,
} from "@ui5/webcomponents-react";
import React, { useEffect, useState } from "react";
import { getBrands } from "../../api/request";
import { getCategories } from "../../api/requestCategory";
import { getGrupos } from "../../api/requestGrupoSKU";
import { addProduct } from "../../api/requestProduct";
import FlexBoxContainer from "../Special/FlexBoxContainer";
import TitleBar from "../Special/TitleBar";

function AddProduct() {
  const [marcas, setMarcas] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [grupos, setGrupos] = useState([]);
  const [especs, setEspecs] = useState({});

  useEffect(async () => {
    setCategorias(await getCategories());
    setMarcas(await getBrands());
  }, []);

  const filterGroups = (categoria) => {
    setGrupos([]);
    getGrupos().then((data) => {
      const idCategoria = categoria.detail.selectedOption.value;
      const filter = data.filter((grupo) => grupo.categoria == idCategoria);
      setGrupos(filter);
    });
  };

  const addProducto = () => {
    const producto = getData();
    addProduct(producto).then((e) => {
      console.log(e);
    });
  };
  const getData = () => {
    const fd = new FormData();
    const image = document.getElementById("file").files[0];
    fd.append("id", document.getElementById("id").value);
    fd.append("producto", document.getElementById("producto").value);
    fd.append("no_ref", document.getElementById("no_ref").value);
    fd.append("img", image, image.name);
    fd.append("marca", document.getElementById("marca").selectedOption.value);
    fd.append(
      "categoria",
      document.getElementById("categoria").selectedOption.value
    );
    fd.append("reputacion", document.getElementById("popularity").value);
    fd.append("desc_producto", document.getElementById("desc_producto").value);
    fd.append(
      "estado_producto",
      document.getElementById("estado_producto").selectedOption.value
    );
    fd.append("especificaiones", JSON.stringify(especs));

    return fd;
  };
  return (
    <FlexBoxContainer>
      <TitleBar url={-1} title={"Añadir Producto"}></TitleBar>
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
        <FormGroup titleText="ID Producto">
          <FormItem>
            <Input id="id" style={{ width: "100%" }} />
          </FormItem>
        </FormGroup>
        <FormGroup titleText="Nombre Producto">
          <FormItem>
            <Input id="producto" style={{ width: "100%" }} />
          </FormItem>
        </FormGroup>
        <FormGroup titleText="No. Referencia">
          <FormItem>
            <Input id="no_ref" style={{ width: "100%" }} />
          </FormItem>
        </FormGroup>
        <FormGroup titleText="Imagen Producto">
          <FormItem>
            <FileUploader id="file">
              <Button>Subir Imagen</Button>
            </FileUploader>
          </FormItem>
        </FormGroup>
        <FormGroup titleText="Marca">
          <FormItem>
            <Select id="marca" style={{ width: "100%" }}>
              <Option value="">Elegir marca</Option>
              {marcas.map((marca) => (
                <Option value={marca.id} key={marca.id}>
                  {marca.marca}
                </Option>
              ))}
            </Select>
          </FormItem>
        </FormGroup>
        <FormGroup titleText="Categoría">
          <FormItem>
            <Select
              id="categoria"
              style={{ width: "100%" }}
              onChange={filterGroups}
            >
              <Option value="">Elegir categoría</Option>
              {categorias.map((categoria) => (
                <Option value={categoria.id} key={categoria.id}>
                  {categoria.categoria}
                </Option>
              ))}
            </Select>
          </FormItem>
        </FormGroup>
        <FormGroup titleText="Puntuación">
          <FormItem>
            <RatingIndicator id="popularity" />
          </FormItem>
        </FormGroup>
        <FormGroup titleText="Estado">
          <FormItem>
            <Select id="estado_producto" style={{ width: "100%" }}>
              <Option value={"true"}>ACTIVO</Option>
              <Option value={"false"}>INACTIVO</Option>
            </Select>
          </FormItem>
        </FormGroup>
        <FormGroup></FormGroup>
      </Form>
      <Form
        columnsXL={1}
        columnsL={1}
        columnsM={1}
        columnsS={1}
        labelSpanS={12}
        labelSpanM={12}
        labelSpanL={12}
        labelSpanXL={12}
        style={{ rowGap: "3rem" }}
      >
        <FormGroup titleText="Desc. Producto">
          <FormItem>
            <TextArea rows={6} id="desc_producto" />
          </FormItem>
        </FormGroup>
      </Form>
      <Form titleText="Especificaciones">
        {grupos.map((grupo) =>
          grupo.camposku.map((camposku) => (
            <FormGroup key={grupo.id} titleText={camposku.campo}>
              {camposku.values.map((valorSKU) => (
                <>
                  {camposku.tipo == "text" ? (
                    <FormItem key={valorSKU.id} label="">
                      <Input
                        name={camposku.campo}
                        onChange={(e) => {
                          if (e.target.value != "") {
                            especs[camposku.campo] = e.target.value;
                            setEspecs(especs);
                          } else {
                            delete especs[camposku.campo];
                          }
                        }}
                      />
                    </FormItem>
                  ) : (
                    <FormItem key={valorSKU.id} label={valorSKU.valor}>
                      <input
                        type={camposku.tipo}
                        id={camposku.campo}
                        name={camposku.campo}
                        value={valorSKU.valor}
                        onChange={(e) => {
                          if (e.target.checked) {
                            especs[camposku.campo] = e.target.value;
                            setEspecs(especs);
                          } else {
                            delete especs[camposku.campo];
                          }
                        }}
                      />
                    </FormItem>
                  )}
                </>
              ))}
            </FormGroup>
          ))
        )}
      </Form>
      <ui5-bar design="FloatingFooter">
        <ui5-button
          onClick={addProducto}
          design="Positive"
          icon="add-product"
          slot="endContent"
        >
          Añadir Producto
        </ui5-button>
      </ui5-bar>
    </FlexBoxContainer>
  );
}

export default AddProduct;
