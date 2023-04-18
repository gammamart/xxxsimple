import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";

import { userActions } from "@/redux_store/store";
import ProfileAvatar from "@/public/statics/images/profileAvatar";
import { IoMdSend } from "react-icons/io";
import { MdHistory, MdCall, MdLogout } from "react-icons/md";
import { FaWallet } from "react-icons/fa";
import instance from "@/axios";
import requests from "@/requests";

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
    instance.get(requests.profile, headerConfig).then((response) => setProfile(response.data));
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
      <Up>
        <div>
          <ProfileAvatar />
        </div>
        <div>
          {/* {username && <p>{username}</p>} */}
          <p>${profile?.wallet_balance}</p>
        </div>
      </Up>
      <Middle>
        <NavButton href="../dashboard" ref={sendButton}>
          <IoMdSend size={28} /> <p>Send</p>
        </NavButton>
        <NavButton href="../dashboard/fund-wallet" ref={fundWalletButton}>
          <FaWallet size={28} /> <p>Fund wallet</p>
        </NavButton>
        <NavButton href="../dashboard/history" ref={historyButton}>
          <MdHistory size={28} /> <p>History</p>
        </NavButton>
        <NavButton href="../dashboard/contact" ref={contactUsButton}>
          <MdCall size={28} /> <p>Contact us</p>
        </NavButton>
      </Middle>
      <Bottom>
        <SignOutButton onClick={logoutHandler}>
          <MdLogout size={28} /> <p>Sign Out</p>
        </SignOutButton>
      </Bottom>
    </Mainframe>
  );
};

const Mainframe = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  width: 550px;
  height: 100%;
  max-height: 900px;

  @media (min-width: 1200px) {
    width: 550px;
  }
  @media (max-width: 700px) {
    width: 100px;
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
  height: 40%;
  min-height: 200px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  /* gap: 3.5rem; */
  justify-content: space-between;
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
  color: rgb(255, 255, 255, 0.7);
  font-size: 1.1rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1rem;
  cursor: pointer;

  &:focus {
    color: var(--simple-blue);
    outline: none;
  }
  & p {
    @media (max-width: 700px) {
      display: none;
    }
  }
`;
const SignOutButton = styled.button`
  text-decoration: none;
  color: rgb(255, 255, 255, 0.7);
  font-size: 1.2rem;
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

export default Navbar;
