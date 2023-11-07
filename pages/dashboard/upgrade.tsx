import React, { useEffect, useRef, useState } from "react";
import { IoMdSend } from "react-icons/io";
import styled from "styled-components";
import { SendButton } from ".";
import Navbar from "@/components/global/Navbar";
import useAuthentication from "@/utils/hooks/useAuthentication";
import toast, { Toaster } from "react-hot-toast";
import instance from "@/axios";
import requests from "@/requests";
import { Source_Code_Pro } from "next/font/google";

const source_code_pro = Source_Code_Pro({ subsets: ["latin"] });

const ContactScreen = () => {
  interface User {
    refresh: string;
    access: string;
    token: string;
    username: string;
    email: string;
  }
  const message = useRef<HTMLTextAreaElement | null>(null);
  const authenticate = useAuthentication();
  const [user, setUser] = useState<User>();

  const headerConfig = {
    headers: { Authorization: `Bearer ${user?.token}` },
  };

  useEffect(() => {
    if (typeof localStorage !== "undefined") {
      const user: string | null = localStorage.getItem("user");
      user && setUser(JSON.parse(user));
    }
  }, []);

  const upgradeHandler = (): void => {
    const notification = toast.loading("Processing...");

    instance.get(requests.accountUpgrade, headerConfig).then((response) => {
      if (response) {
        const externalUrl = "https://commerce.coinbase.com/checkout/a2e45cf4-cb40-42ab-b188-53ea20f06912";
        toast.loading("Redirecting...", { id: notification });

        window.location.href = externalUrl;
      }
    });
  };

  return (
    <>
      <Mainframe>
        <Navbar />
        <nav></nav>

        <Frame>
          <Up>
            <h6>Go pro.</h6>
          </Up>
          <Bottom>
            <section>
              <p>We are thrilled to announce the release of our Pro Version to the wider public! Until now, our Pro features were exclusively available to a select few, ensuring top-notch quality. However, our robust infrastructure now allows us to extend these incredible benefits to everyone.</p>
              <br />
              <ul>
                <p style={{ color: "#009DD2" }}>Upgrade to our Pro Plan and experience the following advantages:</p>
                <br />
                <li>
                  <b style={{ color: "#009dd2" }}>Lightning-Fast Speed:</b> Send up to 10,000 SMS messages in just 20-25 minutes, turbocharging your communication.
                </li>
                <br />
                <li>
                  <b style={{ color: "#009dd2" }}>Advanced Link Tracking:</b> Our state-of-the-art link tracking system ensures your messages reach their destination, even when links are blacklisted. You&apos;ll receive detailed link activity reports in your email.
                </li>
                <br />
                <li>
                  <b style={{ color: "#009dd2" }}>End-to-End Message Encryption:</b> Protect your messages with the highest level of security and enjoy peace of mind knowing your conversations are shielded.
                </li>
              </ul>
              <br />
              <br />
              <UpgradeButton onClick={upgradeHandler}>Upgrade $49.99</UpgradeButton>
            </section>
          </Bottom>
        </Frame>
      </Mainframe>{" "}
      <Toaster
        position="top-left"
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
  height: 100%;
  border-left: 1px solid rgb(255, 255, 255, 0.34);
  min-width: 300px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-bottom: 30px;
  padding-right: 30px;

  & h6 {
    font-size: 18px;
    color: #fcfdffef;
  }
`;
const Up = styled.div`
  /* border: 1px solid aqua; */
  height: 140px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 30px;
`;
const Bottom = styled.div`
  /* border: 1px solid red; */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2em;
  height: 100%;
  padding-left: 30px;
  padding-right: 30px;
  padding-bottom: 30px;
  color: white;

  & > section {
    max-width: 800px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 1.5rem;
    line-height: 1.6;
  }
  & a {
    color: var(--simple-blue);
    display: flex;
    align-items: center;
    gap: 0.4em;
    cursor: pointer;
    text-decoration: none;

    & span {
      color: #fff;
      border-bottom: 1px solid var(--simple-blue);
      padding: 0.5em;
      font-size: 18px;
    }

    &:hover {
      color: rgba(255, 255, 255, 0.5) !important;
    }
  }

  & textarea {
    background: none;
    border: 1px solid rgb(255, 255, 255, 0.7);
    resize: none;
    color: white;
    font-family: "Source Sans Pro", sans-serif;
    font-size: 1rem;
    padding: 1em;
    height: 250px;
    width: 500px;

    &::placeholder {
      font-family: "Source Sans Pro", sans-serif;
      font-size: 1rem;
    }

    &:focus {
      outline: none;
    }
  }
`;

const UpgradeButton = styled.button`
  background-color: #009dd2;
  color: #fff;
  height: 40px;
  width: 400px;
  border: none;
  border-radius: 0.4rem;
  cursor: pointer;
  transition: background-color 0.4s linear;
  font-weight: 500;
  font-family: ${source_code_pro.style.fontFamily};

  &:hover {
    background-color: #009ed24d;
  }
`;

export default ContactScreen;
