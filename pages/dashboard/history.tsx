import React from "react";
import styled from "styled-components";
import HistoryCard from "@/components/dashboard/HistoryCard";
import Navbar from "@/components/global/Navbar";
import useAuthentication from "@/utils/hooks/useAuthentication";
import Head from "next/head";

const HistoryScreen = () => {
  const authenticate = useAuthentication();
  return (
    <>
      <Head>
        <title>History</title>
      </Head>
      <Mainframe>
        <Navbar />
        <Frame>
          <Up>
            <h6>Ongoing and past messages.</h6>
          </Up>
          <Bottom>
            <HistoryCard />
            <HistoryCard />
            <HistoryCard />
            <HistoryCard />
            <HistoryCard />
            <HistoryCard />
            <HistoryCard />
            <HistoryCard />
            <HistoryCard />
            <HistoryCard />
            <HistoryCard />
            <HistoryCard />
            <HistoryCard />
            <HistoryCard />
            <HistoryCard />
            <HistoryCard />
          </Bottom>
        </Frame>
      </Mainframe>
    </>
  );
};

const Mainframe = styled.div`
  height: 100vh;
  /* max-height: 900px; */
  min-height: 650px;
  display: flex;
  min-width: 1000px;
`;

const Frame = styled.div`
  /* border: 1px solid tomato; */
  border-left: 1px solid rgb(255, 255, 255, 0.34);
  height: 100%;
  width: 100%;
  min-width: 300px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
const Up = styled.div`
  /* border: 1px solid aqua; */
  height: 140px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 30px;

  & h6 {
    font-size: 18px;
    color: var(--simple-blue);
  }
`;
const Bottom = styled.div`
  /* border: 1px solid red; */
  display: flex;
  height: 100%;
  padding-left: 30px;
  padding-right: 30px;
  padding-bottom: 30px;
  display: flex;
  flex-direction: column;
  gap: 1em;
  overflow-y: scroll;
`;

export default HistoryScreen;
