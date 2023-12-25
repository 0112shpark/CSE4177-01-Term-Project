import React from "react";
import Logo from "../assets/logo_musinsa.svg";

const nav = () => {
  return (
    <div>
      <header className="Landing-header">
        <img src={Logo} className="logo" alt="MUSINAT" />
      </header>
    </div>
  );
};

export default nav;
