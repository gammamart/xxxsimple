import React from "react";
import styled from "styled-components";

const maintainace = () => {
  return (
    <Mainframe>
      <Frame>
        <p style={{ color: "#009DD2" }}>
          <strong>Subject: A Crucial Upgrade Begins: A New Dawn for Our Service</strong>
        </p>
        <p>
          The time has come for a transformation. Starting now until tomorrow, we embark on a vital upgrade journey that will temporarily pause our service. This isn&apos;t just maintenance<b style={{ color: "#009DD2" }}>—it's a rebirth.</b>
        </p>
        <p>We&apos;re doubling our server strength, paving the way for unparalleled performance and safeguarding your privacy like never before.</p>
        <p>Though a brief silence will follow, what awaits is a brighter, faster, and more secure experience.</p>
        <p>Thank you for your patience as we elevate our service to new heights.</p>
        <p>
          In unity, <br />
          [Your Company Name]
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
