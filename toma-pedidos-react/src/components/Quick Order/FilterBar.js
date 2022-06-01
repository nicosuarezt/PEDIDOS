import {
  FilterBar,
  FilterGroupItem,
  DateRangePicker,
  Select,
  Option,
} from "@ui5/webcomponents-react";
import React from "react";

function Filter({ clientes,clienteOrden, setClientesOrden }) {
  const handleChange = (e) => {
    // console.log(e.target.id , e.target.selectedOption.value)
    clienteOrden[e.target.id] = e.target.selectedOption.value
    setClientesOrden(clienteOrden);
  };
  return (
    <FilterBar style={{ width: "calc(100% - 4rem)" }}>
      <FilterGroupItem label="Cliente" required>
        <Select id="cliente" onChange={handleChange}>
          <Option>Elegir cliente</Option>
          {clientes.map((cliente) => (
            <Option data-key="Test 1" value={cliente.cliente}>{cliente.cliente}</Option>
          ))}
        </Select>
      </FilterGroupItem>
      <FilterGroupItem label="Sucursal" required>
        <Select id="sucursal" onChange={handleChange}>
          <Option>Elegir Sucursal</Option>
          <Option data-key="Test 1" value="Norte">Norte</Option>
          <Option data-key="Test 2" value="Sur">Sur</Option>
        </Select>
      </FilterGroupItem>
    </FilterBar>
  );
}

export default Filter;
