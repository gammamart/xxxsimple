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
      <InformationBox style={{width: "100%"}}>Use on computer for best experience</InformationBox>
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
