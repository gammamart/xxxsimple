import React from "react";
import styled from "styled-components";

const NavigationBar = () => {
  return (
    <Mainframe>
      <Logo>просто</Logo>
    </Mainframe>
  );
};
const Mainframe = styled.div`
	border-bottom: 1px solid white;
	height: 80px;
	display: flex;
	flex-direction: column;
	align-items: start;
	justify-content: center;
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