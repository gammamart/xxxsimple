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
    <Mainframe className="vintage-sidemenu">
      <h3>Dashboard Menu</h3>
      <UserInfo>
        <div>
          <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
            {username && (
              <Username>
                @{username}
                {verified && <VscVerifiedFilled size={14} color={membership === "Private" ? "#FFD700" : "#009DD2"} />}
              </Username>
            )}
          </span>
          {!verified && <UpgradeButton href={"../dashboard/upgrade"}>Upgrade</UpgradeButton>}
        </div>
        <div>
          <MembershipBadge membership={membership}>
            <MembershipIcon>
              {membership !== "Private" && (verified ? <GiChewedSkull color="#2c2c2c" size={16} /> : <BsEmojiSunglassesFill color="#2c2c2c" size={16} />)}
              {membership === "Private" && <FaGhost color="#2c2c2c" size={16} />}
            </MembershipIcon>
            <MembershipText membership={membership}>{membership}</MembershipText>
          </MembershipBadge>
        </div>
        <div style={{ alignSelf: "center" }}>{profileIsLoading ? <LoadingAnimation /> : <Balance>${profile?.wallet_balance.toFixed(2)}</Balance>}</div>
      </UserInfo>
      <Section>
        <SectionTitle>GENERAL</SectionTitle>
        <NavButton href="../dashboard" ref={sendButton}>
          <span>
            <BsSendArrowUp color={"#2c2c2c"} size={16} />
          </span>{" "}
          <p>Send</p>
        </NavButton>
        <NavButton href="../dashboard/history" ref={historyButton}>
          <span>
            <BsClockHistory color={"#2c2c2c"} size={16} />{" "}
          </span>
          <p>History</p>
        </NavButton>
      </Section>
      <Section>
        <SectionTitle>BILLING</SectionTitle>
        <NavButton href="../dashboard/fund-wallet" ref={fundWalletButton}>
          <span>
            <CiWallet color={"#2c2c2c"} size={19} />
          </span>{" "}
          <p>Fund wallet</p>
        </NavButton>
        <NavButton href="../dashboard/upgrade" ref={contactUsButton}>
          <span>
            <PiShieldCheck color={"#2c2c2c"} size={20} />
          </span>{" "}
          <p>Membership</p>
        </NavButton>
      </Section>
      <Section>
        <SectionTitle>OTHERS</SectionTitle>
        <NavButton href="../dashboard/improvement" ref={contactUsButton}>
          <span>
            <GoReport color={"#2c2c2c"} size={18} />
          </span>{" "}
          <p>Feedback</p>
        </NavButton>
        <NavButton href="../dashboard/contact" ref={contactUsButton}>
          <span>
            <CiHeadphones color={"#2c2c2c"} size={18} />
          </span>{" "}
          <p>Contact us</p>
        </NavButton>
        <SignOutButton onClick={logoutHandler}>
          <MdLogout color={"#2c2c2c"} size={18} /> <p>Sign Out</p>
        </SignOutButton>
      </Section>
    </Mainframe>
  );
};

const Mainframe = styled.div`
  width: 300px;
  padding: 12px;
  border-right: 1px solid #bdb9ad;
  display: flex;
  flex-direction: column;
  gap: 8px;
  background: linear-gradient(180deg, #f4f2ea 0%, #e7e4da 100%);

  @media (max-width: 768px) {
    width: 100vw;
    max-width: 100vw;
    border-right: none;
    border-bottom: 1px solid #bdb9ad;
    padding: 8px 12px;
    gap: 6px;
  }

  & h3 {
    margin: -12px -12px 8px -12px;
    padding: 10px 12px;
    font-family: Verdana, Arial, Helvetica, sans-serif;
    font-size: 12px;
    letter-spacing: 0.4px;
    text-transform: uppercase;
    color: #213a60;
    background: linear-gradient(180deg, #dcd8cc 0%, #cfcabf 100%);
    border-bottom: 1px solid #b7b2a6;

    @media (max-width: 768px) {
      margin: -8px -12px 6px -12px;
      padding: 8px 12px;
      font-size: 11px;
    }
  }
`;
const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 10px 12px;
  background: linear-gradient(180deg, #f7f5ef 0%, #ece9df 100%);
  border: 1px solid #d5d1c7;
  border-radius: 2px;
  box-shadow: 0 1px 0 #fff inset;
  margin-bottom: 8px;

  @media (max-width: 768px) {
    padding: 8px 10px;
    gap: 8px;
    margin-bottom: 6px;
  }

  & > div:first-child {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 8px;

    @media (max-width: 768px) {
      gap: 6px;
    }
  }
  & > div:nth-child(2) {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;

    @media (max-width: 768px) {
      gap: 6px;
    }
  }
`;

const Username = styled.span`
  display: flex;
  align-items: center;
  gap: 4px;
  font-family: Verdana, Arial, Helvetica, sans-serif;
  font-size: 12px;
  color: #2c2c2c;
  font-weight: 600;

  @media (max-width: 768px) {
    font-size: 11px;
    gap: 3px;
  }
`;

const Balance = styled.p`
  font-family: Verdana, Arial, Helvetica, sans-serif;
  font-size: 14px;
  color: #1e2c45;
  font-weight: 600;

  @media (max-width: 768px) {
    font-size: 13px;
  }
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 12px;

  @media (max-width: 768px) {
    gap: 6px;
    margin-bottom: 8px;
  }
`;

const SectionTitle = styled.p`
  font-family: Verdana, Arial, Helvetica, sans-serif;
  font-size: 12px;
  font-weight: 600;
  color: #213a60;
  margin-bottom: 4px;
  text-transform: uppercase;
  letter-spacing: 0.4px;

  @media (max-width: 768px) {
    font-size: 11px;
    margin-bottom: 3px;
    letter-spacing: 0.3px;
  }
`;
const NavButton = styled(Link)`
  display: block;
  padding: 10px 12px;
  color: #2c2c2c;
  text-decoration: none;
  font-family: Verdana, Arial, Helvetica, sans-serif;
  font-size: 12px;
  background: linear-gradient(180deg, #f7f5ef 0%, #ece9df 100%);
  border: 1px solid #d5d1c7;
  border-radius: 2px;
  box-shadow: 0 1px 0 #fff inset;
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;

  @media (max-width: 768px) {
    padding: 8px 10px;
    font-size: 11px;
    gap: 6px;
  }

  &:focus {
    background: linear-gradient(180deg, #edeae1 0%, #e5e1d7 100%);
    outline: none;
  }
  &:hover {
    background: linear-gradient(180deg, #edeae1 0%, #e5e1d7 100%);
    text-decoration: underline;
  }
  & p {
    margin: 0;
    font-family: Verdana, Arial, Helvetica, sans-serif;
    font-size: 12px;
    color: #2c2c2c;

    @media (max-width: 768px) {
      font-size: 11px;
    }
  }
`;

const SignOutButton = styled.button`
  display: block;
  padding: 10px 12px;
  color: #2c2c2c;
  text-decoration: none;
  font-family: Verdana, Arial, Helvetica, sans-serif;
  font-size: 12px;
  background: linear-gradient(180deg, #f7f5ef 0%, #ece9df 100%);
  border: 1px solid #d5d1c7;
  border-radius: 2px;
  box-shadow: 0 1px 0 #fff inset;
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  width: 100%;

  @media (max-width: 768px) {
    padding: 8px 10px;
    font-size: 11px;
    gap: 6px;
  }

  &:hover {
    background: linear-gradient(180deg, #edeae1 0%, #e5e1d7 100%);
    text-decoration: underline;
  }
  & p {
    margin: 0;
    font-family: Verdana, Arial, Helvetica, sans-serif;
    font-size: 12px;
    color: #2c2c2c;

    @media (max-width: 768px) {
      font-size: 11px;
    }
  }
`;

const UpgradeButton = styled(Link)`
  text-decoration: none;
  border: 1px solid #b89a45;
  padding: 2px 6px;
  font-size: 12px;
  color: #1e2c45;
  border-radius: 2px;
  font-weight: 500;
  font-family: Verdana, Arial, Helvetica, sans-serif;
  background: linear-gradient(180deg, #e9c86f 0%, #b7923a 55%, #8e6e29 100%);
  box-shadow: 0 1px 0 #fff inset, 0 2px 0 #6b5a35, 0 6px 12px rgba(0, 0, 0, 0.25);
  transition: filter 0.2s linear;

  @media (max-width: 768px) {
    padding: 2px 5px;
    font-size: 11px;
  }

  &:hover {
    filter: brightness(1.05);
    text-decoration: none;
  }
`;

type MembershipBadgeProps = {
  membership: string;
};

const MembershipBadge = styled.div<MembershipBadgeProps>`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 10px;
  border-radius: 3px;
  border: 1px solid
    ${({ membership }) => {
      switch (membership) {
        case "Private":
          return "#8B4513";
        case "Pro":
          return "#4B0082";
        case "API":
          return "#006400";
        default:
          return "#708090";
      }
    }};
  background: ${({ membership }) => {
    switch (membership) {
      case "Private":
        return "linear-gradient(180deg, #DAA520 0%, #B8860B 50%, #8B4513 100%)";
      case "Pro":
        return "linear-gradient(180deg, #9370DB 0%, #8A2BE2 50%, #4B0082 100%)";
      case "API":
        return "linear-gradient(180deg, #32CD32 0%, #228B22 50%, #006400 100%)";
      default:
        return "linear-gradient(180deg, #F5F5F5 0%, #D3D3D3 50%, #708090 100%)";
    }
  }};
  box-shadow: 0 1px 0 #fff inset, 0 1px 2px rgba(0, 0, 0, 0.1);
  font-family: Verdana, Arial, Helvetica, sans-serif;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;

  @media (max-width: 768px) {
    padding: 4px 8px;
    font-size: 10px;
    gap: 4px;
  }
`;

const MembershipIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const MembershipText = styled.span<MembershipBadgeProps>`
  color: ${({ membership }) => {
    switch (membership) {
      case "Private":
        return "#FFF8DC";
      case "Pro":
        return "#FFFFFF";
      case "API":
        return "#FFFFFF";
      default:
        return "#2F4F4F";
    }
  }};
  font-weight: 700;
  text-shadow: 0 1px 1px rgba(0, 0, 0, 0.3);
`;

export default Navbar;
