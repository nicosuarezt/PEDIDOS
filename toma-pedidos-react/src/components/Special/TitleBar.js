import { Bar, Button, ButtonDesign, Title } from "@ui5/webcomponents-react";
import React from "react";
import { useNavigate } from "react-router-dom";

function TitleBar({children,title,url}) {
  const navigate = useNavigate();

  return (
    <Bar
      startContent={
        <>
          <Button
            icon="nav-back"
            design={ButtonDesign.Transparent}
            onClick={() => navigate(url)}
          />

          <Title level="H4">{title}</Title>
        </>
      }
      endContent={
        <>
          {children}
        </>
      }
    ></Bar>
  );
}

export default TitleBar;
