import React from "react";
import styled from "styled-components";

const HistoryCard = () => {
  const status: number = 0;

  return (
    <Mainframe>
      <Up>
        <p>
          <b>ID</b> 892D92HFC9FH98WYW8F8{" "}
        </p>
        <p>
          <b>Amount of contacts:</b> 3000{" "}
        </p>
      </Up>
      <Bottom>
        <p>
          <b>Date:</b> Today{" "}
        </p>
        <p>
          <b>Status:</b> <Status status={status}>Ongoing</Status>
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
  width: 500px !important;
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
  color: ${({ status }) => (status ? "#1AA14E" : "#FFA201")};
`;

export default HistoryCard;
