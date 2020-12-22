import React, { useState } from "react";
import styled from "styled-components";

import { cityName } from "./api/fetchCityname";
import "./App.css";

const App = () => {
  //   const [query, setQuery] = useState("");
  //   const search = async (e) => {
  //     if (e.key === "Enter") {
  //       const data = await cityName(query);
  //       console.log(data);
  //     }
  //   };

  return (
    <Container>
      <div className="title">
        <img src="./images/logo.png" />
        <h1>My trip </h1>
      </div>
    </Container>
  );
};

export default App;

export const Container = styled.div`
  background-image: url("./images/bg.jpg");
  height: 100vh;
  width: 100vw;
  position: relative;
  background-size: cover;
  background-repeat: no-repeat;

  .title {
    display: flex;
    justify-content: center;
    align-items: center;
    padding-top: 100px;

    img {
      width: 40px;
      height: 40px;
    }

    h1 {
      padding-left: 15px;
      font-size: 40px;
      color: white;
    }
  }
`;
