import React from "react";
import styled from "styled-components";
import Lottie from "react-lottie";
import moment from "moment";
import { v4 } from "uuid";
import * as preparingAnimation from "../../public/statics/animations/preparing.json";
import * as sendingAnimation from "../../public/statics/animations/sending.json";

interface HistoryCardProps {
  id: number;
  status: string;
  job_type: string;
  failure_message: string;
  date: string;
}

// lottie preparing animation configuration
const preparingAnimationOptions = {
  loop: true,
  autoplay: true,
  animationData: preparingAnimation,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

const sendingAnimationOptions = {
  loop: true,
  autoplay: true,
  animationData: sendingAnimation,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

const HistoryCard: React.FC<HistoryCardProps> = ({ id, status, job_type, failure_message, date }) => {
  interface STATUS_COLOR {
    FAILED: string;
    COMPLETED: string;
    PREPARING: string;
    SENDING: string;
  }
  // const status: number = 0;
  const originalDate = date;
  const momentObject = moment(originalDate);
  const timeAgo = moment(originalDate).fromNow();

  // x2 time achieved by halving the value of the original time ago
  const halfTimeAgo = momentObject.subtract(momentObject.diff(moment(), "milliseconds") / 2).fromNow();

  const status_color: Record<string, string> = {
    FAILED: "#8e1b1b",
    COMPLETED: "#4b8a3c",
    PREPARING: "#b89a45",
    SENDING: "#2c5a2c",
  };

  const status_animation: Record<string, any> = {
    PREPARING: <Lottie options={preparingAnimationOptions} width={30} height={60} />,
    SENDING: <Lottie options={sendingAnimationOptions} width={85} height={100} />,
  };

  return (
    <Mainframe>
      <TableSmallBox>
        <p style={{ fontSize: "14px", color: "#2c2c2c" }}>{v4().slice(0, 4)} </p>
      </TableSmallBox>
      <TableSmallBox>
        <p style={{ fontSize: "14px" }}>
          <Status status={status_color[`${status.replace(" ", "_")}`]}>{status}</Status>
        </p>
      </TableSmallBox>
      <TableSmallBox style={{ marginLeft: "1rem" }}>
        <p style={{ fontSize: "14px", color: "#2c2c2c" }}>{job_type} </p>
      </TableSmallBox>
      <TableSmallBox>
        <p style={{ fontSize: "14px", color: "#2c2c2c" }}>{halfTimeAgo} </p>
      </TableSmallBox>

      <TableSmallBox>
        <p style={{ fontSize: "10px", color: "#2c2c2c", width: "150px" }}>{failure_message === "UNNAMED" ? "No message" : failure_message}</p>
      </TableSmallBox>
    </Mainframe>
  );
};

type StatusProps = {
  status: string;
};

const Mainframe = styled.tr`
  border-bottom: 1px solid #c5c1b7;
  width: 100% !important;
  padding-right: 20px;
  padding-left: 20px;
  padding-bottom: 20px;
  display: flex;
  flex-direction: row;
  height: 2.5rem !important;
  align-items: center;
  font-size: 18px;
  color: #2c2c2c;
  background: linear-gradient(180deg, #fbfaf6 0%, #f0eee7 100%);
  border-radius: 2px;
  margin-bottom: 4px;
  box-shadow: 0 1px 0 #fff inset;

  @media (max-width: 768px) {
    padding-right: 16px;
    padding-left: 16px;
    padding-bottom: 16px;
    height: 2.2rem !important;
  }

  & p {
    color: #2c2c2c;
    overflow: hidden;
    text-overflow: ellipsis;
    font-family: Verdana, Arial, Helvetica, sans-serif;
    font-weight: 500;
  }
`;

const Status = styled.span<StatusProps>`
  color: ${({ status }) => status};
`;
const TableSmallBox = styled.span`
  /* border: 1px solid red; */
  flex: 1;
  /* display: flex; */
`;

export default HistoryCard;
