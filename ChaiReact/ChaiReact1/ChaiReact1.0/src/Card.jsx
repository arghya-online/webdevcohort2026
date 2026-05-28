import React from "react";
import data from "./data";

const { rangers } = data;

function Card() {
  return (
    <div>
      {rangers.map((data) => (
        <div key={data.id}>
          <h3>{data.ranger}</h3>
          <h6>{data.color}</h6>
        </div>
      ))}
    </div>
  );
}

export default Card;
