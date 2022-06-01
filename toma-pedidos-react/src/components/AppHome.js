import { Grid, Loader, Title, Toolbar } from "@ui5/webcomponents-react";
import React, { useEffect, useState } from "react";
import FlexBoxContainer from "./Special/FlexBoxContainer";
import Tile from "./Tile";

function AppHome() {
  const [load, setLoad] = useState(false);
  

  return (
    <>
      {load ? (
        <Loader  />
      ) : (
        <FlexBoxContainer>
          {/* MASTER DATA */}
          <Toolbar toolbarStyle="Clear" style={{ padding: "0rem 2rem" }}>
            <Title level="H4">MASTER DATA</Title>
          </Toolbar>
          <Grid
            style={{ padding: "2rem"}}
            defaultSpan="XL2 L2 M3 S12"
          >
            <Tile
              icon={"product"}
              title={"Productos"}
              subtitle={"Listado de productos"}
              url={"/product"}
            />
            <Tile
              icon={"add-activity"}
              title={"Marcas"}
              subtitle={"Listado de marcas"}
              url={"/brand"}
            />
            <Tile
              icon={"group"}
              title={"Categorías"}
              subtitle={"Listado de categorías"}
              url={"/category"}
            />
            <Tile
              icon={"group"}
              title={"Alamcén"}
              subtitle={"Listado de almacenes"}
              url={"/warehouse"}
            />
            <Tile
              icon={"bar-code"}
              title={"Grupo SKU"}
              subtitle={"Grupo de SKU's"}
              url={"/group-sku"}
            />
            <Tile
              icon={"money-bills"}
              title={"Lista de precios"}
              subtitle={"listados de precios"}
              url={"/price-list"}
            />
            <Tile
              icon={"family-protection"}
              title={"Clientes"}
              subtitle={"listados de clientes"}
              url={"/client"}
            />
          </Grid>
          {/* QUICK ORDER */}
          <Toolbar toolbarStyle="Clear" style={{ padding: "0rem 2rem" }}>
            <Title level="H4">QUICK ORDER</Title>
          </Toolbar>
          <Grid
            style={{ padding: "2rem", height: "200px" }}
            defaultSpan="XL2 L2 M3 S12"
          >
            <Tile
              icon={"product"}
              title={"Quick Order"}
              subtitle={"Quick Order App"}
              url={"/quick-order"}
            />
          </Grid>
        </FlexBoxContainer>
      )}
    </>
  );
}

export default AppHome;
