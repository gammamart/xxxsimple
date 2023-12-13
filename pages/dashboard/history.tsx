/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import styled from "styled-components";
import HistoryCard from "@/components/dashboard/HistoryCard";
import Navbar from "@/components/global/Navbar";
import useAuthentication from "@/utils/hooks/useAuthentication";
import Head from "next/head";
import { useState, useEffect } from "react";

import instance from "@/axios";
import requests from "@/requests";

const HistoryScreen = () => {
  interface User {
    refresh: string;
    access: string;
    token: string;
    username: string;
    email: string;
  }
  interface History {
    id: number;
    status: string;
    job_type: string;
    failure_message: string;
    created_at: string;
  }
  const authenticate = useAuthentication();

  const [user, setUser] = useState<User>();
  const [history, setHistory] = useState<[]>();

  const headerConfig = {
    headers: { Authorization: `Bearer ${user?.token}` },
  };

  useEffect(() => {
    if (typeof localStorage !== "undefined") {
      const user: string | null = localStorage.getItem("user");
      user && setUser(JSON.parse(user));
    }
  }, []);

  useEffect(() => {
    instance
      .get(requests.history, headerConfig)
      .then((response) => {
        setHistory(response.data);
      })
      .catch((err) => {});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  console.log(history);

  return (
    <>
      <Head>
        <title>просто</title>
      </Head>
      <Mainframe>
        <Navbar />
        <nav></nav>
        <Frame>
          <Up>
            <h6>Ongoing and past messages.</h6>
            <section style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
              <span style={{ color: "#fff", display: "flex", fontSize: "14px" }}>
                <p style={{ color: "#ffa20182" }}>PREPARING:&nbsp;</p>
                {"System sorting leads according to their carrier."}
              </span>
              <span style={{ color: "#fff", display: "flex", fontSize: "14px" }}>
                <p style={{ color: "#009ed28c" }}>SENDING:&nbsp;</p>
                {"Sending started"}
              </span>
              <span style={{ color: "#fff", display: "flex", fontSize: "14px" }}>
                <p style={{ color: "#1aa14e87" }}>COMPLETED:&nbsp;</p>
                {"Sending/Dispatching completed."}
              </span>
              <span style={{ color: "#fff", display: "flex", fontSize: "14px" }}>
                <p style={{ color: "#ff0101a0" }}>FAILED:&nbsp;</p>
                {"Sending Failed. For more information you can check status message or contact support."}
              </span>
            </section>
            <TableHead>
              <TableSmallBox>
                <p>Id</p>
              </TableSmallBox>
              <TableSmallBox>
                <p>Status</p>
              </TableSmallBox>
              <TableSmallBox>
                <p>Type</p>
              </TableSmallBox>
              <TableSmallBox>
                <p>Created</p>
              </TableSmallBox>
              <TableSmallBox>
                <p>Status message</p>
              </TableSmallBox>
            </TableHead>
          </Up>
          <Bottom>
            {history?.map((job: History) => (
              <HistoryCard key={job.id} id={job.id} status={job.status} job_type={job.job_type} failure_message={job.failure_message} date={job.created_at} />
            ))}
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

  & > nav {
    /* border: 1px solid red; */
    height: 100%;
    display: flex;
    flex-direction: column;
    width: 280px;
    height: 100%;
    max-height: 900px;

    @media (min-width: 1200px) {
      width: 280px;
    }
    @media (max-width: 700px) {
      width: 100px;
    }
  }
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
  align-items: center;
`;
const Up = styled.div`
  /* border: 1px solid aqua; */
  height: 280px;
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: space-between;
  padding: 30px;
  align-self: flex-start;
  gap: 1.5rem;

  & h6 {
    font-size: 18px;
    color: #fcfdffef;
  }
`;
const Bottom = styled.div`
  /* border: 1px solid red; */
  display: flex;
  height: 100%;
  width: 100%;
  padding-left: 30px;
  padding-right: 30px;
  padding-bottom: 30px;
  display: flex;
  flex-direction: column;
  gap: 1em;
  overflow-y: scroll;
`;

const TableHead = styled.div`
  background-color: #bdc8ff17;
  border-radius: 0.375rem;
  height: 2rem;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-width: 600px;
  border: 1px solid #3a3e4b;
  padding-right: 10px;
  padding-left: 10px;

  & > p {
    font-weight: 600;
    font-size: 0.75rem;
    line-height: 1rem;
    /* padding-left: 0.75rem; */
    /* padding-right: 0.75rem; */
    color: #adb1bb;
  }
`;
const TableSmallBox = styled.span`
  flex: 1;
`;

export default HistoryScreen;
