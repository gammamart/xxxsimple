import React from "react";
import styled from "styled-components";
import Lottie from "react-lottie";
import moment from "moment";
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
  const timeAgo = moment(originalDate).fromNow();

  const status_color: Record<string, string> = {
    FAILED: "#ff0101",
    COMPLETED: "#1AA14E",
    PREPARING: "#FFA201",
    SENDING: "#009DD2",
  };

  const status_animation: Record<string, any> = {
    PREPARING: <Lottie options={preparingAnimationOptions} width={30} height={60} />,
    SENDING: <Lottie options={sendingAnimationOptions} width={85} height={100} />,
  };

  return (
    <Mainframe>
      <Left>
        <p style={{ fontSize: "14px" }}>
          <b>ID</b> {id}{" "}
        </p>
        <p style={{ fontSize: "14px", color: "#fff" }}>
          <b>TYPE:</b> {job_type}{" "}
        </p>
        <p style={{ fontSize: "14px" }}>
          <b>Date:</b> {timeAgo}{" "}
        </p>
      </Left>
      <Right>
        <p style={{ fontSize: "14px" }}>
          <b>Status:</b> <Status status={status_color[`${status.replace(" ", "_")}`]}>{status}</Status>
        </p>
        <div>{status_animation[`${status.replace(" ", "_")}`]}</div>
      </Right>
      <p style={{ fontSize: "14px", color: "#009DD2" }}>
        <b>Status message:</b> {failure_message}
      </p>
    </Mainframe>
  );
};

type StatusProps = {
  status: string;
};

const Mainframe = styled.div`
  border: 1px solid rgba(255, 255, 255, 0.5);
  height: 120px;
  width: 580px !important;
  padding: 0.5em 1em 0.5em 1em;
  display: flex;
  flex-direction: row;
  /* align-items: center; */
  justify-content: space-around;
  /* gap: 2em; */
  font-size: 18px;
  color: #fff;

  & p {
    color: #ffffffa6;
  }
`;
const Left = styled.div`
  display: flex;
  /* align-items: center; */
  justify-content: space-between;
  flex-direction: column;
`;
const Right = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
  /* justify-content: center; */

  & > div {
    /* border: 1px solid tomato; */
    height: 100%;
  }
`;
const Status = styled.span<StatusProps>`
  color: ${({ status }) => status};
`;

export default HistoryCard;
