import React, { useEffect, useState } from "react";
import axios from "axios";
import cheerio from "cheerio";
import "./parsing.css";

const Parsing = () => {
  const [productData, setProductData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchRank, setSearchRank] = useState("");
  const [searchName, setSearchName] = useState("");
  const [searchMinPrice, setSearchMinPrice] = useState("");
  const [searchMaxPrice, setSearchMaxPrice] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/data.html");
        const html = response.data;

        const $ = cheerio.load(html);

        // 상품 데이터 추출
        const extractedData = $(".li_box")
          .map((index, element) => {
            const rank = $(element).find(".txt_num_rank").text().trim();
            const productName = $(element).find(".list_info a").text().trim();
            const priceElement = $(element).find(".price");
            const priceText = priceElement
              .clone()
              .children()
              .remove()
              .end()
              .text()
              .trim();
            const imageLink = $(element)
              .find(".list_img img")
              .attr("data-original");
            const link = $(element).find(".list_img a").attr("href");
            return {
              rank,
              productName,
              priceText,
              imageLink,
              link,
            };
          })
          .get();

        setProductData(extractedData);
        setFilteredData(extractedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handleSearch = () => {
    let filteredProducts = [...productData];

    // 순위 범위 검색
    if (searchRank) {
      const [minRank, maxRank] = searchRank.split("-");
      filteredProducts = filteredProducts.filter(
        (product) =>
          parseInt(product.rank) >= parseInt(minRank) &&
          parseInt(product.rank) <= parseInt(maxRank)
      );
    }

    // 이름으로 검색
    if (searchName) {
      const keyword = searchName.toLowerCase();
      filteredProducts = filteredProducts.filter((product) =>
        product.productName.toLowerCase().includes(keyword)
      );
    }

    // 가격 범위 검색
    if (searchMinPrice && searchMaxPrice) {
      filteredProducts = filteredProducts.filter(
        (product) =>
          parseInt(product.priceText.replace("원", "").replace(",", "")) >=
            parseInt(searchMinPrice) &&
          parseInt(product.priceText.replace("원", "").replace(",", "")) <=
            parseInt(searchMaxPrice)
      );
    }

    setFilteredData(filteredProducts);
  };

  const handleClear = () => {
    setSearchRank("");
    setSearchName("");
    setSearchMinPrice("");
    setSearchMaxPrice("");
    setFilteredData(productData);
  };

  return (
    <div>
      <h1>Product Information</h1>
      <div className="search-container">
        <div>
          <label>Search by Rank Range: </label>
          <input
            type="text"
            placeholder="EX) 1-10"
            value={searchRank}
            onChange={(e) => setSearchRank(e.target.value)}
          />
        </div>
        <div>
          <label>Search by Name: </label>
          <input
            type="text"
            placeholder="상품명"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
          />
        </div>
        <div>
          <label>Search by Price Range: </label>
          <input
            type="text"
            placeholder="최소 가격"
            value={searchMinPrice}
            onChange={(e) => setSearchMinPrice(e.target.value)}
          />
          <input
            type="text"
            placeholder="최대 가격"
            value={searchMaxPrice}
            onChange={(e) => setSearchMaxPrice(e.target.value)}
          />
        </div>
        <button className="search-button" onClick={handleSearch}>
          Search
        </button>
        <button className="clear-button" onClick={handleClear}>
          Clear All
        </button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Rank</th>
            <th>Name</th>
            <th>Price</th>
            <th>Image</th>
            <th>Visit</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((product, index) => (
            <tr key={index}>
              <td>{product.rank}</td>
              <td>{product.productName}</td>
              <td>{product.priceText}</td>
              <td>
                <img src={product.imageLink} alt={`Product ${index + 1}`} />
              </td>
              <td>
                <a href={product.link} alt={`Product ${index + 1}`}>
                  Visit
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Parsing;
