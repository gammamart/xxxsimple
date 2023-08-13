import React from "react";
import styled from "styled-components";
import moment from 'moment';
import { fail } from "assert";


const HistoryCard = ({id, status, job_type, date}) => {

  interface STATUS_COLOR {
    FAILED: string,
    COMPLETED: string,
    IN_PROGRESS: string,
  }
  // const status: number = 0;
  const originalDate = date;
  const timeAgo = moment(originalDate).fromNow();

  const status_color: STATUS_COLOR ={ 
    FAILED: "#ff0101",
    COMPLETED: "#1AA14E",
    IN_PROGRESS: "#FFA201",
  }

  return (
    <Mainframe>
      <Up>
        <p style={{fontSize: "14px"}}>
          <b>ID</b> {id}{" "}
        </p>
        <p style={{fontSize: "14px", color: "#009DD2"}}>
          <b>TYPE:</b> {job_type}{" "}
        </p>
      </Up>
      <Bottom>
        <p style={{fontSize: "14px"}}>
          <b>Date:</b> {timeAgo}{" "}
        </p>
        <p style={{fontSize: "14px"}}>
          <b>Status:</b> <Status status={status_color[`${status.replace(" ", "_")}`]}>{status}</Status>
        </p>
      </Bottom>
    </Mainframe>
  );
};

type StatusProps = {
  status: number
}

const Mainframe = styled.div`
  border: 1px solid rgba(255, 255, 255, 0.5);
  height: 120px;
  width: 580px !important;
  padding: 0.5em 1em 0.5em 1em;
  display: flex;
  flex-direction: column;
  /* align-items: center; */
  justify-content: space-around;
  /* gap: 2em; */
  font-size: 18px;
  color: #fff;
`;
const Up = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const Bottom = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const Status = styled.span<StatusProps>`
  color: ${({ status }) => (status)};
`;

export default HistoryCard;
