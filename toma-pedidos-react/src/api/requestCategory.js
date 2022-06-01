import axios from "axios";

const instance = axios.create({
  baseURL: process.env.REACT_APP_BASE_SRV,
});
const getCategories = async () => {
  const categorias = await instance({
    url: "/api/getAllCategorias",
    method: "GET",
  });

  return categorias.data;
};
const getCategory = async (id) => {
  const categoria = await instance({
    url: "/api/getCategory/" + id,
    method: "GET",
  });

  return categoria.data;
};
const addCategory = async (data) => {
  const addcategory = await instance({
    url: "/api/addCategory",
    method: "POST",
    data: data,
  });

  return addcategory;
};
const editCategory = async (data) => {
  const editcategory = await instance({
    url: "/api/updateCategory",
    method: "PUT",
    data: data,
  });

  return editcategory;
};
const deleteCateogory = async (data) => {
  const deletecategory = await instance({
    url: "/api/deleteCategory/" + data,
    method: "DELETE",
  });

  return deletecategory;
};
export {
  getCategories,
  getCategory,
  addCategory,
  editCategory,
  deleteCateogory,
};
