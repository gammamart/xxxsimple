import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";
import Link from "next/link";

import { InformationBox } from "@/pages/dashboard";

const NavigationBar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    try {
      if (typeof localStorage !== "undefined") {
        const user = localStorage.getItem("user");
        setIsLoggedIn(!!user);
      }
    } catch (e) {}
  }, []);

  const isHome = router && (router.pathname === "/" || router.asPath === "/");

  return (
    <>
      <TopBar>
        <Logo>просто</Logo>
        <NavLinks>
          <StyledLink href="/">Home</StyledLink>
          {(isHome || !isLoggedIn) && <StyledLink href="/getIn">Login</StyledLink>}
          {(isHome || !isLoggedIn) && <StyledLink href="/register">Register</StyledLink>}
          <StyledLink href="/contact">Contact</StyledLink>
        </NavLinks>
      </TopBar>
      <SubBar>
        <span>Secure Area</span>
        <span>SSL Enabled</span>
      </SubBar>
      {(isHome || !isLoggedIn) && <InformationBox style={{ width: "100%" }}>Use on computer for best experience</InformationBox>}
      {/* TRAFFFICE NOTIFICATION */}
      {/* <InformationBox style={{ width: "100%", backgroundColor: "#ca8107" }}>
        Due to the high amount of traffic, our team is working on scaling the system while the application is still working, this may make some users experience difficulty logging in to their accounts.{" "}
        <Link href="/contact" style={{ color: "var(--simple-blue)" }}>
          Contact support if you&apos;re having this issue.
        </Link>{" "}
      </InformationBox> */}
      {/* {(isHome || !isLoggedIn) && ( */}
      <InformationBox style={{ width: "100%", backgroundColor: "#3b6e2a" }}>
        The system upgrade has been successfully completed, and all features are now fully operational. We appreciate your patience during this process. If you encounter any lingering issues or have any questions, please don&apos;t hesitate to reach out to our support team.
      </InformationBox>
      {/* )} */}
    </>
  );
};
const TopBar = styled.div`
  height: 64px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-left: 16px;
  padding-right: 16px;
  width: 100%;
  max-width: 100vw;
  background: linear-gradient(180deg, #1d3d6a 0%, #122a49 100%);
  border-top: 1px solid #2b507f;
  border-bottom: 1px solid #0b1b31;
  box-shadow: 0 1px 0 #274b79 inset, 0 -1px 0 #0a172a inset, 0 6px 14px rgba(0, 0, 0, 0.25);

  @media (max-width: 768px) {
    padding-left: 12px;
    padding-right: 12px;
    height: 56px;
    width: 100vw;
    max-width: 100vw;
    margin-left: 0;
    margin-right: 0;
  }
`;
const Logo = styled.p`
  color: #f5f2e7;
  font-size: 24px;
  font-weight: 700;
  letter-spacing: 0.5px;
  font-family: "Times New Roman", Times, Georgia, "Book Antiqua", serif;
  text-shadow: 0 1px 0 #0a172a;

  @media (max-width: 768px) {
    font-size: 20px;
  }
`;
const NavLinks = styled.nav`
  display: flex;
  gap: 16px;

  @media (max-width: 768px) {
    gap: 8px;
  }

  @media (max-width: 480px) {
    gap: 4px;
  }
`;
const StyledLink = styled(Link)`
  color: #e6eaf2;
  text-decoration: none;
  font-family: Verdana, Arial, Helvetica, sans-serif;
  font-size: 12px;
  padding: 6px 10px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.1) 0%, rgba(0, 0, 0, 0.1) 100%);
  box-shadow: 0 1px 0 rgba(255, 255, 255, 0.15) inset;
  border-radius: 2px;

  @media (max-width: 768px) {
    font-size: 11px;
    padding: 4px 8px;
  }

  @media (max-width: 480px) {
    font-size: 10px;
    padding: 3px 6px;
  }

  &:hover {
    color: #ffffff;
    text-decoration: underline;
    background: linear-gradient(180deg, rgba(255, 255, 255, 0.16) 0%, rgba(0, 0, 0, 0.1) 100%);
  }
`;
const SubBar = styled.div`
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-left: 16px;
  padding-right: 16px;
  width: 100%;
  max-width: 100vw;
  background: #004d1a;
  border-bottom: 1px solid #c6c2b6;
  color: rgb(0, 0, 0);
  font-family: Verdana, Arial, Helvetica, sans-serif;
  font-size: 11px;
  margin-bottom: 0;

  @media (max-width: 768px) {
    padding-left: 12px;
    padding-right: 12px;
    font-size: 10px;
    height: 24px;
    width: 100vw;
    max-width: 100vw;
    margin-left: 0;
    margin-right: 0;
  }

  @media (max-width: 480px) {
    padding-left: 8px;
    padding-right: 8px;
    font-size: 9px;
    height: 22px;
  }
`;

export default NavigationBar;
