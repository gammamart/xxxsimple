import React from "react";
import styled from "styled-components";
import Head from "next/head";
import Register from "@/components/authentication/Register";
// import Login

const GetInScreen = () => {
  return (
    <>
      <Head>
        <title>просто</title>
      </Head>
      <Mainframe>
        <Register />
      </Mainframe>
    </>
  );
};

const Mainframe = styled.div``;

export default GetInScreen;
