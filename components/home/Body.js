import React from "react";
import styled from "styled-components";
import Link from "next/link";
import { BsFillCheckCircleFill, BsArrowRight } from "react-icons/bs";
import Banner1 from "@/public/statics/images/banner1";
import Banner2 from "@/public/statics/images/banner2";

const Body = () => {
  return (
    <Mainframe>
      <Left>
        <div>
          <p>
            Предоставление <br />
            прямой услуги
          </p>
        </div>
        <div>
          <BsFillCheckCircleFill size={22} color={"#000000b8"} />
          <p>мы легенда в сфере услуг, которые мы предоставляем.</p>
        </div>
        <ButtonFrame style={{display: 'flex', gap: '1.5rem'}}>
          <GetInButton>
            <Button href={'/getIn'}>
              <p style={{ fontSize: "17px" }}>GET IN</p>
              <BsArrowRight size={24} />
            </Button>
          </GetInButton>
          <GetInButton>
            <Button href={'/register'}>
              <p style={{ fontSize: "17px" }}>CREATE ACCOUNT</p>
              <BsArrowRight size={24} />
            </Button>
          </GetInButton>
        </ButtonFrame>
      </Left>
      <Right>
        {/* <div><Banner1 /></div> */}
        {/* <div><Banner2 /></div> */}
      </Right>
    </Mainframe>
  );
};

const Mainframe = styled.div`
  /* border: 1px solid blue; */
  height: calc(100% - 80px);
  width: 100%;
  display: flex;
  flex-direction: row;
  max-width: 1300px;
  /* justify-content: center; */
`;
const Left = styled.div`
  min-height: 100%;
  width: 55%;
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;
  padding-left: 40px;
  gap: 70px;
  margin-top: 3rem;

  @media (max-width: 1050px) {
    width: 100%;
  }

  & div:first-child {
    color: white;

    & > p {
      font-size: 30px;
      @media (max-width: 400px) {
        font-size: 26px;
      }
    }
  }
  & div:nth-child(2) {
    color: white;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 0.5rem;
    font-size: 1.2rem;

    & p {
      @media (max-width: 400px) {
        font-size: 1rem;
      }
    }
  }
  & div:nth-child(3) {
    color: blue;
  }
`;
const Right = styled.div`
  /* border: 1px solid blue; */
  height: 100%;
  width: 45%;
  display: flex;
  gap: 2rem;

  @media (max-width: 1050px) {
    display: none;
  }

  & div:first-child {
    /* border: 1px solid blue; */
    width: 60%;
    background-color: #fdfdfd;
    display: flex;
    align-items: center;
    overflow: hidden;
  }

  & div:nth-child(2) {
    /* border: 1px solid tomato; */
    width: 40%;
    background-color: #fdfdfd;
    display: flex;
    align-items: center;
    overflow: hidden;
  }
`;
const GetInButton = styled.div`
  border: 1px solid white;
  height: 55px;
  width: 280px;
  position: relative;

  @media (max-width: 400px) {
    width: 230px;
    height: 55px;
  }

  & button {
    width: 100%;
    height: 100%;
    background-color: white;
    position: absolute;
    bottom: 8px;
    left: 8px;
    display: flex;
    align-items: center;
    justify-content: space-around;
    border-radius: 0px;
    border: none;
    color: black;
    cursor: pointer;

    @media (max-width: 400px) {
      font-size: 16px;
    }

    &:hover {
      background-color: #c3bdbd;
    }
  }
`;
const Button = styled(Link)`
  width: 100%;
  height: 100%;
  background-color: white;
  position: absolute;
  bottom: 8px;
  left: 8px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  border-radius: 0px;
  border: none;
  color: black;
  cursor: pointer;
  text-decoration: none;
  font-weight: bold;

  @media (max-width: 400px) {
    font-size: 1rem;
  }

  &:hover {
    background-color: #c3bdbd;
  }
`;
const ButtonFrame = styled.div`
  @media (max-width: 800px) {
    flex-direction: column;
  }
`;

export default Body;
