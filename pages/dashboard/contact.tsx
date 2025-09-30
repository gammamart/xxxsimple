import React, { useRef } from "react";
import Head from "next/head";
import { IoMdSend } from "react-icons/io";
import styled from "styled-components";
import { SendButton } from ".";
import Navbar from "@/components/global/Navbar";
import useAuthentication from "@/utils/hooks/useAuthentication";
import NavigationBar from "@/components/home/NavigationBar";

const ContactScreen = () => {
  const message = useRef<HTMLTextAreaElement | null>(null);
  const authenticate = useAuthentication();

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
              <h6>Contact us on our telegram for responsive chat.</h6>
            </Up>
            <Bottom>
              <a href="https://t.me/npocto97" target="_blank">
                <IoMdSend size={25} /> <span>Telegram</span>
              </a>
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
  min-height: 300px;
  color: #2c2c2c;

  & a {
    color: #b89a45;
    display: flex;
    align-items: center;
    gap: 0.4em;
    cursor: pointer;
    text-decoration: none;
    padding: 12px 24px;
    background: linear-gradient(180deg, #f7f5ef 0%, #ece9df 100%);
    border: 1px solid #b89a45;
    border-radius: 2px;
    box-shadow: 0 1px 0 #fff inset;
    font-family: Verdana, Arial, Helvetica, sans-serif;
    font-size: 12px;
    font-weight: 600;
    transition: all 0.2s ease;

    & span {
      color: #1e2c45;
      font-size: 12px;
      font-weight: 600;
    }

    &:hover {
      filter: brightness(1.05);
      color: #8e6e29 !important;
    }
  }

  & textarea {
    background: linear-gradient(180deg, #ffffff 0%, #f1efe8 100%);
    border: 1px solid #bdb9ad;
    border-radius: 2px;
    box-shadow: 0 1px 0 #fff inset;
    resize: none;
    color: #2c2c2c;
    font-family: Verdana, Arial, Helvetica, sans-serif;
    font-size: 12px;
    padding: 1em;
    height: 250px;
    width: 500px;

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

export default ContactScreen;
