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
import { Source_Code_Pro } from "next/font/google";

const source_code_pro = Source_Code_Pro({ subsets: ["latin"] });

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
    const notification = toast.loading("Processing...");
    setRequestLoading(true);

    instance.post(requests.sendFeedback, { message }, headerConfig).then((response) => {
      if (response) {
        toast.loading("Redirecting...", { id: notification });
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
        <title>Improvement</title>
      </Head>
      <Mainframe>
        <Navbar />
        <nav></nav>

        <Frame>
          <Up>
            <h6>Tell us what we can do better.</h6>
          </Up>
          <Bottom>
            <section>
              <textarea ref={message} placeholder="Message..."></textarea>
              <SendFeedbackMessageButton onClick={feedbackSendHandler} disabled={requestLoading}>
                <p>Send Feedback</p>
              </SendFeedbackMessageButton>
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

interface UpgradeButtonProps {
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
    width: 100%;
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
    border-radius: 15px;
    background: #1d1f29;
    border: 1px solid #414651;
    resize: none;
    color: white;
    font-family: ${source_code_pro.style.fontFamily};
    font-size: 1rem;
    padding: 1em;
    height: 250px;
    width: 100%;

    &::placeholder {
      font-family: ${source_code_pro.style.fontFamily};
      font-size: 1rem;
      color: #afb3bd;
    }

    &:focus {
      outline: 2px solid #41465178;
    }
  }
`;

const SendFeedbackMessageButton = styled.button<UpgradeButtonProps>`
  background-color: white;
  background-color: ${(props) => (props.disabled ? "#ffffff50" : "#fff")};
  color: #000;
  height: 40px;
  width: 400px;
  border: none;
  border-radius: 0.4rem;
  cursor: pointer;
  transition: background-color 0.1s linear;
  font-weight: 500;
  font-family: ${source_code_pro.style.fontFamily};
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};

  &:hover {
    background-color: #ffffff50;
  }

  & > p {
    font-family: ${source_code_pro.style.fontFamily};
    font-weight: 500;
  }
`;
//pusher
export default ImprovementScreen;
