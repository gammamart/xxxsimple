import React from "react";
import styled from "styled-components";

const maintainace = () => {
  return (
    <Mainframe>
      <Frame>
    <p style={{color:"#009DD2"}}>
        <strong>[npocto] Maintenance Notice: Improving SMS Delivery, Downtime and User Anonymity</strong>
        <strong>Estimated time: 8hours</strong>
    </p>
    <p>We're conducting maintenance to enhance SMS delivery speed, ensure user anonymity, and minimize downtime. This will last approximately 8 hours, starting at 03:16
Monday, 19 February 2024 (GMT+3)
Time in Moscow, Russia.

</p>
    
</Frame>

    </Mainframe>
  );
};

const Mainframe = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
  padding-right: 2rem;
  padding-left: 2rem;
  color: white;
  gap: 2rem;
`;
const Frame = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
  padding-right: 4rem;
  padding-left: 4rem;
  color: white;
  gap: 2rem;
  /* min-width: ; */
`;

export default maintainace;
