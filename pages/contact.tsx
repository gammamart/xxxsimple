import React, { useRef } from "react";
import { IoMdSend } from "react-icons/io";
import styled from "styled-components";

const ContactScreen = () => {
  const message = useRef<HTMLTextAreaElement | null>(null);

  return (
    <>
      <Mainframe>

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
  height: 100%;
  border-left: 1px solid rgb(255, 255, 255, 0.34);
  min-width: 300px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-bottom: 30px;
  padding-right: 30px;
  margin-top: 2rem;

  & h6 {
    font-size: 18px;
    color: var(--simple-blue);
  }
`;
const Up = styled.div`
  /* border: 1px solid aqua; */
  height: 140px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 30px;
  align-self: center;
`;
const Bottom = styled.div`
  /* border: 1px solid red; */
  display: flex;
  flex-direction: column;
  gap: 2em;
  height: 100%;
  padding-left: 30px;
  padding-right: 30px;
  padding-bottom: 30px;
  align-self: center;

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

export default ContactScreen;
