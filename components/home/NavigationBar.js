import React from "react";
import styled from "styled-components";
import Link from "next/link";

import { InformationBox } from "@/pages/dashboard";

const NavigationBar = () => {
  return (
    <>
      <Mainframe>
        <Logo>просто</Logo>
        <Link href="/contact" style={{ color: "var(--simple-blue)" }}>
          Contact us
        </Link>
      </Mainframe>
      <InformationBox style={{ width: "100%" }}>Use on computer for best experience</InformationBox>
      {/* TRAFFFICE NOTIFICATION */}
      {/* <InformationBox style={{ width: "100%", backgroundColor: "#ca8107" }}>
        Due to the high amount of traffic, our team is working on scaling the system while the application is still working, this may make some users experience difficulty logging in to their accounts.{" "}
        <Link href="/contact" style={{ color: "var(--simple-blue)" }}>
          Contact support if you&apos;re having this issue.
        </Link>{" "}
      </InformationBox> */}
      <InformationBox style={{ width: "100%", backgroundColor: "#058f21" }}>The system upgrade has been successfully completed, and all features are now fully operational. We appreciate your patience during this process. If you encounter any lingering issues or have any questions, please don&apos;t hesitate to reach out to our support team.</InformationBox>
    </>
  );
};
const Mainframe = styled.div`
  border-bottom: 1px solid white;
  height: 80px;
  display: flex;
  flex-direction: row;
  align-items: start;
  justify-content: space-between;
  align-items: center;
  padding-left: 40px;
  padding-right: 40px;
  width: 100%;
`;
const Logo = styled.p`
  color: #fff;
  font-size: 26px;
  font-weight: 500;
`;

export default NavigationBar;
