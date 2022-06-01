import axios from "axios";

const instance = axios.create({
  baseURL: process.env.REACT_APP_BASE_SRV,
});
const getBrands = async () => {
  const marcas = await instance({
    url: "/api/getAllMarcas",
    method: "GET",
  });

  return marcas.data;
};
const getBrand = async (id) => {
  const marcas = await instance({
    url: "/api/getMarca/" + id,
    method: "GET",
  });

  return marcas.data;
};
const addBrands = async (data) => {
  const addmarcas = await instance({
    url: "/api/addBrand",
    method: "POST",
    data: data,
  });

  return addmarcas;
};
const editBrands = async (data) => {
  const editmarcas = await instance({
    url: "/api/updateBrand",
    method: "PUT",
    data: data,
  });

  return editmarcas;
};
const deleteBrands = async (data) => {
  const editmarcas = await instance({
    url: "/api/deleteBrand/" + data,
    method: "DELETE",
  });

  return editmarcas;
};

export { getBrands, getBrand, addBrands, editBrands, deleteBrands };
