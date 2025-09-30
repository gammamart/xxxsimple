import React from "react";
import styled from "styled-components";
import Head from "next/head";
import Login from "@/components/authentication/Login";
// import Login

const GetInScreen = () => {
  return (
    <>
      <Head>
        <title>просто</title>
      </Head>
      <Mainframe>
        <Login />
      </Mainframe>
    </>
  );
};

const Mainframe = styled.div``;

export default GetInScreen;
