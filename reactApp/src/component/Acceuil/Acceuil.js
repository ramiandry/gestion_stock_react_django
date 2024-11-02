import React from "react";
import "./acceuil.css";
import {useNavigate} from "react-router-dom";
import ChartPie from "./ChartPie";
import ChartBar from "./ChartBar";
import ChartLine from "./ChartLine";

function Acceuil() {

  return (
    <div className="cont-acceuil">
      <div className="acceuil-list">
        <ChartPie />
        <ChartBar />
      </div>
      <div className="acceuil-groupe">
        <ChartLine/>
      </div>
    </div>
  );
}

export default Acceuil;
