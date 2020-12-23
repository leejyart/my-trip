import React, { useState } from "react";
import styled from "styled-components";
import { autocomplete } from "air-port-codes-node";
import { cityName } from "./api/fetchCityname";
import "./App.css";

const App = () => {
  const [from, setFrom] = useState("");
  const [filteredFrom, setFilteredFrom] = useState("");
  const [to, setTo] = useState("");
  const [filteredTo, setFilteredTo] = useState("");
  const [email, setEmail] = useState("");

  function ToggleDisable() {
    setFilteredFrom("");
    setFilteredTo("");
  }

  // Api from APC
  function filterCities(e) {
    console.log(filteredFrom, filteredTo);
    const { name, value } = e.target;
    console.log(name, value);
    if (value === "") {
      setFilteredFrom("");
      setFilteredTo("");
    }
    const apca = autocomplete({
      key: "638ca08efd",
      secret: "c7aab2020d0a956",
      limit: 8,
    });

    apca.request(value);

    if (name === "from") {
      apca.onSuccess = (data) => {
        setFilteredFrom(data.airports);
      };
      apca.onError = (data) => {
        console.log("onError", data.message);
      };
    } else {
      apca.onSuccess = (data) => {
        setFilteredTo(data.airports);
      };
      apca.onError = (data) => {
        console.log("onError", data.message);
      };
    }
  }

  return (
    <Container>
      <div className="title">
        <img src="./images/logo.png" />
        <h1>My trip </h1>
      </div>
      <InputContainer>
        <div>
          <inputFromContainer>
            <DestinationFrom
              name="from"
              placeholder="from"
              onChange={(e) => filterCities(e)}
              onBlur={ToggleDisable}
            />
            {filteredFrom && (
              <DestinationFromToggle>
                {filteredFrom.map((el) => (
                  <div>{el.name}</div>
                ))}
              </DestinationFromToggle>
            )}
          </inputFromContainer>
          <div className="arrow">➤</div>
          <inputToContainer>
            <DestinationTo
              name="to"
              placeholder="to"
              onChange={(e) => filterCities(e)}
              onBlur={ToggleDisable}
            />
            {filteredTo && (
              <DestinationToToggle>
                {filteredTo.map((el) => (
                  <div>
                    {el.iata}+{el.name}
                  </div>
                ))}
              </DestinationToToggle>
            )}
          </inputToContainer>
        </div>
        <input
          type="text"
          className="emailInput"
          placeholder="your email address"
          onChange={(e) => setEmail(e.target.value)}
        />
        <button>Submit</button>
      </InputContainer>
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
    padding-top: 70px;

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

export const InputContainer = styled.div`
  margin-top: 150px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  input {
    width: 300px;
    height: 30px;
    text-align: center;
  }

  button {
    margin-top: 15px;
    width: 80px;
    height: 30px;
  }

  div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 20px;
  }

  .arrow {
    color: white;
    padding: 10px 0;
  }
`;

export const DestinationFrom = styled.input`
  type: "text";
  border: 1px solid grey;
  margin-right: 15px;
  position: relative;
`;

export const DestinationFromToggle = styled.div`
  width: 300px;
  position: absolute;
  display: flex;
  flex-direction: column;

  div {
    width: 300px;
    border: solid lightgray 1px;
    height: 25px;
    padding: 0;
    background-color: white;
    color: black;
    &:hover {
      background-color: lightgray;
    }
  }
`;

export const DestinationTo = styled.input`
  type: "text";
  border: 1px solid grey;
  margin-left: 15px;
`;

export const DestinationToToggle = styled.div`
  width: 300px;
  position: absolute;
  display: flex;
  flex-direction: column;

  div {
    width: 300px;
    border: solid lightgray 1px;
    height: 20px;
    padding-left: 10px;
    background-color: white;
    color: black;
    &:hover {
      background-color: lightgray;
    }
  }
`;
