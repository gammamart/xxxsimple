import Navbar from "@/components/global/Navbar";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import toast, { Toaster } from "react-hot-toast";
import Head from "next/head";
import { FcHighPriority } from "react-icons/fc";

import instance from "@/axios";
import requests from "@/requests";
import { userActions } from "@/redux_store/store";
import { IoMdSend } from "react-icons/io";
import useAuthentication from "@/utils/hooks/useAuthentication";

const SendScreen = () => {
  interface User {
    refresh: string;
    access: string;
    token: string;
    username: string;
    email: string;
  }
  const authenticate = useAuthentication();
  const dispatch = useDispatch();
  const [user, setUser] = useState<User>();

  const [tab, setTab] = useState("single");
  const [cost, setCost] = useState(0);

  const bulkButton = useRef<HTMLButtonElement>(null);
  const singleButton = useRef<HTMLButtonElement>(null);
  const [phoneNumberList, setPhoneNumberList] = useState("");
  const [singlePhoneNumber, setSinglePhoneNumber] = useState("");
  const senderName = useRef<HTMLInputElement | null>(null);
  const message = useRef<HTMLTextAreaElement | null>(null);

  const headerConfig = {
    headers: { Authorization: `Bearer ${user?.token}` },
  };

  useEffect(() => {
    if (typeof localStorage !== "undefined") {
      const user: string | null = localStorage.getItem("user");
      user && setUser(JSON.parse(user));
    }
    toast.success("New Users now have free funds in their accounts to test the SMS service. Send a single test SMS to proceed.");

    const inputElement = document.getElementById("multiline-input") as HTMLTextAreaElement;
    if (inputElement) {
      inputElement.placeholder = "Paste you leads here without +1 and seperated by line\n\n2335671894\n5194573298\n4195674390\n5672234589\n2335671894\n7782335635\n5672234589\n2335671894\n7782335674\n5672234589\n2335671894\n7782335718\n";
    }
  }, [tab]);

  useEffect(() => {
    if (tab === "bulk") bulkButton.current?.focus();
    if (tab === "single") singleButton.current?.focus();
  }, [tab]);

  useEffect(() => {
    // getting user profile from the backend and saving them to redux store
    if (user) {
      instance
        .get(requests.profile, headerConfig)
        .then((response) => {
          dispatch(userActions.saveProfile(JSON.stringify(response.data)));
          console.log(response.data);
        })
        .catch((error) => {});
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    instance
      .post(requests.calculateCost, { leads: phoneNumberList, type: "BULK" }, headerConfig)
      .then((response) => {
        setCost(response.data.cost);
      })
      .catch((err) => {});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phoneNumberList]);

  useEffect(() => {
    instance
      .post(requests.calculateCost, { leads: phoneNumberList, type: "SINGLE" }, headerConfig)
      .then((response) => {
        setCost(response.data.cost);
      })
      .catch((err) => {});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [singlePhoneNumber]);

  const sendHandler = () => {
    const notification = toast.loading("Sending your job...");

    if (tab === "single") {
      instance
        .post(requests.sendSingleSMS, { phone_number: singlePhoneNumber, sender_name: senderName.current?.value, message: message.current?.value }, headerConfig)
        .then((response) => {
          if (response.data) {
            if (message.current && senderName.current) {
              message.current.value = "";
              senderName.current.value = "";
            }
            setSinglePhoneNumber("");
            toast.success("Job sent successfully.", { id: notification });
            dispatch(userActions.switchSent());
          } else {
            toast.error("Invalid Phone number ", { id: notification });
          }
        })
        .catch((err) => {
          console.log(err);
          if (err.response.status === 402) {
            toast.error("Insufficient Balance, fund your account!", { id: notification });
          }
        });
    }

    if (tab === "bulk") {
      instance
        .post(requests.bulkSingleSMS, { lead: phoneNumberList, message: message.current?.value, cType: "c2b" }, headerConfig)
        .then((response) => {
          if (response.data) {
            setPhoneNumberList("");
            if (message.current) {
              message.current.value = "";
            }
            toast.success("Job sent successfully.", { id: notification });
            dispatch(userActions.switchSent());
          } else {
            toast.error("Invalid Phone number ", { id: notification });
          }
        })
        .catch((err) => {
          console.log(err);
          if (err.response.status === 402) {
            toast.error("Insufficient Balance, fund your account!", { id: notification });
          }
        });
    }
  };

  return (
    <>
      <Head>
        <title>Dashboard</title>
      </Head>
      <Mainframe>
        <Navbar />
        <Frame>
          <NavigationBar>
            <SingleButton ref={singleButton} onClick={() => setTab("single")} active={tab}>
              Single SMS
            </SingleButton>
            <BulkButton ref={bulkButton} onClick={() => setTab("bulk")} active={tab}>
              Bulk SMS
            </BulkButton>
          </NavigationBar>
          <InformationBox>{<p>Send SMS reliably to all carriers, including AT&T, Verizon, T-Mobile, Vodafone etc.</p>}</InformationBox>
          <InformationBox>
            {tab === "single" ? <p>Single SMS, send single sms to the phone number you entered with custom SENDER NAME. Note that some countries donot accept it. Bulk SMS cost $0.02 per SMS</p> : <p>Bulk SMS sends sms to the bulk phone number lead loaded. It cost $0.02 per SMS</p>}
          </InformationBox>
          <InformationBox style={{ backgroundColor: "#ca8107" }}>
            <FcHighPriority size={24} />
            <FcHighPriority size={24} />
            <FcHighPriority size={24} />
            New users with free balance can only test with <strong>Single SMS</strong>
            <FcHighPriority size={24} />
            <FcHighPriority size={24} />
            <FcHighPriority size={24} />
          </InformationBox>
          <InformationBox style={{backgroundColor: "#ca8107"}}>We&apos;re currently performing essential system maintenance to enhance your experience. During this time, there might be a slight delay in processing pending sends. We apologize for any inconvenience this may cause and appreciate your patience.</InformationBox>
          <Body>
            {tab === "single" ? (
              <div>
                {/* <input ref={senderName} type="text" placeholder="Sender Name..." /> */}
                <input onChange={(e) => setSinglePhoneNumber(e.target.value)} value={singlePhoneNumber} type="tel" placeholder="Phone number" />
              </div>
            ) : (
              <textarea id="multiline-input" onChange={(e) => setPhoneNumberList(e.target.value)} value={phoneNumberList}></textarea>
            )}
            <textarea ref={message} placeholder="Message..."></textarea>
          </Body>
          <Bottom>
            <Cost>
              <p>Cost of sending: ${cost}</p>
            </Cost>
            <SendButton onClick={sendHandler}>
              <p>Send</p>
              <IoMdSend size={26} />
            </SendButton>
          </Bottom>
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

type ButtonProps = {
  active: string;
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
  width: 100%;
  height: 100%;
  min-width: 670px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
const NavigationBar = styled.div`
  /* border: 1px solid aqua; */
  display: flex;
  align-items: center;
  justify-content: space-around;
  height: 70px;
  margin-bottom: 1rem;
`;
const NavButton = styled.button`
  font-size: 1.1rem;
  font-weight: 500;
  color: rgb(255, 255, 255, 0.7);
  background: none;
  border: none;
  padding: 5px;
  cursor: pointer;

  &:focus {
    color: var(--simple-blue);
    border-bottom: 3px solid var(--simple-blue);
    outline: none;
  }
`;
const BulkButton = styled(NavButton)<ButtonProps>`
  color: ${({ active }) => active === "bulk" && "var(--simple-blue)"};
  border-bottom: ${({ active }) => active === "bulk" && "3px solid var(--simple-blue)"};
`;
const SingleButton = styled(NavButton)<ButtonProps>`
  color: ${({ active }) => active === "single" && "var(--simple-blue)"};
  border-bottom: ${({ active }) => active === "single" && "3px solid var(--simple-blue)"};
`;
const Body = styled.div`
  /* border: 1px solid red; */
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  padding: 2em;
  height: 65%;
  min-height: 500px;

  & div {
    display: flex;
    flex-direction: column;
    width: 40%;
    gap: 2em;

    & input {
      background: none;
      border: 1px solid rgb(255, 255, 255, 0.7);
      resize: none;
      color: white;
      font-family: "Source Sans Pro", sans-serif;
      font-size: 1rem;
      padding: 1em;
      width: 100%;

      &:focus {
        outline: none;
      }
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

    &::placeholder {
      font-family: "Source Sans Pro", sans-serif;
      font-size: 1rem;
    }

    &:focus {
      outline: none;
    }
  }

  & textarea:first-child {
    height: 100%;
    width: 40%;
  }
  & textarea:last-child {
    height: 45%;
    width: 50%;
  }
`;
const Bottom = styled.div`
  /* border: 1px solid blue; */
  display: flex;
  padding: 30px;
  align-items: center;
  justify-content: flex-end;
  gap: 50px;
`;
const Cost = styled.div`
  height: 50px;
  padding: 20px;
  border: 3px solid var(--simple-dark-blue);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--simple-blue);
  font-size: 16px;
`;
export const SendButton = styled.button`
  height: 50px;
  width: 150px;
  display: flex;
  align-items: center;
  justify-content: center;
  align-self: flex-end;
  gap: 0.5em;
  background-color: var(--simple-dark-blue);
  border: none;
  color: #fff;
  cursor: pointer;

  & p {
    font-size: 16px;
  }
`;
export const InformationBox = styled.div`
  background-color: var(--simple-blue);
  padding: 0.5rem 2rem 0.5rem 2rem;
  margin-bottom: 0.3rem;
  display: flex;
  align-items: center;
  gap: 0.2rem;
`;

export default SendScreen;
