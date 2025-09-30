import React from "react";
import styled from "styled-components";

const maintainace = () => {
  return (
    <Mainframe>
      <Frame>
        <p style={{ color: "#b89a45", fontSize: "16px", fontWeight: "700" }}>
          <strong>Subject: A Crucial Upgrade Begins: A New Dawn for Our Service</strong>
        </p>
        <p style={{ fontSize: "14px" }}>
          The time has come for a transformation. Starting now until tomorrow, we embark on a vital upgrade journey that will temporarily pause our service. This isn&apos;t just maintenance<b style={{ color: "#b89a45" }}>—it&apos;s a rebirth.</b>
        </p>
        <p style={{ fontSize: "14px" }}>We&apos;re doubling our server strength, paving the way for unparalleled performance and safeguarding your privacy like never before.</p>
        <p style={{ fontSize: "14px" }}>Though a brief silence will follow, what awaits is a brighter, faster, and more secure experience.</p>
        <p style={{ fontSize: "14px" }}>Thank you for your patience as we elevate our service to new heights.</p>
        <p style={{ fontSize: "14px", fontStyle: "italic" }}>
          In unity, <br />
          [просто]
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
  min-height: 100vh;
  width: 100vw;
  background: linear-gradient(180deg, #d9dde3 0%, #c9ced6 40%, #b6bcc6 100%);
  background-attachment: fixed;
  padding: 2rem;
  gap: 2rem;

  @media (max-width: 768px) {
    padding: 1rem;
    gap: 1.5rem;
  }

  @media (max-width: 480px) {
    padding: 0.5rem;
    gap: 1rem;
  }
`;
const Frame = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 800px;
  width: 100%;
  padding: 40px;
  background: linear-gradient(180deg, #fbfaf6 0%, #f0eee7 100%);
  border: 1px solid #c5c1b7;
  box-shadow: 0 1px 0 #fff inset, 0 8px 18px rgba(0, 0, 0, 0.35);
  border-radius: 2px;
  gap: 1.5rem;
  color: #2c2c2c;
  font-family: Verdana, Arial, Helvetica, sans-serif;
  line-height: 1.6;
  text-align: center;

  @media (max-width: 768px) {
    padding: 24px;
    gap: 1.2rem;
    max-width: 95%;
  }

  @media (max-width: 480px) {
    padding: 16px;
    gap: 1rem;
    max-width: 98%;
  }
`;

export default maintainace;
