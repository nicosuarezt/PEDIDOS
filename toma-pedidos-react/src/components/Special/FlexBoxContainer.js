import {
  FlexBox,
  FlexBoxDirection,
  FlexBoxJustifyContent,
} from "@ui5/webcomponents-react";
import React from "react";

function FlexBoxContainer({ children }) {
  return (
    <FlexBox
      style={{
        maxWidth: "1280px",
        margin: "0 auto",
        padding: "20px",
        boxShadow: "0 0 24px rgb(0 0 0 / 15%)",
        backgroundColor: "#f7f7f7",
        minHeight: "100vh",
        height:"100%"
      }}
      direction={FlexBoxDirection.Column}
      justifyContent={FlexBoxJustifyContent.Start}
    >
      {children}
    </FlexBox>
  );
}

export default FlexBoxContainer;
