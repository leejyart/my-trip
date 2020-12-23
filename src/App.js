import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { autocomplete } from "air-port-codes-node";

const App = () => {
  const [from, setFrom] = useState("");
  const [filteredFrom, setFilteredFrom] = useState("");
  const [to, setTo] = useState("");
  const [filteredTo, setFilteredTo] = useState("");
  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(true);
  const [characterNumberValid, setCharacterNumberValid] = useState(false);

  //3 characters validation function
  useEffect(() => {
    if (email.length >= 3 && to.length >= 3 && from.length >= 3) {
      setCharacterNumberValid(true);
    } else {
      setCharacterNumberValid(false);
    }
  }, [email, to, from]);

  //email validation
  useEffect(() => {
    console.log("email change", email);
    const reg = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
    if (reg.test(email)) {
      setValidEmail(true);
    } else {
      setValidEmail(false);
    }
  }, [email]);

  //make dropdown container to be hidden
  function ToggleDisable() {
    // setFilteredFrom("");
    setFilteredTo("");
  }

  // fetching API from APC function
  function filterCities(e) {
    console.log(filteredFrom, filteredTo);
    const { name, value } = e.target;
    console.log(name, value);
    if (value === "") {
      setEmail("");
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
      setFrom(value);
      //if succeed to fetch data
      apca.onSuccess = (data) => {
        setFilteredFrom(data.airports);
      };
      //if failed to fetch data
      apca.onError = (data) => {
        console.log("onError", data.message);
      };
    } else {
      setTo(value);
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
        <div className="destinationContainer">
          <inputFromContainer>
            {0 < from.length && from.length < 3 && (
              <div className="alarm message">
                "the characters needs to be more than 3"
              </div>
            )}
            <DestinationFrom
              autoComplete="off"
              name="from"
              placeholder="from"
              onChange={(e) => filterCities(e)}
              onBlur={ToggleDisable}
            />
            {filteredFrom && (
              <DestinationFromToggle>
                {filteredFrom.map((el) => (
                  <div>
                    {el.iata}_{el.name}
                  </div>
                ))}
              </DestinationFromToggle>
            )}
          </inputFromContainer>
          <div className="arrow">➤</div>
          <inputToContainer>
            {0 < to.length && to.length < 3 && (
              <div className="alarm message">
                "the characters needs to be more than 3"
              </div>
            )}
            <DestinationTo
              autoComplete="off"
              name="to"
              placeholder="to"
              onChange={(e) => filterCities(e)}
              onBlur={ToggleDisable}
            />
            {filteredTo && (
              <DestinationToToggle>
                {filteredTo.map((el) => (
                  <div>
                    {el.iata}_{el.name}
                  </div>
                ))}
              </DestinationToToggle>
            )}
          </inputToContainer>
        </div>
        {!validEmail && email.length > 0 && (
          <div className="alarm message">
            this is not an correct e-mail format
          </div>
        )}
        <input
          type="text"
          className="emailInput"
          placeholder="your email address"
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="off"
        />
        <Button
          characterNumberValid={characterNumberValid}
          disabled={characterNumberValid}
        >
          Submit
        </Button>
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

  .destinationContainer {
    padding-bottom: 0;
    height: 60px;
  }

  input {
    width: 300px;
    height: 30px;
    text-align: center;
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

  .alarm {
    padding-bottom: 0;
    padding-left: 70px;
    color: red;
    font-weight: bold;
    font-size: 10px;
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
    border-radius: 3;
    padding: 3px 10px;
    width: 285px;
    height: 25px;
    border: solid lightgray 1px;
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
  position: relative;
`;

export const DestinationToToggle = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  margin-left: 15px;
  div {
    border-radius: 3;
    padding: 3px 10px;
    width: 285px;
    height: 25px;
    border: solid lightgray 1px;
    background-color: white;
    color: black;
    &:hover {
      background-color: lightgray;
    }
  }
`;

export const Button = styled.button`
  border-radius: 10px;
  margin-top: 15px;
  width: 80px;
  height: 30px;
  color: white;
  background-color: ${({ characterNumberValid }) =>
    characterNumberValid ? "red" : "grey"};
`;
