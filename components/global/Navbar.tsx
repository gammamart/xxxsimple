import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";

import { userActions } from "@/redux_store/store";
import ProfileAvatar from "@/public/statics/images/profileAvatar";
import { MdOutlineFeedback, MdLogout } from "react-icons/md";
import { CiWallet, CiHeadphones } from "react-icons/ci";
import instance from "@/axios";
import requests from "@/requests";
import { BsEmojiSunglasses, BsSend, BsClockHistory } from "react-icons/bs";
import { VscVerifiedFilled } from "react-icons/vsc";
import { GoReport } from "react-icons/go";
import { GiChewedSkull } from "react-icons/gi";
import { FaGhost } from "react-icons/fa6";
import { MdOutlineCardMembership } from "react-icons/md";
import { PiShieldCheck } from "react-icons/pi";

const Navbar = () => {
  type Profile = {
    wallet_balance: number;
    user: number;
    [key: string]: any;
  };

  const [profile, setProfile] = useState<Profile | null>(null);
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

  console.log(profile);

  useEffect(() => {
    instance.get(requests.profile, headerConfig).then((response) => {
      setProfile(response.data);
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
      <Logo style={{ color: "#fff", marginTop: "2rem", marginLeft: "40px", fontSize: "20px", fontWeight: 600 }}>просто</Logo>
      <Up>
        {username !== "godofseller1" && <div>{verified ? <GiChewedSkull color="#fff" size={42} /> : <BsEmojiSunglasses color="#fff" size={40} />}</div>}
        {username === "godofseller1" && (
          <div>
            <FaGhost color="#fff" size={42} />
          </div>
        )}
        <div>
          {username && (
            <Username style={{ fontSize: "14px", color: "#fff", fontWeight: 600 }}>
              @{username}
              {verified && <VscVerifiedFilled size={18} color={username === "godofseller1" ? "#FFD700" : "#009DD2"} />}
            </Username>
          )}
          <p style={{ fontSize: "20px", color: "#fff", fontWeight: 600 }}>${profile?.wallet_balance.toFixed(2)}</p>
          {!verified && <UpgradeButton href={"../dashboard/upgrade"}>Upgrade</UpgradeButton>}
        </div>
      </Up>
      <Middle>
        <NavButton href="../dashboard" ref={sendButton}>
          <span>
            <BsSend color={"#fbfbfb"} size={16} />
          </span>{" "}
          <p>Send</p>
        </NavButton>
        <NavButton href="../dashboard/fund-wallet" ref={fundWalletButton}>
          <span>
            <CiWallet color={"#fbfbfb"} size={19} />
          </span>{" "}
          <p>Fund wallet</p>
        </NavButton>
        <NavButton href="../dashboard/history" ref={historyButton}>
          <span>
            <BsClockHistory color={"#fbfbfb"} size={16} />{" "}
          </span>
          <p>History</p>
        </NavButton>
        <NavButton href="../dashboard/upgrade" ref={contactUsButton}>
          <span>
            <PiShieldCheck color={"#fbfbfb"} size={20} />
          </span>{" "}
          <p>Membership</p>
        </NavButton>
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
      </Middle>
      <Bottom>
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

  @media (min-width: 1200px) {
    width: 234px;
  }
  @media (max-width: 700px) {
    width: 100px;
  }
`;
const Logo = styled.p`
  @media (max-width: 700px) {
    margin: 20px !important;
    font-size: 16px !important;
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
  height: 40%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;

  & img {
    /* border: 1px solid tomato; */
    height: 120px;
    width: 120px;
    @media (max-width: 700px) {
      height: 60px;
      width: 60px;
    }
  }
  & div:nth-child(2) {
    /* border: 1px solid blue; */
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2rem;

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
  height: 45%;
  min-height: 200px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1.2rem;
  padding: 20px 20px 20px 40px;
`;
const Bottom = styled.div`
  /* border: 1px solid green; */
  height: 20%;
  padding: 40px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;
const NavButton = styled(Link)`
  text-decoration: none;
  color: #a8acb4;
  font-size: 0.88rem;
  font-weight: 400;
  display: flex;
  flex-direction: row;
  align-items: center;
  /* justify-content: space-between; */
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
  font-size: 0.88rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1rem;
  cursor: pointer;
  background: none;
  border: none;

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
