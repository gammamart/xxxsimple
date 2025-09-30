import React, { useRef } from "react";
import { IoMdSend } from "react-icons/io";
import styled from "styled-components";

const ContactScreen = () => {
  const message = useRef<HTMLTextAreaElement | null>(null);

  return (
    <>
      <Mainframe>
        <Shell>
          <Panel className="vintage-panel">
            <Up>
              <h6>Contact us on our telegram for responsive chat.</h6>
            </Up>
            <Bottom>
              <a href="https://t.me/npocto97" target="_blank">
                <IoMdSend size={25} /> <span>Telegram</span>
              </a>
            </Bottom>
          </Panel>
        </Shell>
      </Mainframe>
    </>
  );
};

const Mainframe = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Shell = styled.div`
  width: 100%;
  max-width: 980px;
  margin: 40px auto;

  @media (max-width: 768px) {
    margin: 20px auto;
    max-width: 95%;
  }
`;

const Panel = styled.div`
  padding: 16px;

  @media (max-width: 768px) {
    padding: 12px;
  }
`;
const Up = styled.div`
  padding: 10px 12px 12px 12px;
  & h6 {
    font-size: 16px;
    color: #1e2c45;
    font-family: Verdana, Arial, Helvetica, sans-serif;

    @media (max-width: 768px) {
      font-size: 14px;
    }

    @media (max-width: 480px) {
      font-size: 13px;
    }
  }
`;
const Bottom = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 12px;

  & a {
    color: #12325a;
    display: flex;
    align-items: center;
    gap: 0.4em;
    cursor: pointer;
    text-decoration: none;

    & span {
      color: #2c2c2c;
      border-bottom: 1px solid #bdb9ad;
      padding: 0.25em 0.5em;
      font-size: 14px;

      @media (max-width: 768px) {
        font-size: 13px;
      }

      @media (max-width: 480px) {
        font-size: 12px;
      }
    }

    &:hover {
      text-decoration: underline;
    }
  }

  /* no textarea on vintage contact panel */
`;

export default ContactScreen;
