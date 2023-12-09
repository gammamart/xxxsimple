import React from "react";
import styled from "styled-components";
import { GrServerCluster } from "react-icons/gr";
import { CiWallet, CiHeadphones } from "react-icons/ci";
import { VscServer } from "react-icons/vsc";

interface ServiceLoadProps {
  status: string;
}

const ServiceLoad: React.FC<ServiceLoadProps> = ({status}) => {

  const status_color: any = {
    LL: "#50e3c2",
    ML: "#ffcc4c",
    OL: "#ff3e3d",
  };

  const status_text: any = {
    LL: "Low Load",
    ML: "Moderate Load",
    OL: "Overloaded",
  };

  return (
    <Mainframe>
      <p style={{ color: "#fff", fontSize: "18px", fontWeight: 600 }}>Server</p>
      <section>
        <p style={{ color: "#a1a1a1", fontSize: "14px", fontWeight: 500 }}>Status</p>
        <section>
          <div>
            <VscServer size={20} color={`${status_color[status]}`} />
            <VscServer size={20} color={`${status_color[status]}`} />
            <VscServer size={20} color={`${status_color[status]}`} />
            {/* <CiHeadphones color={`${status_color[status]}`} size={18} /> */}
          </div>
          <p style={{ color: "#fff", fontSize: "14px", fontWeight: 500 }}>{status_text[status]}</p>
        </section>
      </section>
    </Mainframe>
  );
};

const Mainframe = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  flex: 1;
  /* border: 1px solid red; */
  /* margin-top: 1rem; */

  & > section {
    display: flex;
    /* border: 1px solid red; */
    align-items: flex-start;
    flex-direction: column;
    gap: 0.6rem;

    & > section {
      display: flex;
      gap: 0.5rem;
      /* border: 1px solid yellow; */

      & > div {
        display: flex;
        gap: 0.1rem;
        align-items: center;
      }
    }
  }
`;

export default ServiceLoad;
