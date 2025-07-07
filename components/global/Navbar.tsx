import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";
import dynamic from "next/dynamic";

import { userActions } from "@/redux_store/store";
import ProfileAvatar from "@/public/statics/images/profileAvatar";
import { MdOutlineFeedback, MdLogout } from "react-icons/md";
import { CiWallet, CiHeadphones } from "react-icons/ci";
import instance from "@/axios";
import requests from "@/requests";
import { BsEmojiSunglassesFill, BsSend, BsClockHistory } from "react-icons/bs";
import { VscVerifiedFilled } from "react-icons/vsc";
import { GoReport } from "react-icons/go";
import { GiChewedSkull } from "react-icons/gi";
import { FaGhost } from "react-icons/fa6";
import { MdOutlineCardMembership } from "react-icons/md";
import { PiShieldCheck } from "react-icons/pi";
import { BsSendArrowUp } from "react-icons/bs";
// import { TbLogs } from "react-icons/tb";

const LoadingAnimation = dynamic(() => import("@/components/dashboard/LoadingAnimation"), {
  ssr: false,
});

const Navbar = () => {
  type Profile = {
    wallet_balance: number;
    user: number;
    [key: string]: any;
  };

  const [profile, setProfile] = useState<Profile | null>(null);
  const [profileIsLoading, setIsLoadingProfile] = useState<boolean>(true);
  const sendButton = useRef<HTMLAnchorElement>(null);
  const fundWalletButton = useRef<HTMLAnchorElement>(null);
  const historyButton = useRef<HTMLAnchorElement>(null);
  const contactUsButton = useRef<HTMLAnchorElement>(null);
  const dispatch = useDispatch();
  const router = useRouter();

  // getting the userprofile from redux store
  const userProfile = JSON.parse(useSelector((state: any) => state.userSlice.profile));
  const sentSwitch = JSON.parse(useSelector((state: any) => state.userSlice.sentSwitch));
  const userInformation: string | null = typeof localStorage !== "undefined" ? localStorage.getItem("user") : null;

  const username: string = userInformation && JSON.parse(userInformation).username;
  const token: string = userInformation && JSON.parse(userInformation).token;
  const verified: boolean = userInformation && JSON.parse(userInformation).verified;
  const membership: string = userInformation ? JSON.parse(userInformation).membership || "Free" : "Free";

  const headerConfig = {
    headers: { Authorization: `Bearer ${token}` },
  };

  // setting the logout handler funtion
  const logoutHandler = () => {
    // deleting all the authentication value in the localStorage
    localStorage.removeItem("user");
    // resetting the REDUX STORE
    dispatch(userActions.logOut(null));
    // redirect to the main Page
    router.replace("/");
  };

  // implementing focus of the button after refresh based on the relative pathname
  // const pathname = new URL(window.location.href).pathname.split("/")[2];
  const pathname = router.asPath.split("/")[2];

  // console.log(profile);
  // console.log(userInformation);

  useEffect(() => {
    setIsLoadingProfile(true);
    instance.get(requests.profile, headerConfig).then((response) => {
      setProfile(response.data);
      setIsLoadingProfile(false);
      dispatch(userActions.saveProfile(JSON.stringify(response.data)));
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sentSwitch]);

  useEffect(() => {
    if (pathname === "send") sendButton.current?.focus();
    if (pathname === "fund-wallet") fundWalletButton.current?.focus();
    if (pathname === "history") historyButton.current?.focus();
    if (pathname === "contact") contactUsButton.current?.focus();
  }, [pathname]);

  return (
    <Mainframe>
      <Logo style={{ color: "#fff", fontSize: "18px", fontWeight: 600, padding: "1.5rem 0rem 1.5rem 1.5rem" }}>просто</Logo>
      <Up>
        <div>
          {membership !== "Private" && <div>{verified ? <GiChewedSkull color="#fff" size={33.6} /> : <BsEmojiSunglassesFill color="#fff" size={34} />}</div>}
          {membership === "Private" && (
            <div>
              <FaGhost color="#fff" size={33.6} />
            </div>
          )}
          {username && (
            <Username style={{ fontSize: "14px", color: "#fff", fontWeight: 600 }}>
              @{username}
              {verified && <VscVerifiedFilled size={18} color={membership === "Private" ? "#FFD700" : "#009DD2"} />}
            </Username>
          )}
        </div>
        <div>
          {profileIsLoading ? <LoadingAnimation /> : <p style={{ fontSize: "20px", color: "#fff", fontWeight: 600 }}>${profile?.wallet_balance.toFixed(2)}</p>}
          {!verified && <UpgradeButton href={"../dashboard/upgrade"}>Upgrade</UpgradeButton>}
        </div>
      </Up>
      <Middle>
        <section>
          <p style={{ color: "white", fontSize: "12px", fontWeight: 600, marginBottom: "0.6rem" }}>GENERAL</p>
          <NavButton href="../dashboard" ref={sendButton}>
            <span>
              <BsSendArrowUp color={"#fbfbfb"} size={16} />
            </span>{" "}
            <p>Send</p>
          </NavButton>
          <NavButton href="../dashboard/history" ref={historyButton}>
            <span>
              <BsClockHistory color={"#fbfbfb"} size={16} />{" "}
            </span>
            <p>History</p>
          </NavButton>
        </section>
        <section>
          <p style={{ color: "white", fontSize: "12px", fontWeight: 600, marginBottom: "0.6rem" }}>BILLING</p>
          <NavButton href="../dashboard/fund-wallet" ref={fundWalletButton}>
            <span>
              <CiWallet color={"#fbfbfb"} size={19} />
            </span>{" "}
            <p>Fund wallet</p>
          </NavButton>
          <NavButton href="../dashboard/upgrade" ref={contactUsButton}>
            <span>
              <PiShieldCheck color={"#fbfbfb"} size={20} />
            </span>{" "}
            <p>Membership</p>
          </NavButton>
        </section>
      </Middle>
      <Bottom>
        <p style={{ color: "white", fontSize: "12px", fontWeight: 600, marginBottom: "0.6rem" }}>OTHERS</p>
        <NavButton href="../dashboard/improvement" ref={contactUsButton}>
          <span>
            <GoReport color={"#fbfbfb"} size={18} />
          </span>{" "}
          <p>Feedback</p>
        </NavButton>
        <NavButton href="../dashboard/contact" ref={contactUsButton}>
          <span>
            <CiHeadphones color={"#fbfbfb"} size={18} />
          </span>{" "}
          <p>Contact us</p>
        </NavButton>
        <SignOutButton onClick={logoutHandler}>
          <MdLogout color={"#fbfbfb"} size={18} /> <p>Sign Out</p>
        </SignOutButton>
      </Bottom>
    </Mainframe>
  );
};

const Mainframe = styled.div`
  height: 100%;
  /* width: 100%; */
  display: flex;
  flex-direction: column;
  width: 234px;
  height: 100%;
  max-height: 900px;
  position: fixed;
  /* border: 1px solid yellow; */
  border-right: 1px solid #2c3039;
  background-color: #05050a;
  overflow-y: auto;

  @media (min-width: 1200px) {
    width: 234px;
  }
  @media (max-width: 700px) {
    width: 100px;
  }

  &::-webkit-scrollbar {
    width: 3px !important;
  }

  &::-webkit-scrollbar-track {
    /* box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3); */
  }

  &::-webkit-scrollbar-thumb {
    background-color: #ffffff98;
    /* outline: 1px solid slategrey; */
  }
`;
const Logo = styled.p`
  border-bottom: 1px solid var(--simple-dark-blue);

  @media (max-width: 700px) {
    padding: 2rem 0rem 1rem 40px;
    font-size: 14px !important;
  }
`;
const Username = styled.span`
  display: flex;
  align-items: center;
  gap: 4px;

  @media (max-width: 700px) {
    font-size: 12px !important;
  }
`;
const Up = styled.div`
  /* border: 1px solid blue; */
  height: 210px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
  padding-top: 1.5rem;
  padding-bottom: 1.5rem;

  & img {
    /* border: 1px solid tomato; */
    height: 120px;
    width: 120px;
    @media (max-width: 700px) {
      height: 60px;
      width: 60px;
    }
  }
  & > div:first-child {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 0.24rem;
  }
  & > div:nth-child(2) {
    /* border: 1px solid blue; */
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.6rem;

    & p:first-child {
      color: white;
      font-size: 1.3rem;
      @media (max-width: 700px) {
        font-size: 2vw;
      }
    }
    & p:nth-child(2) {
      color: white;
      font-size: 2rem;
      font-weight: bold;
      @media (max-width: 700px) {
        font-size: 1.1rem;
      }
    }
  }
`;
const Middle = styled.div`
  /* border: 1px solid yellow; */
  border-bottom: 1px solid var(--simple-dark-blue);
  height: 286.86px;
  /* min-height: 200px; */
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1.6rem;
  padding: 1.5rem 0rem 1.5rem 1.5rem;
  padding-right: 0.8rem;

  & > section {
    width: 100%;
  }
`;
const Bottom = styled.div`
  /* border: 1px solid green; */
  height: 166.6px;
  padding: 40px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 1.5rem 0.8rem 1.5rem 1.5rem;
  gap: 0.4rem;
`;
const NavButton = styled(Link)`
  text-decoration: none;
  color: #a8acb4;
  font-size: 0.704rem;
  font-weight: 400;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.7rem;
  cursor: pointer;

  padding-right: 8px;
  padding-left: 8px;
  padding-top: 4px;
  padding-bottom: 4px;
  height: 36px;
  border-radius: 6px;
  width: 100%;

  &:focus {
    background-color: #2c3039;
    outline: none;
  }
  &:hover {
    background-color: #2c303997;
  }
  & p {
    @media (max-width: 700px) {
      display: none;
    }
  }
`;
const SignOutButton = styled.button`
  text-decoration: none;
  color: #a8acb4;
  font-size: 0.704rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.7rem;
  cursor: pointer;
  background: none;
  border: none;
  padding-right: 8px;
  padding-left: 8px;
  padding-top: 4px;
  padding-bottom: 4px;

  &:hover {
    color: rgb(255, 255, 255, 0.4);
  }
  & p {
    @media (max-width: 700px) {
      display: none;
    }
  }
`;

const UpgradeButton = styled(Link)`
  text-decoration: none;
  border: 1.4px solid #009ed2;
  padding: 0.5em 1em 0.5em 1em;
  font-size: 14px;
  color: #009dd2;
  border-radius: 0.4rem;
  font-weight: 500;
  transition: background-color 0.4s linear;

  &:hover {
    background-color: #009ed249;
  }
`;

export default Navbar;
