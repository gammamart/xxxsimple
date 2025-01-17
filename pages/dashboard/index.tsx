import Navbar from "@/components/global/Navbar";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import toast, { Toaster } from "react-hot-toast";
import Head from "next/head";
import { FcHighPriority } from "react-icons/fc";
import { Open_Sans } from "next/font/google";
import dynamic from "next/dynamic";
import Lottie from "react-lottie";

import instance from "@/axios";
import requests from "@/requests";
import { userActions } from "@/redux_store/store";
import { IoMdSend } from "react-icons/io";
import useAuthentication from "@/utils/hooks/useAuthentication";
import Modal from "@/components/dashboard/Modal";
import * as loadingAnimation from "../../public/statics/animations/loading.json";

const ServiceLoad = dynamic(() => import("@/components/dashboard/ServiceLoad"), {
  ssr: false,
});

const LoadingAnimation = dynamic(() => import("@/components/dashboard/LoadingAnimation"), {
  ssr: false,
});

const loadingAnimationOptions = {
  loop: true,
  autoplay: true,
  animationData: loadingAnimation,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

const open_sans = Open_Sans({ subsets: ["latin"] });

const SendScreen = () => {
  interface User {
    refresh: string;
    access: string;
    token: string;
    username: string;
    email: string;
  }

  type Profile = {
    wallet_balance: number;
    user: number;
    [key: string]: any;
  };

  // const authenticate = useAuthentication();
  const dispatch = useDispatch();
  const userProfile = JSON.parse(useSelector((state: any) => state.userSlice.profile));
  const userInformation: string | null = typeof localStorage !== "undefined" ? localStorage.getItem("user") : null;

  const verified: boolean = userInformation && JSON.parse(userInformation).verified;
  const username: string = userInformation && JSON.parse(userInformation).username;
  const token: string = userInformation && JSON.parse(userInformation).token;

  const [user, setUser] = useState<User>();
  const [requestLoading, setRequestLoading] = useState<boolean>(false);
  const [statusIsLoading, setStatusIsLoading] = useState<boolean>(false);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [serverStatus, setServerStatus] = useState<any>(null);
  const [isFirstLoad, setIsFirstLoad] = useState<boolean>(true);

  const [tab, setTab] = useState("single");
  const [cost, setCost] = useState(0);

  const bulkButton = useRef<HTMLButtonElement>(null);
  const singleButton = useRef<HTMLButtonElement>(null);
  const [phoneNumberList, setPhoneNumberList] = useState("");
  const [singlePhoneNumber, setSinglePhoneNumber] = useState("");
  const senderName = useRef<HTMLInputElement | null>(null);
  const message = useRef<HTMLTextAreaElement | null>(null);

  const headerConfig = {
    headers: { Authorization: `Bearer ${token}` },
  };

  useEffect(() => {
    if (typeof localStorage !== "undefined") {
      const user: string | null = localStorage.getItem("user");
      user && setUser(JSON.parse(user));
    }
    toast.success("New Users now have free funds in their accounts to test the SMS service. Send a single test SMS to proceed.");

    const inputElement = document.getElementById("multiline-input") as HTMLTextAreaElement;
    if (inputElement) {
      inputElement.placeholder = "Paste you leads here without +1 and seperated by line\n\n2335671894\n5194573298\n4195674390\n5672234589\n2335671894\n7782335635\n5672234589";
    }
  }, [tab]);

  useEffect(() => {
    if (tab === "bulk") bulkButton.current?.focus();
    if (tab === "single") singleButton.current?.focus();
  }, [tab]);

  useEffect(() => {
    setStatusIsLoading(true);

    instance
      .get(requests.profile, headerConfig)
      .then((response) => {
        dispatch(userActions.saveProfile(JSON.stringify(response.data)));
        // console.log(response.data);
      })
      .catch((error) => {});
    instance
      .get(requests.serverStatus, headerConfig)
      .then((response) => {
        setServerStatus(response.data);
        setStatusIsLoading(false);
      })
      .catch((error) => {});

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (isFirstLoad) {
      // Display the modal on the first load
      setIsFirstLoad(true);
    }
  }, [isFirstLoad]);

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
    setRequestLoading(true);

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
          // console.log(err);
          if (err.response.status === 402) {
            toast.error("Insufficient Balance, fund your account!", { id: notification });
          }
        })
        .finally(() => {
          setRequestLoading(false);
        });
    }

    if (tab === "bulk") {
      instance
        .post(requests.bulkSingleSMS, { lead: phoneNumberList, message: message.current?.value, cType: "c2b" }, headerConfig)
        .then((response) => {
          // console.log(response);
          if (true) {
            // console.log(response.data);
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
          // console.log(err);
          if (err.response.status === 402) {
            toast.error("Insufficient Balance, fund your account!", { id: notification });
          }
        })
        .finally(() => {
          setRequestLoading(false);
        });
    }
  };

  // console.log("LOG: ", profile);

  return (
    <>
      <Head>
        <title>просто</title>
      </Head>
      <Mainframe>
        <Modal isOpen={isFirstLoad} onRequestClose={() => setIsFirstLoad(false)}>
          <h3>Important Announcement: Official Telegram Account Update.</h3>
          <p>
            We regret to inform you that our official Telegram account (@npocto9) has been unexpectedly deleted.
            <br />
            <br />
            New Support Telegram Account: <a href="https://t.me/npocto97">@npocto97</a>. <br />
            <br />
            New Channel: <a href="https://t.me/npoctochain">https://t.me/npoctochain</a>. <br />
            <br />
            Thank you for choosing our service!
          </p>
          <button onClick={() => setIsFirstLoad(false)} style={{ width: "100px", alignSelf: "flex-end" }}>
            Close
          </button>
        </Modal>
        <Navbar />
        <nav></nav>
        <Frame>
          <NavigationBar>
            <SingleButton ref={singleButton} onClick={() => setTab("single")} active={tab}>
              Single SMS
            </SingleButton>
            <BulkButton
              ref={bulkButton}
              onClick={() => {
                if (verified) {
                  setTab("bulk");
                } else {
                  toast.error("Not available for free user.");
                }
              }}
              active={tab}
            >
              Bulk SMS
            </BulkButton>
          </NavigationBar>
          <article style={{ display: "flex", flexDirection: "column", gap: "0.2rem" }}>
            <InformationBox>
              {
                <p>
                  {username !== "glotraff" && username !== "PHOEN11X" && username !== "wowjustwow" && <b style={{ color: "#009DD2" }}>COST: $0.02/SMS. &nbsp;</b>}
                  <strong>Send SMS reliably to all carriers, including AT&T, Verizon, T-Mobile, Vodafone etc.</strong>
                </p>
              }
            </InformationBox>
            {username !== "glotraff" && username !== "PHOEN11X" && username !== "wowjustwow" &&  (
              <InformationBox style={{ background: "#ffcc4c", color: "black" }}>
                {
                  <p>
                    <b>Attention: All unupgraded accounts will be deleted soon.</b>
                  </p>
                }
              </InformationBox>
            )}

            {userProfile?.alert && (
              <InformationBox style={{ background: "red", color: "black" }}>
                {
                  <p>
                    <b>{userProfile?.alert_information}</b>
                  </p>
                }
              </InformationBox>
            )}
          </article>
          <IntroductionFrame>
            {statusIsLoading ? <LoadingAnimation /> : <ServiceLoad status={serverStatus?.status} />}
            {/* <div style={{ color: "#a8acb4" }}>
              <p style={{ color: "#fff", fontSize: "18px", fontWeight: 600 }}>Send SMS</p>
              <ul style={{ marginTop: "1rem", fontSize: "14px", marginLeft: "0.6rem" }}>
                <li>
                  Bulk SMS phone number should be <b>without country code (+1)</b>
                </li>
                {username === "glotraff" || username === "PHOEN11X" ? (
                  <li>
                    Maximum number of phone number that can be loaded once is <strong>{"50,000"}</strong>
                  </li>
                ) : (
                  <li>
                    Maximum number of phone number that can be loaded once is <strong>{verified ? "10,000" : "1,000"}</strong>
                  </li>
                )}
              </ul>
            </div> */}
          </IntroductionFrame>
          <Body>
            {tab === "single" ? (
              <>
                <div>
                  <input onChange={(e) => setSinglePhoneNumber(e.target.value)} value={singlePhoneNumber} type="tel" placeholder="Phone number (2232271673)" maxLength={15} required />
                </div>
              </>
            ) : (
              <textarea id="multiline-input" onChange={(e) => setPhoneNumberList(e.target.value)} value={phoneNumberList} required></textarea>
            )}
            <textarea ref={message} placeholder="Message..." required></textarea>
          </Body>
          <Bottom>
            <Cost>
              <p>Cost of sending: ${cost}</p>
            </Cost>
            <SendButton disabled={requestLoading} onClick={sendHandler}>
              <p>Send</p>
              <IoMdSend size={20} />
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

interface SendButtonProps {
  disabled?: boolean;
}

const Mainframe = styled.div`
  height: 100vh;
  position: relative;
  /* max-height: 900px; */
  min-height: 650px;
  display: flex;
  min-width: 1000px;
  /* position: relative; */
  /* width: 70%; */
  /* border: 1px solid red; */

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
  width: 100%;
  height: 100%;
  min-width: 670px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-self: flex-end;
`;
const NavigationBar = styled.div`
  /* border: 1px solid aqua; */
  display: flex;
  align-items: center;
  justify-content: space-around;
  height: 73px;
  margin-bottom: 1rem;
`;
const NavButton = styled.button`
  font-size: 1.1rem;
  font-weight: 500;
  color: #676f80;
  background: none;
  border: none;
  padding: 5px;
  cursor: pointer;
  width: 260px;
  height: 100%;
  font-family: ${open_sans.style.fontFamily};
  padding: 1rem 3rem 1rem 3rem;

  &:focus {
    color: #a8acb4;
    outline: none;
  }
  &:hover {
    background-color: #2c303997;
  }
`;
const BulkButton = styled(NavButton)<ButtonProps>`
  color: ${({ active }) => active === "bulk" && "#a8acb4"};
  background-color: ${({ active }) => active === "bulk" && "#2c303997"};
`;
const SingleButton = styled(NavButton)<ButtonProps>`
  color: ${({ active }) => active === "single" && "#a8acb4"};
  background-color: ${({ active }) => active === "single" && "#2c303997"};
`;
const Body = styled.div`
  border-bottom: 1px solid #d4ebfe30;
  border-top: 1px solid #d4ebfe30;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  padding: 2em 1rem 0rem 1rem;
  height: 30%;
  min-height: 280px;
  padding: 1.2em 1rem 1.2rem 1rem;

  & div {
    display: flex;
    flex-direction: column;
    width: 40%;
    gap: 2em;

    & input {
      background: #1d1f29;
      border: 1px solid #414651;
      resize: none;
      color: white;
      font-family: ${open_sans.style.fontFamily};
      font-size: 1rem;
      padding: 1em;
      width: 120%;
      border-radius: 8px;
      /* transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1); */
      /* transition: outline 0.8s linear; */

      &::placeholder {
        font-family: ${open_sans.style.fontFamily};
        font-size: 14px;
        color: #afb3bd;
      }

      &:focus {
        outline: 2px solid #41465178;
        outline-offset: 2px;
      }
    }
  }

  & textarea {
    border-radius: 8px;
    background: #1d1f29;
    border: 1px solid #414651;
    resize: none;
    color: white;
    font-family: ${open_sans.style.fontFamily};
    font-size: 1rem;
    padding: 1em;

    &::placeholder {
      font-family: ${open_sans.style.fontFamily};
      font-size: 14px;
      color: #afb3bd;
    }

    &:focus {
      outline: 2px solid #41465178;
    }

    ::-webkit-scrollbar {
      width: 6px; /* Set the width of the scrollbar track */
    }

    ::-webkit-scrollbar-thumb {
      background-color: #88888873; /* Set the color of the scroll knob */
      border-radius: 3px; /* Set the border radius of the knob */
    }

    ::-webkit-scrollbar-track {
      background-color: #f1f1f138; /* Set the color of the scrollbar track */
      border-radius: 3px; /* Set the border radius of the track */
    }
  }

  & textarea:first-child {
    height: 100%;
    width: 48.8%;
  }
  & textarea:last-child {
    height: 100%;
    width: 50%;
  }
`;
const Bottom = styled.div`
  /* border: 1px solid blue; */
  display: flex;
  padding: 20px 30px 20px 30px;
  align-items: center;
  justify-content: flex-end;
  gap: 50px;
`;
const Cost = styled.div`
  height: 40px;
  padding: 20px;
  border: 3px solid var(--simple-dark-blue);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--simple-blue);
  font-size: 16px;
  font-weight: 500;
  font-family: ${open_sans.style.fontFamily};
`;
export const SendButton = styled.button<SendButtonProps>`
  height: 40px;
  width: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  align-self: flex-end;
  gap: 0.5em;
  background-color: ${(props) => (props.disabled ? "#ffffff44" : "#fff")};
  border: none;
  color: #000;
  border-radius: 8px;
  font-weight: 500;
  font-family: ${open_sans.style.fontFamily};
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};

  & p {
    font-size: 16px;
  }
`;
export const InformationBox = styled.div`
  background-color: #1d1f29;
  border-top: 1px solid #2c3039;
  border-bottom: 1px solid #2c3039;
  padding: 0.5rem 2rem 0.5rem 2rem;
  display: flex;
  align-items: center;
  gap: 0.2rem;
  color: #afb3bd;
  font-size: 12px;
`;

const IntroductionFrame = styled.div`
  display: flex;
  /* gap: 1rem; */
  /* border-bottom: 1px solid #d4ebfe30; */
  border-radius: 8px;
  padding: 1.5rem 2rem 1.5rem 2rem;
  margin-top: 1rem;
  margin-left: 1rem;
  margin-right: 1rem;
`;

export default SendScreen;
