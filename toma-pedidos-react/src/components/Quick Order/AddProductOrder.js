import {
  Input,
  Label,
  TextArea,
  Grid,
  Title,
  Button,
  Icon,
  FileUploader,
} from "@ui5/webcomponents-react";
import { RadialChart } from "@ui5/webcomponents-react-charts";
import { getBrand } from "../../api/request";
import { getCategory } from "../../api/requestCategory";
import { getSKUPrice } from "../../api/requestPrice";
import { getProducto } from "../../api/requestProduct";
import { validateTextArea } from "./util/validate";

function AddProductOrder({
  search,
  setSearch,
  setProducts,
  products,
  setLoad,
}) {
  const handleChange = (e) => {
    const id = e.target.id;
    search[id] = e.target.value;
    setSearch(search);
  };

  const addSimpleProduct = () => {
    document.getElementById("sku").value = "";
    document.getElementById("quantity").value = "";
    console.log(search);
    setLoad(true);
    if (search?.sku) {
      getProducto(search.sku).then((data) => {
        if (data) {
          data["cantidad"] = search.quantity;

          getCategory(data.categoria).then((categoria) => {
            data["categoria"] = categoria.categoria;
            getBrand(data.marca).then((marca) => {
              data["marca"] = marca.marca;
              return getSKUPrice(search.sku).then((precio) => {
                data["precio"] = precio.precio;
                data["subtotal"] = parseInt(precio.precio) * search.quantity;
                console.log(precio);
                setProducts([...products, data]);
                console.log(products);
                setLoad(false);
              });
            });
          });
        }
      });
    }
  };
  const addMultiProduct = async () => {
    const text = document.getElementById("multiProduct").value;
    document.getElementById("multiProduct").value = "";
    const productsValidate = validateTextArea(text);
    setLoad(true);
    const produ = productsValidate.map((product) => {
      if (product?.sku) {
        return getProducto(product.sku).then((data) => {
          if (data) {
            data["cantidad"] = product.quantity;
            return getCategory(data.categoria).then((categoria) => {
              data["categoria"] = categoria.categoria;
              return getBrand(data.marca).then((marca) => {
                data["marca"] = marca.marca;
                return getSKUPrice(product.sku).then((precio) => {
                  data["precio"] = precio.precio;
                  data["subtotal"] = parseInt(precio.precio) * product.quantity;
                  console.log(precio);
                  return data;
                });
              });
            });
          }
        });
      }
    });
    Promise.all(produ).then((data) => {
      const addProducts = [...products, data].flat();
      console.log(addProducts);
      setProducts(addProducts);
      setLoad(false);
    });
  };
  return (
    <Grid
      style={{ paddingTop: "30px", paddingLeft: "10px", paddingRight: "10px" }}
    >
      <div>
        <Title>Copiar/Pegar SKUs</Title>
        <Label>[Código SKU], [Cantidad]</Label>
        <TextArea id="multiProduct" rows={6}></TextArea>
        <Button
          design="Positive"
          style={{ width: "100%", marginTop: "15px" }}
          onClick={addMultiProduct}
        >
          Validar y añadir
        </Button>
      </div>
      <div>
        <Title>Uno por Uno</Title>
        <Label style={{ marginBottom: "5px" }}>
          Seleccione SKU, introduzca cantidad a añadir:
        </Label>
        <Input
          id="sku"
          style={{ marginBottom: "5px", width: "100%" }}
          placeholder="Buscar"
          icon={<Icon name="search" />}
          onInput={handleChange}
        />
        <Input
          id="quantity"
          style={{ width: "100%" }}
          type="Number"
          placeholder="Cantidad"
          onInput={handleChange}
        />
        <Button
          design="Positive"
          style={{ width: "100%", marginTop: "15px" }}
          onClick={addSimpleProduct}
        >
          Añadir al carrito
        </Button>
      </div>
      <div>
        <Title>Subir Archivo</Title>
        <Label></Label>
        <FileUploader style={{ display: "block" }}>
          <Button>Subir Archivo</Button>
        </FileUploader>
        <Button design="Positive" style={{ width: "100%", marginTop: "15px" }}>
          Subir Archivo
        </Button>
      </div>
      <div>
        <Title>Crédito Gastado</Title>
        <RadialChart
          displayValue={"50%"}
          value={50}
          color={"#107e3e"}
          style={{ height: "200px" }}
        />
      </div>
    </Grid>
  );
}

export default AddProductOrder;
