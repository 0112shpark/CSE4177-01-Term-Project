import React from "react";

const footer = () => {
  const onClickMusinsa = () => {
    window.open("https://www.musinsa.com/", "_blank");
  };
  return (
    <div>
      {" "}
      <footer className="Landing-footer">
        <div className="left">
          <p className="bold gray">
            COPYRIGHT (C) MUSINSA ALL RIGHTS RESERVED.
          </p>
          <p className="gray">
            &ensp;본 서비스는 (주)무신사닷컴
            <span onClick={onClickMusinsa}>(www.musinsa.com)</span>의 제품
            정보를 제공하고 있습니다.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default footer;
