/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import styled from "styled-components";
import dynamic from "next/dynamic";

import Navbar from "@/components/global/Navbar";
import useAuthentication from "@/utils/hooks/useAuthentication";
import Head from "next/head";
import { useState, useEffect } from "react";

import instance from "@/axios";
import requests from "@/requests";
import NavigationBar from "@/components/home/NavigationBar";

const HistoryCard = dynamic(() => import("@/components/dashboard/HistoryCard"), {
  ssr: false,
});
const LoadingAnimation = dynamic(() => import("@/components/dashboard/LoadingAnimation"), {
  ssr: false,
});
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
  const [isLoadingHistory, setIsLoadingHistory] = useState<boolean>(true);

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
    setIsLoadingHistory(true);
    instance
      .get(requests.history, headerConfig)
      .then((response) => {
        setIsLoadingHistory(false);
        setHistory(response.data);
      })
      .catch((err) => {});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  // console.log(history);

  return (
    <>
      <Head>
        <title>просто</title>
      </Head>
      <NavigationBar />
      <Mainframe>
        <Shell>
          <Navbar />
          <Frame>
            <Up>
              <h6>Ongoing and past messages.</h6>
              <section style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                <span style={{ color: "#2c2c2c", display: "flex", fontSize: "12px", fontFamily: "Verdana, Arial, Helvetica, sans-serif" }}>
                  <p style={{ color: "#b89a45", fontWeight: "600" }}>PREPARING:&nbsp;</p>
                  {"System sorting leads according to their carrier."}
                </span>
                <span style={{ color: "#2c2c2c", display: "flex", fontSize: "12px", fontFamily: "Verdana, Arial, Helvetica, sans-serif" }}>
                  <p style={{ color: "#4b8a3c", fontWeight: "600" }}>SENDING:&nbsp;</p>
                  {"Sending started"}
                </span>
                <span style={{ color: "#2c2c2c", display: "flex", fontSize: "12px", fontFamily: "Verdana, Arial, Helvetica, sans-serif" }}>
                  <p style={{ color: "#4b8a3c", fontWeight: "600" }}>COMPLETED:&nbsp;</p>
                  {"Sending/Dispatching completed."}
                </span>
                <span style={{ color: "#2c2c2c", display: "flex", fontSize: "12px", fontFamily: "Verdana, Arial, Helvetica, sans-serif" }}>
                  <p style={{ color: "#8e1b1b", fontWeight: "600" }}>FAILED:&nbsp;</p>
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
              {isLoadingHistory ? (
                <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "120px" }}>
                  <LoadingAnimation />
                </div>
              ) : (
                <section>
                  {history?.map((job: History) => (
                    <HistoryCard key={job.id} id={job.id} status={job.status} job_type={job.job_type} failure_message={job.failure_message} date={job.created_at} />
                  ))}
                </section>
              )}
            </Bottom>
          </Frame>
        </Shell>
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
const Shell = styled.div`
  width: 100%;
  max-width: 1180px;
  display: flex;
  flex-direction: row;
  min-height: 520px;
  background: linear-gradient(180deg, #f8f7f3 0%, #efede6 100%);
  border: 1px solid #c5c3bb;
  box-shadow: 0 2px 0 #fff inset, 0 1px 0 #bab6ad inset, 0 8px 18px rgba(0, 0, 0, 0.35);
  margin-top: 6px;
`;

const Frame = styled.div`
  flex: 1;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0;
  overflow: hidden;
`;
const Up = styled.div`
  display: flex;
  width: 96%;
  flex-direction: column;
  justify-content: flex-start;
  padding: 20px 30px 20px 20px;
  align-self: flex-start;
  gap: 1rem;
  background: linear-gradient(180deg, #fbfaf6 0%, #f0eee7 100%);
  border: 1px solid #c5c1b7;
  box-shadow: 0 1px 0 #fff inset;
  margin: 12px 20px;
  border-radius: 2px;
  min-height: 200px;

  & h6 {
    font-size: 18px;
    color: #1e2c45;
    font-weight: 700;
    font-family: Verdana, Arial, Helvetica, sans-serif;
    margin: 0;
  }
`;
const Bottom = styled.div`
  display: flex;
  flex: 1;
  width: 96%;
  padding: 20px 30px 20px 20px;
  flex-direction: column;
  gap: 1em;
  overflow-y: auto;
  background: linear-gradient(180deg, #fbfaf6 0%, #f0eee7 100%);
  border: 1px solid #c5c1b7;
  box-shadow: 0 1px 0 #fff inset;
  margin: 12px 20px;
  border-radius: 2px;
  min-height: 300px;
  max-height: 400px;
`;

const TableHead = styled.div`
  background: linear-gradient(180deg, #f7f5ef 0%, #ece9df 100%);
  border-radius: 2px;
  height: 2.5rem;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-width: 600px;
  border: 1px solid #b89a45;
  padding: 0 15px;
  margin-top: 1.5rem;
  box-shadow: 0 1px 0 #fff inset;

  & > span > p {
    font-weight: 600;
    font-size: 12px;
    line-height: 1rem;
    color: #1e2c45;
    font-family: Verdana, Arial, Helvetica, sans-serif;
  }
`;
const TableSmallBox = styled.span`
  flex: 1;
`;

export default HistoryScreen;
