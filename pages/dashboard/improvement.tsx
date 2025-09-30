import React, { useEffect, useRef, useState } from "react";
import Head from "next/head";
import { IoMdSend } from "react-icons/io";
import styled from "styled-components";
import { SendButton } from ".";
import Navbar from "@/components/global/Navbar";
import useAuthentication from "@/utils/hooks/useAuthentication";
import toast, { Toaster } from "react-hot-toast";
import instance from "@/axios";
import requests from "@/requests";
import { Open_Sans } from "next/font/google";
import NavigationBar from "@/components/home/NavigationBar";

const open_sans = Open_Sans({ subsets: ["latin"] });

const ImprovementScreen = () => {
  interface User {
    refresh: string;
    access: string;
    token: string;
    username: string;
    email: string;
  }
  const message = useRef<HTMLTextAreaElement | null>(null);
  //   const authenticate = useAuthentication();
  const [user, setUser] = useState<User>();
  const [requestLoading, setRequestLoading] = useState<boolean>(false);

  const headerConfig = {
    headers: { Authorization: `Bearer ${user?.token}` },
  };

  useEffect(() => {
    if (typeof localStorage !== "undefined") {
      const user: string | null = localStorage.getItem("user");
      user && setUser(JSON.parse(user));
    }
  }, []);

  const feedbackSendHandler = (): void => {
    const notification = toast.loading("Sending feedback...");
    setRequestLoading(true);

    instance.post(requests.sendFeedback, { message: message.current?.value }, headerConfig).then((response) => {
      if (response) {
        toast.success("Feedback sent.", { id: notification });
        setRequestLoading(false);
        if (message.current) {
          message.current.value = "";
        }
      }
    });
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
              <h6>Tell us what we can do better.</h6>
            </Up>
            <Bottom>
              <section>
                <textarea ref={message} placeholder="Tell us what we can do better..."></textarea>
                <SendFeedbackMessageButton onClick={feedbackSendHandler} disabled={requestLoading}>
                  <p>Send Feedback</p>
                </SendFeedbackMessageButton>
              </section>
            </Bottom>
          </Frame>
        </Shell>
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

interface UpgradeButtonProps {
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
  flex-direction: column;
  justify-content: flex-start;
  padding: 20px 30px 20px 20px;
  background: linear-gradient(180deg, #fbfaf6 0%, #f0eee7 100%);
  border: 1px solid #c5c1b7;
  box-shadow: 0 1px 0 #fff inset;
  margin: 12px 20px;
  border-radius: 2px;
  min-height: 100px;

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
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2em;
  flex: 1;
  padding: 20px 30px 20px 20px;
  background: linear-gradient(180deg, #fbfaf6 0%, #f0eee7 100%);
  border: 1px solid #c5c1b7;
  box-shadow: 0 1px 0 #fff inset;
  margin: 12px 20px;
  border-radius: 2px;
  min-height: 400px;
  color: #2c2c2c;

  & > section {
    max-width: 800px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 1.5rem;
    line-height: 1.6;
    width: 100%;
  }
  & a {
    color: #b89a45;
    display: flex;
    align-items: center;
    gap: 0.4em;
    cursor: pointer;
    text-decoration: none;

    & span {
      color: #2c2c2c;
      border-bottom: 1px solid #b89a45;
      padding: 0.5em;
      font-size: 18px;
    }

    &:hover {
      color: #8e6e29 !important;
    }
  }

  & textarea {
    border-radius: 2px;
    background: linear-gradient(180deg, #ffffff 0%, #f1efe8 100%);
    border: 1px solid #bdb9ad;
    box-shadow: 0 1px 0 #fff inset;
    resize: none;
    color: #2c2c2c;
    font-family: Verdana, Arial, Helvetica, sans-serif;
    font-size: 12px;
    padding: 1em;
    height: 250px;
    width: 100%;

    &::placeholder {
      font-family: Verdana, Arial, Helvetica, sans-serif;
      font-size: 12px;
      color: #6b6b6b;
    }

    &:focus {
      outline: 2px solid #b89a45;
      outline-offset: 1px;
    }
  }
`;

const SendFeedbackMessageButton = styled.button<UpgradeButtonProps>`
  background: ${(props) => (props.disabled ? "linear-gradient(180deg, #f7f5ef 0%, #ece9df 100%)" : "linear-gradient(180deg, #e9c86f 0%, #b7923a 55%, #8e6e29 100%)")};
  border: 1px solid ${(props) => (props.disabled ? "#d5d1c7" : "#7a6126")};
  color: ${(props) => (props.disabled ? "#6b6b6b" : "#1f1a0f")};
  height: 40px;
  width: 400px;
  border-radius: 2px;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  font-weight: 600;
  font-family: Verdana, Arial, Helvetica, sans-serif;
  font-size: 12px;
  box-shadow: ${(props) => (props.disabled ? "0 1px 0 #fff inset" : "0 1px 0 #fff inset, 0 2px 0 #6b5a35, 0 6px 12px rgba(0,0,0,0.25)")};

  &:hover {
    filter: ${(props) => (props.disabled ? "none" : "brightness(1.05)")};
  }

  & > p {
    font-family: Verdana, Arial, Helvetica, sans-serif;
    font-weight: 600;
    font-size: 12px;
    margin: 0;
  }
`;
//pusher
export default ImprovementScreen;
