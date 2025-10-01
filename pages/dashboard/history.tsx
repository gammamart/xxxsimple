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
              <StatusLegend>
                <StatusItem>
                  <StatusLabel color="#b89a45">PREPARING:</StatusLabel>
                  <StatusDescription>System sorting leads according to their carrier.</StatusDescription>
                </StatusItem>
                <StatusItem>
                  <StatusLabel color="#4b8a3c">SENDING:</StatusLabel>
                  <StatusDescription>Sending started</StatusDescription>
                </StatusItem>
                <StatusItem>
                  <StatusLabel color="#4b8a3c">COMPLETED:</StatusLabel>
                  <StatusDescription>Sending/Dispatching completed.</StatusDescription>
                </StatusItem>
                <StatusItem>
                  <StatusLabel color="#8e1b1b">FAILED:</StatusLabel>
                  <StatusDescription>Sending Failed. For more information you can check status message or contact support.</StatusDescription>
                </StatusItem>
              </StatusLegend>
              <TableContainer>
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
              </TableContainer>
            </Up>
            <Bottom>
              {isLoadingHistory ? (
                <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "120px" }}>
                  <LoadingAnimation />
                </div>
              ) : (
                <TableContainer>
                  <section>
                    {history?.map((job: History) => (
                      <HistoryCard key={job.id} id={job.id} status={job.status} job_type={job.job_type} failure_message={job.failure_message} date={job.created_at} />
                    ))}
                  </section>
                </TableContainer>
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
  width: 100%;
  max-width: 100vw;

  @media (max-width: 768px) {
    width: 100vw;
    max-width: 100vw;
    margin-left: 0;
    margin-right: 0;
  }
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

  @media (max-width: 768px) {
    flex-direction: column;
    margin-top: 4px;
    min-height: auto;
    max-width: 98%;
  }
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
  box-shadow: 0 1px 0 #fff inset, 0 2px 0 #b7b2a6, 0 6px 12px rgba(0, 0, 0, 0.15);
  margin: 12px 20px;
  border-radius: 2px;
  min-height: 200px;

  @media (max-width: 768px) {
    width: 95%;
    padding: 16px 20px 16px 16px;
    margin: 8px 12px;
    gap: 0.8rem;
  }

  & h6 {
    font-size: 18px;
    color: #1e2c45;
    font-weight: 700;
    font-family: Verdana, Arial, Helvetica, sans-serif;
    margin: 0;
    text-shadow: 0 1px 0 rgba(255, 255, 255, 0.5);

    @media (max-width: 768px) {
      font-size: 16px;
    }
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
  box-shadow: 0 1px 0 #fff inset, 0 2px 0 #b7b2a6, 0 6px 12px rgba(0, 0, 0, 0.15);
  margin: 12px 20px;
  border-radius: 2px;
  min-height: 300px;
  max-height: 400px;

  @media (max-width: 768px) {
    width: 95%;
    padding: 16px 20px 16px 16px;
    margin: 8px 12px;
    min-height: 250px;
    max-height: 350px;
  }

  /* Custom scrollbar styling */
  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: linear-gradient(180deg, #f1efe8 0%, #e6e3da 100%);
    border-radius: 4px;
    border: 1px solid #c5c1b7;
  }

  &::-webkit-scrollbar-thumb {
    background: linear-gradient(180deg, #b89a45 0%, #8e6e29 100%);
    border-radius: 4px;
    border: 1px solid #6b5a35;
    box-shadow: 0 1px 0 #fff inset;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: linear-gradient(180deg, #c4a855 0%, #9e7e39 100%);
  }
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
  box-shadow: 0 1px 0 #fff inset, 0 2px 0 #6b5a35, 0 4px 8px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    min-width: 500px;
    height: 2.2rem;
    padding: 0 12px;
    margin-top: 1.2rem;
  }

  @media (max-width: 480px) {
    min-width: 450px;
    height: 2rem;
    padding: 0 10px;
    margin-top: 1rem;
  }

  & > span > p {
    font-weight: 600;
    font-size: 12px;
    line-height: 1rem;
    color: #1e2c45;
    font-family: Verdana, Arial, Helvetica, sans-serif;
    text-shadow: 0 1px 0 rgba(255, 255, 255, 0.3);

    @media (max-width: 768px) {
      font-size: 11px;
    }

    @media (max-width: 480px) {
      font-size: 10px;
    }
  }
`;
const TableContainer = styled.div`
  width: 100%;
  overflow-x: auto;
  overflow-y: hidden;

  @media (max-width: 768px) {
    /* Custom scrollbar for mobile */
    &::-webkit-scrollbar {
      height: 6px;
    }

    &::-webkit-scrollbar-track {
      background: linear-gradient(180deg, #f1efe8 0%, #e6e3da 100%);
      border-radius: 3px;
      border: 1px solid #c5c1b7;
    }

    &::-webkit-scrollbar-thumb {
      background: linear-gradient(180deg, #b89a45 0%, #8e6e29 100%);
      border-radius: 3px;
      border: 1px solid #6b5a35;
      box-shadow: 0 1px 0 #fff inset;
    }

    &::-webkit-scrollbar-thumb:hover {
      background: linear-gradient(180deg, #c4a855 0%, #9e7e39 100%);
    }
  }

  @media (max-width: 480px) {
    &::-webkit-scrollbar {
      height: 4px;
    }
  }
`;

const StatusLegend = styled.section`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;

  @media (max-width: 768px) {
    gap: 0.3rem;
  }

  @media (max-width: 480px) {
    gap: 0.25rem;
  }
`;

const StatusItem = styled.span`
  color: #2c2c2c;
  display: flex;
  font-size: 12px;
  font-family: Verdana, Arial, Helvetica, sans-serif;

  @media (max-width: 768px) {
    font-size: 11px;
    flex-direction: column;
    gap: 0.1rem;
  }

  @media (max-width: 480px) {
    font-size: 10px;
  }
`;

const StatusLabel = styled.p<{ color: string }>`
  color: ${({ color }) => color};
  font-weight: 600;
  margin: 0;
  white-space: nowrap;

  @media (max-width: 768px) {
    margin-bottom: 0.1rem;
  }
`;

const StatusDescription = styled.span`
  @media (max-width: 768px) {
    margin-left: 0;
  }
`;

const TableSmallBox = styled.span`
  flex: 1;
`;

export default HistoryScreen;
