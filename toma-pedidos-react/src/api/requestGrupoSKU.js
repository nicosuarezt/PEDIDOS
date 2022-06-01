import axios from "axios";

const instance = axios.create({
  baseURL: process.env.REACT_APP_BASE_SRV,
});

const getGrupos = async () => {
  const grupos = await instance({
    url: "/api/getAllGroupSKU",
    method: "GET",
  });

  return grupos.data;
};
const getCampos = async (id) => {
  const grupos = await instance({
    url: "/api/getAllFieldSKU/" + id,
    method: "GET",
  });

  return grupos.data;
};
const getValores = async (idfield, idValue) => {
  const grupos = await instance({
    url: "/api/getAllFieldValue/" + idfield + "/" + idValue,
    method: "GET",
  });

  return grupos.data;
};

const addGrupo = async (data) => {
  const addGrupo = await instance({
    url: "/api/addGroupSKU",
    method: "POST",
    data: data,
  });

  return addGrupo;
};
const addCampo = async (data) => {
  const addCampo = await instance({
    url: "/api/addFieldSKU",
    method: "POST",
    data: data,
  });

  return addCampo;
};
const addValorCampo = async (data) => {
  const addValorCampo = await instance({
    url: "/api/addValueFieldSKU",
    method: "POST",
    data: data,
  });

  return addValorCampo;
};

export { getGrupos, addGrupo, getCampos, addCampo, getValores, addValorCampo };
