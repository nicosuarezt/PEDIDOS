import axios from "axios";

const instance = axios.create({
  baseURL: process.env.REACT_APP_BASE_SRV,
});

const updateMarcasFromSAP = async () => {
  const grupos = await instance({
    url: "/sap/getMarcas_CDS",
    method: "GET",
  });

  return grupos;
};
const updateSKUFromSAP = async () => {
  const grupos = await instance({
    url: "/sap/getSKU_CDS",
    method: "GET",
  });

  return grupos;
};

export { updateMarcasFromSAP,updateSKUFromSAP };
