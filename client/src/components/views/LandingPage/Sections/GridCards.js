import React from "react";
import { Col } from "antd";

function GridCards(props) {
  if (props.LandingPage) {
    return (
      <Col lg={6} md={8} xs={24}>
        <div style={{ style: "relative" }}>
          <a href={`/movie/${props.movieId}`}>
            <img
              style={{ width: "100%", height: "320px" }}
              src={props.image}
              alt={props.movieName}
            />
          </a>
        </div>
      </Col>
    );
  } else {
    return (
      <Col lg={6} md={8} xs={24}>
        <div style={{ style: "relative" }}>
          <img
            style={{ width: "100%", height: "320px" }}
            src={props.image}
            alt={props.characterName}
          />
          <p style={{ fontWeight: "bold", marginTop: "2%" }}>
            {" "}
            {props.actorName}{" "}
          </p>
          <p> {props.characterName}역 </p>
        </div>
      </Col>
    );
  }
}

export default GridCards;
