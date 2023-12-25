import React from "react";
import Logo from "../assets/logo_musinsa.svg";
import { useNavigate } from "react-router-dom";

const Nav = () => {
  const navigate = useNavigate();
  const handleclick = () => {
    navigate("/");
  };
  return (
    <div>
      <header className="Landing-header">
        <img src={Logo} className="logo" onClick={handleclick} alt="MUSINAT" />
      </header>
    </div>
  );
};

export default Nav;
