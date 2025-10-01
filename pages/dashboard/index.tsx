import Navbar from "@/components/global/Navbar";
import NavigationBar from "@/components/home/NavigationBar";
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
  const message = useRef<HTMLTextAreaElement | null>(null);
  const membership: string = userInformation ? JSON.parse(userInformation).membership || "Free" : "Free";

  const headerConfig = {
    headers: { Authorization: `Bearer ${token}` },
  };

  useEffect(() => {
    if (typeof localStorage !== "undefined") {
      const user: string | null = localStorage.getItem("user");
      user && setUser(JSON.parse(user));
    }
    // toast.success("New Users now have free funds in their accounts to test the SMS service. Send a single test SMS to proceed.");

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
        .post(requests.sendSingleSMS, { phone_number: singlePhoneNumber, sender_name: "", message: message.current?.value }, headerConfig)
        .then((response) => {
          if (response.data) {
            if (message.current) {
              message.current.value = "";
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
      <NavigationBar />
      <Mainframe>
        {/* <Modal isOpen={isFirstLoad} onRequestClose={() => setIsFirstLoad(false)}>
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
        </Modal> */}
        <Shell>
          <Navbar />
          <Frame>
            <TabBar className="vintage-tabs">
              <TabButton className={`vintage-tab ${tab === "single" ? "active" : ""}`} ref={singleButton} onClick={() => setTab("single")}>
                Single SMS
              </TabButton>
              <TabButton
                className={`vintage-tab ${tab === "bulk" ? "active" : ""}`}
                ref={bulkButton}
                onClick={() => {
                  if (verified) {
                    setTab("bulk");
                  } else {
                    toast.error("Not available for free user.");
                  }
                }}
              >
                Bulk SMS
              </TabButton>
            </TabBar>
            <article style={{ display: "flex", flexDirection: "column", gap: "0.2rem" }}>
              <InformationBox>
                {
                  <p>
                    {membership !== "Private" && <b style={{ color: "#009DD2" }}>COST: $0.02/SMS. &nbsp;</b>}
                    <strong>Send SMS reliably to all carriers, including AT&T, Verizon, T-Mobile, Vodafone etc.</strong>
                  </p>
                }
              </InformationBox>
              {membership !== "Private" && (
                <InformationBox
                  style={{
                    background: "linear-gradient(180deg, #e9c86f 0%, #b7923a 55%, #8e6e29 100%)",
                    border: "1px solid #b89a45",
                    boxShadow: "0 1px 0 #fff inset, 0 2px 0 #6b5a35, 0 6px 12px rgba(0,0,0,0.15)",
                    color: "#1f1a0f",
                  }}
                >
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
            <IntroductionFrame>{statusIsLoading ? <LoadingAnimation /> : <ServiceLoad status={serverStatus?.status} />}</IntroductionFrame>
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

type ButtonProps = {
  active: string;
};

interface SendButtonProps {
  disabled?: boolean;
}

const Mainframe = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(180deg, #d9dde3 0%, #c9ced6 40%, #b6bcc6 100%);
  background-attachment: fixed;
  width: 100%;
  max-width: 100vw;

  @media (max-width: 768px) {
    width: 100vw;
    max-width: 100vw;
    margin-left: 0;
    margin-right: 0;
  }
`;

const Frame = styled.div`
  width: 100%;
  max-width: 980px;
  display: flex;
  flex-direction: column;
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

const TabBar = styled.div`
  display: flex;
  gap: 2px;
  align-items: flex-end;
  border-bottom: 1px solid #bdb9ad;
  padding: 8px 16px 0 16px;
  margin-bottom: 12px;
`;
const TabButton = styled.button`
  font-family: Verdana, Arial, Helvetica, sans-serif;
  font-size: 12px;
  color: #2c2c2c;
  cursor: pointer;
  padding: 8px 14px;
  border: 1px solid #bdb9ad;
  border-bottom: none;
  background: linear-gradient(180deg, #ffffff 0%, #e6e3da 100%);
  box-shadow: 0 1px 0 #fff inset;

  &.active {
    background: linear-gradient(180deg, #f7f5ee 0%, #ebe8de 100%);
    font-weight: 600;
  }
`;
const Body = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 20px;
  gap: 12px;
  min-height: 170px;

  & > div {
    display: flex;
    flex-direction: column;
    width: 48%;
    gap: 12px;

    & input {
      background: linear-gradient(180deg, #ffffff 0%, #f1efe8 100%);
      border: 1px solid #bdb9ad;
      box-shadow: 0 1px 0 #fff inset;
      border-radius: 2px;
      color: #2c2c2c;
      font-family: Verdana, Arial, Helvetica, sans-serif;
      font-size: 14px;
      padding: 12px;
      width: 100%;

      &::placeholder {
        color: #6b6b6b;
        font-family: Verdana, Arial, Helvetica, sans-serif;
        font-size: 14px;
      }

      &:focus {
        outline: 2px solid #b89a45;
        outline-offset: 1px;
      }
    }
  }

  & > textarea {
    width: 48%;
    border-radius: 2px;
    background: linear-gradient(180deg, #ffffff 0%, #f1efe8 100%);
    border: 1px solid #bdb9ad;
    box-shadow: 0 1px 0 #fff inset;
    resize: none;
    color: #2c2c2c;
    font-family: Verdana, Arial, Helvetica, sans-serif;
    font-size: 14px;
    padding: 12px;
    height: 100%;

    &::placeholder {
      color: #6b6b6b;
      font-family: Verdana, Arial, Helvetica, sans-serif;
      font-size: 14px;
    }

    &:focus {
      outline: 2px solid #b89a45;
      outline-offset: 1px;
    }

    ::-webkit-scrollbar {
      width: 6px;
    }

    ::-webkit-scrollbar-thumb {
      background-color: #bdb9ad;
      border-radius: 3px;
    }

    ::-webkit-scrollbar-track {
      background-color: #f1efe8;
      border-radius: 3px;
    }
  }
`;
const Bottom = styled.div`
  display: flex;
  padding: 20px;
  align-items: center;
  justify-content: flex-end;
  gap: 20px;
  border-top: 1px solid #bdb9ad;
`;
const Cost = styled.div`
  height: 40px;
  padding: 12px 20px;
  border: 1px solid #b89a45;
  border-radius: 2px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #1e2c45;
  font-size: 14px;
  font-weight: 600;
  font-family: Verdana, Arial, Helvetica, sans-serif;
  background: linear-gradient(180deg, #f7f5ef 0%, #ece9df 100%);
  box-shadow: 0 1px 0 #fff inset;
`;
export const SendButton = styled.button<SendButtonProps>`
  height: 40px;
  width: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  background: ${(props) => (props.disabled ? "linear-gradient(180deg, #f7f5ef 0%, #ece9df 100%)" : "linear-gradient(180deg, #e9c86f 0%, #b7923a 55%, #8e6e29 100%)")};
  border: 1px solid ${(props) => (props.disabled ? "#d5d1c7" : "#7a6126")};
  color: ${(props) => (props.disabled ? "#6b6b6b" : "#1f1a0f")};
  border-radius: 2px;
  font-weight: 600;
  font-family: Verdana, Arial, Helvetica, sans-serif;
  font-size: 12px;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  box-shadow: ${(props) => (props.disabled ? "0 1px 0 #fff inset" : "0 1px 0 #fff inset, 0 2px 0 #6b5a35, 0 6px 12px rgba(0,0,0,0.25)")};

  &:hover {
    filter: ${(props) => (props.disabled ? "none" : "brightness(1.05)")};
  }

  & p {
    font-size: 12px;
    margin: 0;
  }
`;
export const InformationBox = styled.div`
  background: linear-gradient(180deg, #fbfaf6 0%, #f0eee7 100%);
  border: 1px solid #c5c1b7;
  box-shadow: 0 1px 0 #fff inset;
  padding: 12px 20px;
  display: flex;
  align-items: center;
  gap: 8px;
  color: #2c2c2c;
  font-size: 12px;
  font-family: Verdana, Arial, Helvetica, sans-serif;
  width: 100%;
  max-width: 100vw;

  @media (max-width: 768px) {
    padding: 10px 16px;
    font-size: 11px;
    width: 100vw;
    max-width: 100vw;
    margin-left: 0;
    margin-right: 0;
  }
`;

const IntroductionFrame = styled.div`
  display: flex;
  border-radius: 2px;
  padding: 20px;
  margin: 12px 20px;
  min-height: 188px;
  background: linear-gradient(180deg, #fbfaf6 0%, #f0eee7 100%);
  border: 1px solid #c5c1b7;
  box-shadow: 0 1px 0 #fff inset;
`;

export default SendScreen;
