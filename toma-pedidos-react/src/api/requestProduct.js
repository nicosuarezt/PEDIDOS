import axios from "axios";

const instance = axios.create({
  baseURL: process.env.REACT_APP_BASE_SRV,
});

const getProductos = async () => {
  const productos = await instance({
    url: "/api/getAllProducts",
    method: "GET",
  });

  return productos.data;
};
const getProducto = async (sku) => {
  const producto = await instance({
    url: "/api/getProduct/" + sku,
    method: "GET",
  });

  return producto.data;
};
const addProduct = async (data) => {
  const addproduct = await instance({
    url: "api/addProduct",
    method: "POST",
    data: data,
  });

  return addproduct;
};

export { addProduct, getProductos, getProducto };
