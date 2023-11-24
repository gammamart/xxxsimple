import React from "react";
import styled from "styled-components";

const maintainace = () => {
  return (
    <Mainframe>
      <Frame>
    <p style={{color:"#009DD2"}}>
        <strong>[npocto] Notice: Software Transition to Private Access</strong>
    </p>
    <p>Our software is transitioning to private and invite-only access to uphold the quality we're known for. We appreciate your understanding and support during this period of enhancement.</p>
    <p>We apologize for any temporary inconvenience this may cause, but we assure you it will be worth it. Your patience and support mean the world to us.</p>
    
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
