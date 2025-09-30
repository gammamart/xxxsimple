import React, { useRef, useEffect, useState } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";
import Head from "next/head";
import toast, { Toaster } from "react-hot-toast";

import Navbar from "@/components/global/Navbar";
import useAuthentication from "@/utils/hooks/useAuthentication";
import NavigationBar from "@/components/home/NavigationBar";
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
  const usdtWallet = "TVNCgSGjh93ekd5wMnQX7dxcsXrLRXuVM6";
  const authenticate = useAuthentication();
  const [user, setUser] = useState<User>();
  const [walletReveal, setWalletReveal] = useState(false);
  const [requestLoading, setRequestLoading] = useState<boolean>(false);

  const [selectedCurrency, setSelectedCurrency] = useState<string>("");
  const [walletAddress, setWalletAddress] = useState<string>("");
  const [timeLeft, setTimeLeft] = useState<number>(3600); // 60 minutes in seconds

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

  // Countdown timer effect
  useEffect(() => {
    if (typeof window !== "undefined" && timeLeft > 0) {
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft]);

  // Format time as MM:SS
  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

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
      setTimeLeft(3600); // Reset countdown to 60 minutes
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
      <NavigationBar />
      <Mainframe>
        <Shell>
          <Navbar />
          <Frame>
            <Up>
              <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem", marginTop: "4rem" }}>
                <h6>Fund wallet.</h6>
                <div style={{ marginTop: "1rem", color: "#2c2c2c", fontSize: "12px", fontFamily: "Verdana, Arial, Helvetica, sans-serif" }}>
                  <p>1. Make sure you are logged into your account.</p>
                  <p>2. Send to the wallet.</p>
                  <p>3. Automatically reflect in your account once it has been confirmed on our network.</p>
                  <p>4. You can refresh your account page to check your updated balance after sending the payment.</p>
                </div>
                <span>
                  <label style={{ color: "#2c2c2c", fontSize: "12px", fontFamily: "Verdana, Arial, Helvetica, sans-serif", fontWeight: "600" }} htmlFor="currencySelect">
                    Cryptocurrency:
                  </label>
                  <select
                    id="currencySelect"
                    onChange={handleCurrencyChange}
                    value={selectedCurrency}
                    style={{
                      background: "linear-gradient(180deg, #ffffff 0%, #f1efe8 100%)",
                      border: "1px solid #bdb9ad",
                      borderRadius: "2px",
                      color: "#2c2c2c",
                      fontSize: "12px",
                      fontFamily: "Verdana, Arial, Helvetica, sans-serif",
                      padding: "8px 12px",
                      boxShadow: "0 1px 0 #fff inset",
                      marginLeft: "8px",
                    }}
                  >
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
                  <div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: "12px", marginBottom: "1rem" }}>
                    <section>
                      <p style={{ color: "#6b6b6b", marginTop: "0.7rem", fontSize: "12px", fontFamily: "Verdana, Arial, Helvetica, sans-serif" }}>Click to copy</p>
                      <USDTWalletAddressBox
                        onClick={() => {
                          if (typeof window !== "undefined" && navigator.clipboard) {
                            navigator.clipboard.writeText(walletAddress);
                            toast.success("Wallet address copied");
                          }
                        }}
                      >
                        <p>{walletAddress?.slice(0, 34) + "..."}</p>
                      </USDTWalletAddressBox>
                    </section>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "12px", marginBottom: "1rem" }}>
                      <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                        <p style={{ color: "#2c2c2c", fontSize: "12px", fontFamily: "Verdana, Arial, Helvetica, sans-serif", fontWeight: "600", margin: 0 }}>Processing Payment</p>
                        <p style={{ color: "#6b6b6b", fontSize: "10px", fontFamily: "Verdana, Arial, Helvetica, sans-serif", margin: 0 }}>Time remaining: {formatTime(timeLeft)}</p>
                      </div>
                      <RotatingLoader />
                    </div>
                  </div>
                )}
              </div>
            </Up>
          </Frame>
        </Shell>
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
  flex-direction: column;
  justify-content: flex-start;
  padding: 20px 30px 20px 20px;
  background: linear-gradient(180deg, #fbfaf6 0%, #f0eee7 100%);
  border: 1px solid #c5c1b7;
  box-shadow: 0 1px 0 #fff inset;
  margin: 12px 20px;
  border-radius: 2px;
  min-height: 400px;

  & h6 {
    font-size: 18px;
    color: #1e2c45;
    font-weight: 700;
    font-family: Verdana, Arial, Helvetica, sans-serif;
    margin: 0;
  }
`;
const AmountFrame = styled.div`
  width: 400px;
  height: 50px;
  padding: 1em;
  display: flex;
  align-items: center;
  gap: 1em;
  background: linear-gradient(180deg, #ffffff 0%, #f1efe8 100%);
  border: 1px solid #bdb9ad;
  border-radius: 2px;
  box-shadow: 0 1px 0 #fff inset;

  & p {
    font-size: 18px;
    font-weight: bold;
    color: #1e2c45;
    font-family: Verdana, Arial, Helvetica, sans-serif;
  }

  & input {
    height: 100%;
    width: 100%;
    background: none;
    border: none;
    color: #2c2c2c;
    font-size: 18px;
    font-family: Verdana, Arial, Helvetica, sans-serif;

    &:focus {
      outline: none;
    }

    &::placeholder {
      color: #6b6b6b;
      font-family: Verdana, Arial, Helvetica, sans-serif;
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
  background: ${(props) => (props.disabled ? "linear-gradient(180deg, #f7f5ef 0%, #ece9df 100%)" : "linear-gradient(180deg, #e9c86f 0%, #b7923a 55%, #8e6e29 100%)")};
  border: 1px solid ${(props) => (props.disabled ? "#d5d1c7" : "#7a6126")};
  color: ${(props) => (props.disabled ? "#6b6b6b" : "#1f1a0f")};
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  border-radius: 2px;
  font-size: 12px;
  font-weight: 600;
  font-family: Verdana, Arial, Helvetica, sans-serif;
  box-shadow: ${(props) => (props.disabled ? "0 1px 0 #fff inset" : "0 1px 0 #fff inset, 0 2px 0 #6b5a35, 0 6px 12px rgba(0,0,0,0.25)")};

  &:hover {
    filter: ${(props) => (props.disabled ? "none" : "brightness(1.05)")};
  }

  & p {
    font-size: 12px;
    margin: 0;
  }
`;
const USDTWalletAddressBox = styled.button`
  height: 50px;
  width: auto;
  background: linear-gradient(180deg, #f7f5ef 0%, #ece9df 100%);
  border: 1px solid #b89a45;
  color: #1e2c45;
  cursor: pointer;
  margin-top: 1rem;
  font-family: Verdana, Arial, Helvetica, sans-serif;
  padding: 0 1rem;
  border-radius: 2px;
  box-shadow: 0 1px 0 #fff inset;
  font-size: 12px;
  font-weight: 600;

  &:hover {
    filter: brightness(1.05);
  }

  & > p {
    font-size: 12px;
    margin: 0;
  }
`;

const RotatingLoader = styled.div`
  width: 30px;
  height: 30px;
  border: 3px solid #e0e0e0;
  border-top: 3px solid #b89a45;
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

export default FundWallet;
