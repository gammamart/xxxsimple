import React, { useRef, useEffect, useState } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";
import Head from "next/head";
import toast, { Toaster } from "react-hot-toast";

import Navbar from "@/components/global/Navbar";
import useAuthentication from "@/utils/hooks/useAuthentication";
import instance from "@/axios";
import requests from "@/requests";
import { staticWallet } from "@/utils/constants";

const FundWallet = () => {
  interface User {
    refresh: string;
    access: string;
    token: string;
    username: string;
    email: string;
  }

  const router = useRouter();
  const usdtWallet = "TWyBksSTjNM7EEab2XgNie7jYKriXYKWmK";
  const authenticate = useAuthentication();
  const [user, setUser] = useState<User>();
  const [walletReveal, setWalletReveal] = useState(false);
  const [requestLoading, setRequestLoading] = useState<boolean>(false);

  const [selectedCurrency, setSelectedCurrency] = useState<string>("");
  const [walletAddress, setWalletAddress] = useState<string>("");

  const amount = useRef<HTMLInputElement | null>(null);
  const USDTAmount = useRef<HTMLInputElement | null>(null);

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
    toast.loading("Redirecting to payment...");
    setRequestLoading(true);

    instance.post(requests.fundWallet, { amount: amount.current?.value }, headerConfig).then((response) => {
      router.replace(response.data.url);
      setRequestLoading(false);
    });
  };

  const usdtFundWalletHandler = (): void => {
    toast.loading("Fetching wallet for payment...");
    setRequestLoading(true);

    instance.post(requests.fundUSDTWallet, { amount: USDTAmount.current?.value }, headerConfig).then((response) => {
      setWalletReveal(true);
      setRequestLoading(false);
    });
  };

  const handleCurrencyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedType = e.target.value;
    const selectedWallet = staticWallet.find((wallet: any) => wallet.type === selectedType);
    if (selectedWallet) {
      setSelectedCurrency(selectedWallet.type);
      setWalletAddress(selectedWallet.address);
    }
  };

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
            {/*<section style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
              <h6>BTC/ETH/LITECOIN/USD COIN/DOGECOIN/BITCOIN CASH/APE COIN/DAI/SHIBA/TETHER/MATIC/WRAPPED ETHER</h6>
              <div style={{ marginTop: "1rem", color: "#fff" }}>
                <p style={{ color: "#ffffff7e" }}>Funds will reflect automatically once it has been confirmed on our network.</p>
              </div>
              <AmountFrame>
                <p>$</p>
                <input ref={amount} type="number" placeholder="Amount" />
              </AmountFrame>
              <ContinueButton onClick={fundWalletHandler} disabled={requestLoading}>
                Continue
              </ContinueButton>
            </section>*/}
            <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem", marginTop: "4rem" }}>
              <h6>USDT(TRC20/TRX) wallet.</h6>
              <div style={{ marginTop: "1rem", color: "#fff" }}>
                <p>1. Make sure you are logged into your account.</p>
                <p>2. Send to the wallet.</p>
                <p>3. Automatically reflect in your account once it has been confirmed on our network.</p>
              </div>
              <span>
                <label htmlFor="currencySelect">Select Cryptocurrency:</label>
                <select id="currencySelect" onChange={handleCurrencyChange} value={selectedCurrency}>
                  <option value="">Select</option>
                  {staticWallet.map((wallet: any) => (
                    <option key={wallet.type} value={wallet.type}>
                      {wallet.name}
                    </option>
                  ))}
                </select>
              </span>
              <AmountFrame>
                <p>$</p>
                <input ref={USDTAmount} type="number" placeholder="Amount" />
              </AmountFrame>
              <ContinueButton onClick={usdtFundWalletHandler} disabled={requestLoading}>
                Continue
              </ContinueButton>
              {walletReveal && (
                <section>
                  <p style={{ color: "#a8acb4", marginTop: "0.7rem", fontSize: "12px" }}>Click to copy</p>
                  <USDTWalletAddressBox
                    onClick={() => {
                      navigator.clipboard.writeText(usdtWallet);
                      toast.success("Wallet address copied");
                    }}
                  >
                    <p>{walletAddress}</p>
                  </USDTWalletAddressBox>
                </section>
              )}
            </div>
          </Up>
        </Frame>
      </Mainframe>
      <Toaster
        position="top-right"
        reverseOrder={false}
        gutter={8}
        containerClassName=""
        containerStyle={{}}
        toastOptions={{
          // Define default options
          className: "",
          duration: 3000,
          style: {
            background: "#2F2E41",
            color: "#fff",
            boxShadow: "none",
            fontSize: "12px",
          },
        }}
      />
    </>
  );
};

interface FundButtonProps {
  disabled?: boolean;
}

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
  min-width: 300px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  width: 100%;
`;
const Up = styled.div`
  /* border: 1px solid aqua; */
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 30px;

  & h6 {
    font-size: 18px;
    color: #fcfdffef;
  }
`;
const AmountFrame = styled.div`
  /* border: 1px solid red; */
  width: 400px;
  height: 50px;
  padding: 1em;
  display: flex;
  align-items: center;
  gap: 1em;
  background: #1d1f29;
  border: 1px solid #414651;
  border-radius: 10px;

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
const ContinueButton = styled.button<FundButtonProps>`
  height: 40px;
  width: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5em;
  background-color: ${(props) => (props.disabled ? "#ffffff44" : "#fff")};
  border: none;
  color: #000;
  cursor: pointer;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};

  & p {
    font-size: 16px;
  }
`;
const USDTWalletAddressBox = styled.button`
  height: 50px;
  width: 400px;
  background: #ffffff10;
  border: 1px solid #ffffff50;
  color: #ffffffd2;
  cursor: pointer;
  margin-top: 1rem;
  font-family: inherit;

  & > p {
    font-size: 16px;
  }
`;

export default FundWallet;
