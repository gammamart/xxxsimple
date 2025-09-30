import React, { useEffect } from "react";
import styled from "styled-components";
import Head from "next/head";

import Body from "../components/home/Body";
import NavigationBar from "../components/home/NavigationBar";

const HomeScreen = () => {
  return (
    <>
      <Head>
        <meta name="google" content="notranslate" />
        <title>просто</title>
      </Head>
      <NavigationBar />
      <Mainframe>
        <Body />
      </Mainframe>
    </>
  );
};

const Mainframe = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(180deg, #d9dde3 0%, #c9ced6 40%, #b6bcc6 100%);
  background-attachment: fixed;
`;

export default HomeScreen;
