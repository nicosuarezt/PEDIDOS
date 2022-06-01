import { Avatar, Card, CardHeader } from "@ui5/webcomponents-react";
import React from "react";
import { useNavigate } from "react-router-dom";

function Tile({ icon, title, subtitle, url }) {
  const navigate = useNavigate();
  return (
    <Card onClick={() => navigate(`${url}`)}>
      <div className="customTile">
        <CardHeader
          titleText={title}
          interactive={true}
          onClick={() => navigate(`${url} `)}
          style={{ paddingTop: "200px" }}
        />
        <CardHeader
          avatar={<Avatar icon={icon} />}
          interactive={true}
          onClick={() => navigate(`${url} `)}
          style={{ paddingTop: "200px" }}
        />
        <CardHeader
          subtitleText={subtitle}
          interactive={true}
          onClick={() => navigate(`${url} `)}
          style={{ paddingTop: "200px" }}
        />
      </div>
    </Card>
  );
}

export default Tile;
