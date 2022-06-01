import {
  Badge,
  Breadcrumbs,
  BreadcrumbsItem,
  DynamicPage,
  DynamicPageTitle,
  FlexBox,
  FlexBoxDirection,
  Form,
  FormGroup,
  FormItem,
  Label,
  ObjectPage,
  ObjectPageSection,
  ObjectPageSubSection,
  Text,
  Title,
  VariantItem,
  VariantManagement,
} from "@ui5/webcomponents-react";
import React from "react";
import { useLocation } from "react-router-dom";
import logomqa from "../../assets/logomqa.png";

function ClientInfo() {
  const { state } = useLocation();
  return (
    <DynamicPage
      headerTitle={
        <DynamicPageTitle
          style={{ height: "70px" }}
          header={<Title>NOMBRE CLIENTE: {state.clienteOrden.cliente}</Title>}
          subHeader={<Label>SUCURSAL: {state.clienteOrden.sucursal}</Label>}
        >
          <Badge>Status: OK</Badge>
        </DynamicPageTitle>
      }
    />
  );
}

export default ClientInfo;
