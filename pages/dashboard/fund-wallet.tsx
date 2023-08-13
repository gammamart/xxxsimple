import React, { useRef, useEffect, useState } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";
import Head from "next/head";

import Navbar from "@/components/global/Navbar";
import useAuthentication from "@/utils/hooks/useAuthentication";
import instance from "@/axios";
import requests from "@/requests";

const FundWallet = () => {
  interface User {
    refresh: string;
    access: string;
    token: string;
    username: string;
    email: string;
  }

  const router = useRouter();
  const authenticate = useAuthentication();
  const [user, setUser] = useState<User>();

  const amount = useRef<HTMLInputElement | null>(null);

  const headerConfig = {
    headers: { Authorization: `Bearer ${user?.token}` },
  };

  useEffect(() => {
    if (typeof localStorage !== "undefined") {
      const user: string | null = localStorage.getItem("user");
      user && setUser(JSON.parse(user));
    }
  }, []);

  const fundWalletHandler = (): void => {
    instance.post(requests.fundWallet, { amount: amount.current?.value }, headerConfig).then((response) => {
      router.replace(response.data.url);
    });
  };

  return (
    <>
      <Head>
        <title>Fund Wallet</title>
      </Head>
      <Mainframe>
        <Navbar />
        <Frame>
          <Up>
            <h6>Fund your wallet with your favourite Cryto currency.</h6>
            <AmountFrame>
              <p>$</p>
              <input ref={amount} type="number" placeholder="Amount" />
            </AmountFrame>
            <ContinueButton onClick={fundWalletHandler}>Continue</ContinueButton>
          </Up>
          <Bottom>{/* <ContinueButton onClick={fundWalletHandler}>Continue</ContinueButton> */}</Bottom>
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
  min-width: 300px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
`;
const Up = styled.div`
  /* border: 1px solid aqua; */
  height: 220px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 30px;

  & h6 {
    font-size: 18px;
    color: var(--simple-blue);
  }
`;
const AmountFrame = styled.div`
  /* border: 1px solid red; */
  width: 400px;
  height: 60px;
  padding: 1em;
  display: flex;
  align-items: center;
  gap: 1em;
  border: 1px solid rgb(255, 255, 255, 0.7);

  & p {
    font-size: 18px;
    font-weight: bold;
    color: #fff;
  }

  & input {
    height: 100%;
    width: 100%;
    background: none;
    border: none;
    color: #fff;
    font-size: 18px;

    &:focus {
      outline: none;
    }
  }
`;
const Bottom = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 2em;
`;
const ContinueButton = styled.div`
  height: 50px;
  width: 150px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5em;
  background-color: var(--simple-dark-blue);
  border: none;
  color: #fff;
  cursor: pointer;

  & p {
    font-size: 16px;
  }
`;

export default FundWallet;
