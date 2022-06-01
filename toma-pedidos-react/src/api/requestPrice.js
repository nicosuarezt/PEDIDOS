import axios from "axios";

const instance = axios.create({
  baseURL: process.env.REACT_APP_BASE_SRV,
});

const getListsPrice = async () => {
  const listas = await instance({
    url: "/api/getAllListPrice",
    method: "GET",
  });

  return listas.data;
};
const getPrice = async () => {
  const precios = await instance({
    url: "/api/getAllPrices/",
    method: "GET",
  });

  return precios.data;
};
const getSKUPrice = async (id) => {
  const precios = await instance({
    url: "/api/getSKUPrice/" + id,
    method: "GET",
  });

  return precios.data;
};
const getList = async (id) => {
  const precios = await instance({
    url: "/api/getList/" + id,
    method: "GET",
  });

  return precios.data;
};

const addListPrice = async (data) => {
  const addlistPrice = await instance({
    url: "/api/addListPrice",
    method: "POST",
    data: data,
  });
  return addlistPrice;
};
const addPrice = async (data) => {
  const addPrice = await instance({
    url: "/api/addPrice",
    method: "POST",
    data: data,
  });
  return addPrice;
};

export {
  getListsPrice,
  addListPrice,
  getPrice,
  addPrice,
  getList,
  getSKUPrice,
};
