import React from "react";
import { Avatar, ShellBar } from "@ui5/webcomponents-react";
import "@ui5/webcomponents-icons/dist/AllIcons.js";
import { useNavigate } from "react-router-dom";

import logomqa from "../assets/logomqa.png";

function Header() {
  const navigate = useNavigate();
  return (
    <>
      <ShellBar
        primaryTitle="Toma de Pedidos"
        logo={<img src={logomqa} alt="Logo MQA" />}
        onLogoClick={() => navigate("/")}
        profile={<Avatar initials="MQ"/>}
        showCoPilot={true}
      />
    </>
  );
}

export default Header;
