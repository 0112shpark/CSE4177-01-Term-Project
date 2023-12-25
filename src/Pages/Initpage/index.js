import React from "react";
import "./index.css";
import Logo from "../../assets/logo_musinsa.svg";
import { useNavigate } from "react-router-dom";

const Initpage = () => {
  const navigate = useNavigate();

  return (
    <div className="App">
      <p>Welcome to MUSINSA Crawling Page. Check it out!</p>
      <button onClick={() => navigate("/parsing")}>Crawling</button>
    </div>
  );
};

export default Initpage;
