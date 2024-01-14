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

const HistoryCard: f <HistoryCardProps> = ({ id, status, job_type, failure_message, date }) => {
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
  const halfTimeAgo = momentObject.subtract(momentObject.diff(moment(), 'milliseconds') / 2).fromNow();

  const status_color: Record<string, string> = {
    FAILED: "#ff0101a0",
    COMPLETED: "#1aa14e87",
    PREPARING: "#ffa20182",
    SENDING: "#009ed28c",
  };

  const status_animation: Record<string, any> = {
    PREPARING: <Lottie options={preparingAnimationOptions} width={30} height={60} />,
    SENDING: <Lottie options={sendingAnimationOptions} width={85} height={100} />,
  };


  return (
    <Mainframe>
      <TableSmallBox>
        <p style={{ fontSize: "14px", }}>{v4().slice(0,4)} </p>
      </TableSmallBox>
      <TableSmallBox>
        <p style={{ fontSize: "14px" }}>
          <Status status={status_color[`${status.replace(" ", "_")}`]}>{status}</Status>
        </p>
      </TableSmallBox>
      <TableSmallBox style={{marginLeft: "1rem"}}>
        <p style={{ fontSize: "14px", color: "#fff" }}>{job_type} </p>
      </TableSmallBox>
      <TableSmallBox>
        <p style={{ fontSize: "14px" }}>{halfTimeAgo} </p>
      </TableSmallBox>

      <TableSmallBox>
        <p style={{ fontSize: "10px", color: "#fff", width: "150px" }}>{failure_message === "UNNAMED" ? "No message" : failure_message}</p>
      </TableSmallBox>
    </Mainframe>
  );
};

type StatusProps = {
  status: string;
};

const Mainframe = styled.tr`
  border-bottom: 1px solid #d4e4fe31;
  width: 100% !important;
  padding-right: 20px;
  padding-left: 20px;
  padding-bottom: 20px;
  display: flex;
  flex-direction: row;
  height: 2.5rem !important;
  align-items: center;
  /* justify-content: space-between; */
  font-size: 18px;
  color: #fff;
  /* flex: 1; */
  /* height: 50px; */

  & p {
    color: #ffffffa6;
    overflow: hidden;
    text-overflow: ellipsis;
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
