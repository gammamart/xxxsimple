import React, { useEffect } from "react";
import styled from "styled-components";
 
import Body from "../components/home/Body";
import NavigationBar from "../components/home/NavigationBar";

const HomeScreen = () => {
  
  return (
    <>
      <Mainframe>
        <NavigationBar />
        <Body />
      </Mainframe>
    </>
  );
};

const Mainframe = styled.div`
  height: 100%;
  overflow: hidden;
  /* border: 1px solid tomato; */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media (min-width: 1500px) {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
`;

export default HomeScreen;
