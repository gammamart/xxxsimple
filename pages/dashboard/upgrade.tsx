import React, { useEffect, useRef, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
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

const UpgradeScreen = () => {
  interface User {
    refresh: string;
    access: string;
    token: string;
    username: string;
    email: string;
  }
  const router = useRouter();
  const message = useRef<HTMLTextAreaElement | null>(null);
  // const authenticate = useAuthentication();
  const [user, setUser] = useState<User>();
  const [requestLoading, setRequestLoading] = useState<boolean>(false);

  const userInformation: string | null = typeof localStorage !== "undefined" ? localStorage.getItem("user") : null;
  const verified: boolean = userInformation && JSON.parse(userInformation).verified;

  const proButton = useRef<HTMLButtonElement>(null);
  const apiButton = useRef<HTMLButtonElement>(null);
  const privateButton = useRef<HTMLButtonElement>(null);

  const [tab, setTab] = useState("pro");

  const headerConfig = {
    headers: { Authorization: `Bearer ${user?.token}` },
  };

  useEffect(() => {
    if (typeof localStorage !== "undefined") {
      const user: string | null = localStorage.getItem("user");
      user && setUser(JSON.parse(user));
    }
  }, []);

  const MEMBERSHIP_PRICES: Record<string, number> = {
    pro: 49.99,
    api: 149,
    private: 299,
  };

  const MEMBERSHIP_API_MAP: Record<string, string> = {
    pro: "Pro",
    api: "API",
    private: "Private",
  };

  const upgradeHandler = async (): Promise<void> => {
    if (!user?.token) {
      toast.error("You must be logged in.");
      return;
    }
    const notification = toast.loading("Processing...");
    setRequestLoading(true);

    try {
      const response = await instance.post(requests.accountUpgrade, { membership: MEMBERSHIP_API_MAP[tab] }, { headers: { Authorization: `Bearer ${user.token}` } });
      toast.success("Membership upgraded successfully!", { id: notification });
      toast.success("Please relogin to complete the upgrade process.", { id: notification, duration: 10000 });
      setRequestLoading(false);
      // Optionally, update user state or reload user info here
    } catch (error: any) {
      toast.error(error?.response?.data?.detail || "Upgrade failed. Please try again.", { id: notification });
      setRequestLoading(false);
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
            <MiniNavigationBar>
              <ProButton ref={proButton} onClick={() => setTab("pro")} active={tab}>
                Pro Membership
              </ProButton>
              <APIButton ref={apiButton} onClick={() => setTab("api")} active={tab}>
                API Membership
              </APIButton>
              <PrivateButton ref={privateButton} onClick={() => setTab("private")} active={tab}>
                Private Membership
              </PrivateButton>
            </MiniNavigationBar>
            <Up>
              {tab === "pro" && <h6>Pro.</h6>}
              {tab === "api" && <h6>API.</h6>}
              {tab === "private" && <h6>Private.</h6>}
            </Up>
            <Bottom>
              <section>
                {tab === "pro" && (
                  <>
                    {/* <p>
                    We are thrilled to announce the release of our Pro Version to the wider public! Until now, our Pro features were exclusively available to a select few, ensuring top-notch quality. However, our robust infrastructure now allows us to extend these incredible benefits to everyone.
                  </p> */}
                    <br />
                    <ul>
                      <p style={{ color: "#b89a45", fontWeight: "600" }}>Upgrade to our Pro Plan and experience the following advantages:</p>
                      <br />
                      <br />
                      <li>
                        <b style={{ color: "#b89a45" }}>Advanced Link Tracking:</b> Our state-of-the-art link tracking system ensures your messages reach their destination, even when links are blacklisted. You&apos;ll receive detailed link activity reports in your email.
                      </li>
                      <br />
                      <li>
                        <b style={{ color: "#b89a45" }}>End-to-End Message Encryption:</b> Protect your messages with the highest level of security and enjoy peace of mind knowing your conversations are shielded.
                      </li>
                    </ul>
                    <br />
                    <br />
                  </>
                )}
                {tab === "api" && (
                  <>
                    <ul>
                      <p style={{ color: "#b89a45", fontWeight: "600" }}>Upgrade to our API Membership and unlock these exclusive features:</p>
                      <br />
                      <li>
                        <b style={{ color: "#b89a45" }}>Direct API Access:</b> Seamlessly integrate our powerful SMS platform into your own applications and workflows.
                      </li>
                      <br />
                      <li>
                        <b style={{ color: "#b89a45" }}>Priority Throughput:</b> Enjoy higher message throughput and reduced queue times for your API requests.
                      </li>
                      <br />
                      <li>
                        <b style={{ color: "#b89a45" }}>Comprehensive API Documentation:</b> Access detailed guides and support for rapid integration and troubleshooting.
                      </li>
                      <br />
                      <li>
                        <b style={{ color: "#b89a45" }}>Dedicated API Support:</b> Get priority assistance from our technical team for all your API needs.
                      </li>
                    </ul>
                    <br />
                    <br />
                  </>
                )}
                {tab === "private" && (
                  <>
                    <ul>
                      <p style={{ color: "#b89a45", fontWeight: "600" }}>Upgrade to our Private Membership for the ultimate experience:</p>
                      <br />
                      <li>
                        <b style={{ color: "#b89a45" }}>Personalized Service:</b> Receive one-on-one onboarding and a dedicated account manager for your business.
                      </li>
                      <br />
                      <li>
                        <b style={{ color: "#b89a45" }}>Highest Priority Delivery:</b> Your messages are always at the front of the queue, ensuring the fastest possible delivery.
                      </li>
                      <br />
                      <li>
                        <b style={{ color: "#b89a45" }}>Custom Integrations:</b> Work with our engineers to build custom features and integrations tailored to your needs.
                      </li>
                      <br />
                      <li>
                        <b style={{ color: "#b89a45" }}>Exclusive Beta Access:</b> Be the first to try new features and products before public release.
                      </li>
                    </ul>
                    <br />
                    <br />
                  </>
                )}
                {tab === "pro" && !verified && (
                  <UpgradeButton onClick={upgradeHandler} disabled={requestLoading}>
                    {`Upgrade $${MEMBERSHIP_PRICES["pro"]}`}
                  </UpgradeButton>
                )}
                {tab === "api" && (
                  <UpgradeButton onClick={upgradeHandler} disabled={requestLoading}>
                    {`Upgrade $${MEMBERSHIP_PRICES["api"]}`}
                  </UpgradeButton>
                )}
                {tab === "private" && (
                  <UpgradeButton onClick={upgradeHandler} disabled={requestLoading}>
                    {`Upgrade $${MEMBERSHIP_PRICES["private"]}`}
                  </UpgradeButton>
                )}
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
    font-size: 12px;
    font-family: Verdana, Arial, Helvetica, sans-serif;
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

const UpgradeButton = styled.button<UpgradeButtonProps>`
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
`;
const MiniNavigationBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  height: 70px;
  margin: 12px 20px;
  background: linear-gradient(180deg, #fbfaf6 0%, #f0eee7 100%);
  border: 1px solid #c5c1b7;
  box-shadow: 0 1px 0 #fff inset;
  border-radius: 2px;
`;
const NavButton = styled.button`
  font-size: 12px;
  font-weight: 600;
  color: #2c2c2c;
  background: none;
  border: none;
  padding: 1rem 2rem;
  cursor: pointer;
  font-family: Verdana, Arial, Helvetica, sans-serif;
  border-radius: 2px;
  transition: all 0.2s ease;

  &:focus {
    color: #1e2c45;
    outline: none;
  }
  &:hover {
    background: linear-gradient(180deg, #f7f5ef 0%, #ece9df 100%);
    color: #1e2c45;
  }
`;
const ProButton = styled(NavButton)<ButtonProps>`
  color: ${({ active }) => (active === "pro" ? "#1e2c45" : "#2c2c2c")};
  background: ${({ active }) => (active === "pro" ? "linear-gradient(180deg, #f7f5ef 0%, #ece9df 100%)" : "none")};
  border: ${({ active }) => (active === "pro" ? "1px solid #b89a45" : "none")};
  box-shadow: ${({ active }) => (active === "pro" ? "0 1px 0 #fff inset" : "none")};
`;
const APIButton = styled(NavButton)<ButtonProps>`
  color: ${({ active }) => (active === "api" ? "#1e2c45" : "#2c2c2c")};
  background: ${({ active }) => (active === "api" ? "linear-gradient(180deg, #f7f5ef 0%, #ece9df 100%)" : "none")};
  border: ${({ active }) => (active === "api" ? "1px solid #b89a45" : "none")};
  box-shadow: ${({ active }) => (active === "api" ? "0 1px 0 #fff inset" : "none")};
`;
const PrivateButton = styled(NavButton)<ButtonProps>`
  color: ${({ active }) => (active === "private" ? "#1e2c45" : "#2c2c2c")};
  background: ${({ active }) => (active === "private" ? "linear-gradient(180deg, #f7f5ef 0%, #ece9df 100%)" : "none")};
  border: ${({ active }) => (active === "private" ? "1px solid #b89a45" : "none")};
  box-shadow: ${({ active }) => (active === "private" ? "0 1px 0 #fff inset" : "none")};
`;
//pusher
export default UpgradeScreen;
