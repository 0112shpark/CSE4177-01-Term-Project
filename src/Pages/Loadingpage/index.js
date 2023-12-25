import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
const LoadingPage = () => {
  const redirectToSite = () => {
    // 특정 사이트의 URL을 여기에 입력
    const targetSiteUrl =
      "https://www.musinsa.com/ranking/best?new_product_yn=Y";

    // 새 창으로 이동
    window.open(targetSiteUrl, "_blank");
  };

  return (
    <div>
      <button onClick={redirectToSite}>Go to Site</button>
    </div>
  );
};

export default LoadingPage;
