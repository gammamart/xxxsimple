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
    createed_at: string;
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

  console.log(history)


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
            {history?.map((job: History) => (
              <HistoryCard key={job.id} id={job.id} status={job.status} job_type={job.job_type} failure_message={job.failure_message} date={job.createed_at} />
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
