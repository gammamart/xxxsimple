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
        <IdText>{v4().slice(0, 4)}</IdText>
      </TableSmallBox>
      <TableSmallBox>
        <StatusText>
          <Status status={status_color[`${status.replace(" ", "_")}`]}>{status}</Status>
        </StatusText>
      </TableSmallBox>
      <TableSmallBox>
        <TypeText>{job_type}</TypeText>
      </TableSmallBox>
      <TableSmallBox>
        <TimeText>{halfTimeAgo}</TimeText>
      </TableSmallBox>
      <TableSmallBox>
        <MessageText>{failure_message === "UNNAMED" ? "No message" : failure_message}</MessageText>
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
  padding: 12px 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: 18px;
  color: #2c2c2c;
  background: linear-gradient(180deg, #fbfaf6 0%, #f0eee7 100%);
  border-radius: 2px;
  margin-bottom: 4px;
  box-shadow: 0 1px 0 #fff inset;
  min-width: 600px;
  gap: 8px;

  @media (max-width: 768px) {
    padding: 10px 16px;
    min-width: 500px;
    gap: 6px;
  }

  @media (max-width: 480px) {
    padding: 8px 12px;
    min-width: 450px;
    gap: 4px;
    flex-wrap: wrap;
    min-height: auto;
  }

  & p {
    color: #2c2c2c;
    overflow: hidden;
    text-overflow: ellipsis;
    font-family: Verdana, Arial, Helvetica, sans-serif;
    font-weight: 500;
    margin: 0;
    white-space: nowrap;

    @media (max-width: 768px) {
      font-size: 13px;
    }

    @media (max-width: 480px) {
      font-size: 12px;
    }
  }
`;

const Status = styled.span<StatusProps>`
  color: ${({ status }) => status};
`;
const TableSmallBox = styled.span`
  flex: 1;
  display: flex;
  align-items: center;
  min-width: 0;

  @media (max-width: 480px) {
    flex: 0 0 auto;
    min-width: 80px;

    &:nth-child(1) {
      min-width: 60px;
    } /* ID */
    &:nth-child(2) {
      min-width: 80px;
    } /* Status */
    &:nth-child(3) {
      min-width: 70px;
    } /* Type */
    &:nth-child(4) {
      min-width: 90px;
    } /* Time */
    &:nth-child(5) {
      min-width: 100px;
    } /* Message */
  }
`;

const IdText = styled.p`
  font-size: 14px;
  color: #2c2c2c;
  font-weight: 600;

  @media (max-width: 768px) {
    font-size: 13px;
  }

  @media (max-width: 480px) {
    font-size: 11px;
  }
`;

const StatusText = styled.p`
  font-size: 14px;
  font-weight: 600;

  @media (max-width: 768px) {
    font-size: 13px;
  }

  @media (max-width: 480px) {
    font-size: 11px;
  }
`;

const TypeText = styled.p`
  font-size: 14px;
  color: #2c2c2c;
  font-weight: 500;

  @media (max-width: 768px) {
    font-size: 13px;
  }

  @media (max-width: 480px) {
    font-size: 11px;
  }
`;

const TimeText = styled.p`
  font-size: 14px;
  color: #2c2c2c;
  font-weight: 500;

  @media (max-width: 768px) {
    font-size: 13px;
  }

  @media (max-width: 480px) {
    font-size: 11px;
  }
`;

const MessageText = styled.p`
  font-size: 12px;
  color: #2c2c2c;
  font-weight: 400;
  max-width: 150px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  @media (max-width: 768px) {
    font-size: 11px;
    max-width: 120px;
  }

  @media (max-width: 480px) {
    font-size: 10px;
    max-width: 100px;
  }
`;

export default HistoryCard;
