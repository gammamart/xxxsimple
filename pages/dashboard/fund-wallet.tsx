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
              <ContentContainer>
                <h6>Fund wallet.</h6>
                <InstructionsList>
                  <p>1. Make sure you are logged into your account.</p>
                  <p>2. Send to the wallet.</p>
                  <p>3. Automatically reflect in your account once it has been confirmed on our network.</p>
                  <p>4. You can refresh your account page to check your updated balance after sending the payment.</p>
                </InstructionsList>
                <CurrencySelector>
                  <CurrencyLabel htmlFor="currencySelect">Cryptocurrency:</CurrencyLabel>
                  <CurrencySelect id="currencySelect" onChange={handleCurrencyChange} value={selectedCurrency}>
                    <option value="">Select</option>
                    {staticWallet.map((wallet: any) => (
                      <option key={wallet.type} value={wallet.type}>
                        {wallet.name}
                      </option>
                    ))}
                  </CurrencySelect>
                </CurrencySelector>
                <AmountFrame>
                  <p>$</p>
                  <input ref={USDTAmount} type="number" placeholder="Amount" />
                </AmountFrame>
                <ContinueButton onClick={usdtFundWalletHandler} disabled={requestLoading}>
                  Continue
                </ContinueButton>
                {walletReveal && (
                  <WalletDisplayContainer>
                    <WalletSection>
                      <CopyText>Click to copy</CopyText>
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
                    </WalletSection>
                    <PaymentStatusContainer>
                      <StatusTextContainer>
                        <ProcessingText>Processing Payment</ProcessingText>
                        <TimeText>Time remaining: {formatTime(timeLeft)}</TimeText>
                      </StatusTextContainer>
                      <RotatingLoader />
                    </PaymentStatusContainer>
                  </WalletDisplayContainer>
                )}
              </ContentContainer>
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
          duration: 4000,
          style: {
            background: "linear-gradient(180deg, #f7f5ef 0%, #ece9df 100%)",
            color: "#2c2c2c",
            border: "1px solid #d5d1c7",
            borderRadius: "2px",
            boxShadow: "0 1px 0 #fff inset, 0 2px 0 #b7b2a6, 0 6px 12px rgba(0, 0, 0, 0.25)",
            fontFamily: "Verdana, Arial, Helvetica, sans-serif",
            fontSize: "12px",
            fontWeight: "500",
          },
          success: {
            duration: 3000,
            style: {
              background: "linear-gradient(180deg, #f0f8f0 0%, #e0f0e0 100%)",
              color: "#2c5a2c",
              border: "1px solid #4b8a3c",
              borderRadius: "2px",
              boxShadow: "0 1px 0 #fff inset, 0 2px 0 #3a6b2e, 0 6px 12px rgba(0, 0, 0, 0.25)",
              fontFamily: "Verdana, Arial, Helvetica, sans-serif",
              fontSize: "12px",
              fontWeight: "500",
            },
          },
          error: {
            duration: 4000,
            style: {
              background: "linear-gradient(180deg, #f8f0f0 0%, #f0e0e0 100%)",
              color: "#8e1b1b",
              border: "1px solid #c44d4d",
              borderRadius: "2px",
              boxShadow: "0 1px 0 #fff inset, 0 2px 0 #a03a3a, 0 6px 12px rgba(0, 0, 0, 0.25)",
              fontFamily: "Verdana, Arial, Helvetica, sans-serif",
              fontSize: "12px",
              fontWeight: "500",
            },
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
  min-height: 100vh;
  padding: 0;

  @media (max-width: 768px) {
    padding: 0 8px;
  }

  @media (max-width: 480px) {
    padding: 0 4px;
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

  @media (max-width: 768px) {
    gap: 8px;
  }

  @media (max-width: 480px) {
    gap: 6px;
  }
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

  @media (max-width: 768px) {
    padding: 15px 20px;
    margin: 8px 10px;
    min-height: 350px;
  }

  @media (max-width: 480px) {
    padding: 12px 15px;
    margin: 6px 8px;
    min-height: 300px;
  }

  & h6 {
    font-size: 18px;
    color: #1e2c45;
    font-weight: 700;
    font-family: Verdana, Arial, Helvetica, sans-serif;
    margin: 0;

    @media (max-width: 768px) {
      font-size: 16px;
    }

    @media (max-width: 480px) {
      font-size: 14px;
    }
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

  @media (max-width: 768px) {
    width: 100%;
    max-width: 350px;
    height: 45px;
    padding: 0.8em;
    gap: 0.8em;
  }

  @media (max-width: 480px) {
    max-width: 280px;
    height: 42px;
    padding: 0.6em;
    gap: 0.6em;
  }

  & p {
    font-size: 18px;
    font-weight: bold;
    color: #1e2c45;
    font-family: Verdana, Arial, Helvetica, sans-serif;

    @media (max-width: 768px) {
      font-size: 16px;
    }

    @media (max-width: 480px) {
      font-size: 14px;
    }
  }

  & input {
    height: 100%;
    width: 100%;
    background: none;
    border: none;
    color: #2c2c2c;
    font-size: 18px;
    font-family: Verdana, Arial, Helvetica, sans-serif;

    @media (max-width: 768px) {
      font-size: 16px;
    }

    @media (max-width: 480px) {
      font-size: 14px;
    }

    &:focus {
      outline: none;
    }

    &::placeholder {
      color: #6b6b6b;
      font-family: Verdana, Arial, Helvetica, sans-serif;

      @media (max-width: 768px) {
        font-size: 16px;
      }

      @media (max-width: 480px) {
        font-size: 14px;
      }
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

  @media (max-width: 768px) {
    width: 100%;
    max-width: 350px;
    height: 45px;
    font-size: 11px;
  }

  @media (max-width: 480px) {
    max-width: 280px;
    height: 42px;
    font-size: 10px;
  }

  &:hover {
    filter: ${(props) => (props.disabled ? "none" : "brightness(1.05)")};
  }

  & p {
    font-size: 12px;
    margin: 0;

    @media (max-width: 768px) {
      font-size: 11px;
    }

    @media (max-width: 480px) {
      font-size: 10px;
    }
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

  @media (max-width: 768px) {
    height: 45px;
    padding: 0 0.8rem;
    font-size: 11px;
    margin-top: 0.8rem;
    width: 100%;
    max-width: 300px;
  }

  @media (max-width: 480px) {
    height: 42px;
    padding: 0 0.6rem;
    font-size: 10px;
    margin-top: 0.6rem;
    max-width: 250px;
  }

  &:hover {
    filter: brightness(1.05);
  }

  & > p {
    font-size: 12px;
    margin: 0;

    @media (max-width: 768px) {
      font-size: 11px;
    }

    @media (max-width: 480px) {
      font-size: 10px;
    }
  }
`;

const RotatingLoader = styled.div`
  width: 30px;
  height: 30px;
  border: 3px solid #e0e0e0;
  border-top: 3px solid #b89a45;
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @media (max-width: 768px) {
    width: 25px;
    height: 25px;
    border-width: 2px;
  }

  @media (max-width: 480px) {
    width: 20px;
    height: 20px;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-top: 4rem;

  @media (max-width: 768px) {
    gap: 1.2rem;
    margin-top: 2rem;
  }

  @media (max-width: 480px) {
    gap: 1rem;
    margin-top: 1.5rem;
  }
`;

const InstructionsList = styled.div`
  margin-top: 1rem;
  color: #2c2c2c;
  font-size: 12px;
  font-family: Verdana, Arial, Helvetica, sans-serif;

  @media (max-width: 768px) {
    font-size: 11px;
    margin-top: 0.8rem;
  }

  @media (max-width: 480px) {
    font-size: 10px;
    margin-top: 0.6rem;
  }

  & p {
    margin: 0.5rem 0;

    @media (max-width: 768px) {
      margin: 0.4rem 0;
    }

    @media (max-width: 480px) {
      margin: 0.3rem 0;
    }
  }
`;

const CurrencySelector = styled.span`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  @media (max-width: 768px) {
    gap: 0.4rem;
  }

  @media (max-width: 480px) {
    gap: 0.3rem;
  }
`;

const CurrencyLabel = styled.label`
  color: #2c2c2c;
  font-size: 12px;
  font-family: Verdana, Arial, Helvetica, sans-serif;
  font-weight: 600;

  @media (max-width: 768px) {
    font-size: 11px;
  }

  @media (max-width: 480px) {
    font-size: 10px;
  }
`;

const CurrencySelect = styled.select`
  background: linear-gradient(180deg, #ffffff 0%, #f1efe8 100%);
  border: 1px solid #bdb9ad;
  border-radius: 2px;
  color: #2c2c2c;
  font-size: 12px;
  font-family: Verdana, Arial, Helvetica, sans-serif;
  padding: 8px 12px;
  box-shadow: 0 1px 0 #fff inset;
  margin-left: 8px;
  width: 200px;

  @media (max-width: 768px) {
    font-size: 11px;
    padding: 6px 10px;
    margin-left: 0;
    width: 100%;
    max-width: 300px;
  }

  @media (max-width: 480px) {
    font-size: 10px;
    padding: 5px 8px;
    max-width: 250px;
  }

  &:focus {
    outline: 2px solid #b89a45;
    outline-offset: 1px;
  }
`;

const WalletDisplayContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 16px;
    align-items: stretch;
  }

  @media (max-width: 480px) {
    gap: 12px;
  }
`;

const WalletSection = styled.section`
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const CopyText = styled.p`
  color: #6b6b6b;
  margin-top: 0.7rem;
  font-size: 12px;
  font-family: Verdana, Arial, Helvetica, sans-serif;

  @media (max-width: 768px) {
    font-size: 11px;
    margin-top: 0.5rem;
  }

  @media (max-width: 480px) {
    font-size: 10px;
    margin-top: 0.4rem;
  }
`;

const PaymentStatusContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    gap: 10px;
  }

  @media (max-width: 480px) {
    gap: 8px;
  }
`;

const StatusTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;

  @media (max-width: 768px) {
    gap: 3px;
  }

  @media (max-width: 480px) {
    gap: 2px;
  }
`;

const ProcessingText = styled.p`
  color: #2c2c2c;
  font-size: 12px;
  font-family: Verdana, Arial, Helvetica, sans-serif;
  font-weight: 600;
  margin: 0;

  @media (max-width: 768px) {
    font-size: 11px;
  }

  @media (max-width: 480px) {
    font-size: 10px;
  }
`;

const TimeText = styled.p`
  color: #6b6b6b;
  font-size: 10px;
  font-family: Verdana, Arial, Helvetica, sans-serif;
  margin: 0;

  @media (max-width: 768px) {
    font-size: 9px;
  }

  @media (max-width: 480px) {
    font-size: 8px;
  }
`;

export default FundWallet;
