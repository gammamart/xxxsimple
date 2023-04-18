import React from "react";
import styled from "styled-components";
import Head from "next/head";
import Register from "@/components/authentication/Register";
// import Login 

const GetInScreen = () => {
  return (
    <>
      <Head>
        <title>Get In</title>
      </Head>
      <Mainframe>
        <Register />
      </Mainframe>
    </>
  );
};

const Mainframe = styled.div`
  /* height: 100vh; */
  max-width: 500px;
  /* border: 1px solid tomato; */
  margin: 50px auto;
`;

export default GetInScreen;
