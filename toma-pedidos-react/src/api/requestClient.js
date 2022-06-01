import axios from "axios";

const instance = axios.create({
  baseURL: process.env.REACT_APP_BASE_SRV,
});
const getClientes = async () => {
  const clientes = await instance({
    url: "/api/getAllClients",
    method: "GET",
  });
  return clientes.data;
};

export { getClientes };
