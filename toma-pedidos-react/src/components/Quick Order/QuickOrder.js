import React, { useEffect, useState } from "react";
import Filter from "./FilterBar";
import AddProductOrder from "./AddProductOrder";
import ProductTable from "./ProductTable";
import FlexBoxContainer from "../Special/FlexBoxContainer";
import { getClientes } from "../../api/requestClient";

function QuickOrder() {
  const [load,setLoad] =useState(false)
  const [search, setSearch] = useState({ sku: "", quantity: 0 });
  const [products, setProducts]=useState([])
  const [clientes, setClientes] = useState([]);
  const [clienteOrden, setClientesOrden] = useState({});

  useEffect(async() => {
    setClientes(await getClientes());
  }, []);
  

  return (
    <FlexBoxContainer>
      <Filter clientes={clientes} clienteOrden={clienteOrden} setClientesOrden={setClientesOrden} />
      <AddProductOrder search={search} setSearch={setSearch} products={products} setProducts={setProducts} setLoad={setLoad} />
      <ProductTable load={load} search={search} products={products} clienteOrden={clienteOrden} />
    </FlexBoxContainer>
  );
}

export default QuickOrder;
