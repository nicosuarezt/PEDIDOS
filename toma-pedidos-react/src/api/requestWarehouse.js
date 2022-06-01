import axios from "axios";

const instance = axios.create({
  baseURL: process.env.REACT_APP_BASE_SRV,
});

const getAlmacenes = async () => {
  const almacenes = await instance({
    url: "/api/getAllAlmacenes",
    method: "GET",
  });

  return almacenes.data;
};

const addAlmacen = async (data) => {
  const addwarehouse = await instance({
    url: "/api/addWarehouse",
    method: "POST",
    data: data,
  });

  return addwarehouse;
};

const editAlmacen = async (data) => {
  const editwarehouse = await instance({
    url: "/api/updateWarehouse",
    method: "PUT",
    data: data,
  });

  return editwarehouse;
};
const deleteAlmacen = async (data) => {
  const deletealmacen = await instance({
    url: "/api/deleteWarehouse/" + data,
    method: "DELETE",
  });

  return deletealmacen;
};

export { getAlmacenes, addAlmacen, editAlmacen, deleteAlmacen };
