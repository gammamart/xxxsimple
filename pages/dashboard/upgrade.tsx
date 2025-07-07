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
      <Mainframe>
        <Navbar />
        <nav></nav>

        <Frame>
          <NavigationBar>
            <ProButton ref={proButton} onClick={() => setTab("pro")} active={tab}>
              Pro Membership
            </ProButton>
            <APIButton ref={apiButton} onClick={() => setTab("api")} active={tab}>
              API Membership
            </APIButton>
            <PrivateButton ref={privateButton} onClick={() => setTab("private")} active={tab}>
              Private Membership
            </PrivateButton>
          </NavigationBar>
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
                    <p style={{ color: "#009DD2" }}>Upgrade to our Pro Plan and experience the following advantages:</p>
                    <br />
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
                </>
              )}
              {tab === "api" && (
                <>
                  <ul>
                    <p style={{ color: "#009DD2" }}>Upgrade to our API Membership and unlock these exclusive features:</p>
                    <br />
                    <li>
                      <b style={{ color: "#009dd2" }}>Direct API Access:</b> Seamlessly integrate our powerful SMS platform into your own applications and workflows.
                    </li>
                    <br />
                    <li>
                      <b style={{ color: "#009dd2" }}>Priority Throughput:</b> Enjoy higher message throughput and reduced queue times for your API requests.
                    </li>
                    <br />
                    <li>
                      <b style={{ color: "#009dd2" }}>Comprehensive API Documentation:</b> Access detailed guides and support for rapid integration and troubleshooting.
                    </li>
                    <br />
                    <li>
                      <b style={{ color: "#009dd2" }}>Dedicated API Support:</b> Get priority assistance from our technical team for all your API needs.
                    </li>
                  </ul>
                  <br />
                  <br />
                </>
              )}
              {tab === "private" && (
                <>
                  <ul>
                    <p style={{ color: "#009DD2" }}>Upgrade to our Private Membership for the ultimate experience:</p>
                    <br />
                    <li>
                      <b style={{ color: "#009dd2" }}>Personalized Service:</b> Receive one-on-one onboarding and a dedicated account manager for your business.
                    </li>
                    <br />
                    <li>
                      <b style={{ color: "#009dd2" }}>Highest Priority Delivery:</b> Your messages are always at the front of the queue, ensuring the fastest possible delivery.
                    </li>
                    <br />
                    <li>
                      <b style={{ color: "#009dd2" }}>Custom Integrations:</b> Work with our engineers to build custom features and integrations tailored to your needs.
                    </li>
                    <br />
                    <li>
                      <b style={{ color: "#009dd2" }}>Exclusive Beta Access:</b> Be the first to try new features and products before public release.
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

type ButtonProps = {
  active: string;
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
    font-size: 14px;
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

const UpgradeButton = styled.button<UpgradeButtonProps>`
  background-color: #009dd2;
  background-color: ${(props) => (props.disabled ? "#009ed24f" : "#009dd2")};
  color: #fff;
  height: 40px;
  width: 400px;
  border: none;
  border-radius: 0.4rem;
  cursor: pointer;
  transition: background-color 0.4s linear;
  font-weight: 500;
  font-family: ${open_sans.style.fontFamily};
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};

  &:hover {
    background-color: #009ed24d;
  }
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
  color: #676f80;
  background: none;
  border: none;
  padding: 5px;
  cursor: pointer;
  font-family: ${open_sans.style.fontFamily};
  font-size: 14px;
  font-weight: 600;
  padding: 1rem 3rem 1rem 3rem;

  &:focus {
    color: #a8acb4;
    outline: none;
  }
  &:hover {
    background-color: #2c303997;
  }
`;
const ProButton = styled(NavButton)<ButtonProps>`
  color: ${({ active }) => active === "pro" && "#a8acb4"};
  background-color: ${({ active }) => active === "pro" && "#2c303997"};
`;
const APIButton = styled(NavButton)<ButtonProps>`
  color: ${({ active }) => active === "api" && "#a8acb4"};
  background-color: ${({ active }) => active === "api" && "#2c303997"};
`;
const PrivateButton = styled(NavButton)<ButtonProps>`
  color: ${({ active }) => active === "private" && "#a8acb4"};
  background-color: ${({ active }) => active === "private" && "#2c303997"};
`;
//pusher
export default UpgradeScreen;
