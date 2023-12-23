import React from "react";
import styled from "styled-components";
import { GrServerCluster } from "react-icons/gr";
import Lottie from "react-lottie";
import * as lowAnimation from "../../public/statics/animations/low.json";
import * as moderateAnimation from "../../public/statics/animations/moderate.json";
import * as overloadedAnimation from "../../public/statics/animations/overloaded.json";

interface ServiceLoadProps {
  status: string;
}

const lowAnimationOptions = {
  loop: true,
  autoplay: true,
  animationData: lowAnimation,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

const moderateAnimationOptions = {
  loop: true,
  autoplay: true,
  animationData: moderateAnimation,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

const overloadedAnimationOptions = {
  loop: true,
  autoplay: true,
  animationData: overloadedAnimation,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

const ServiceLoad: React.FC<ServiceLoadProps> = ({ status }) => {
  const status_color: any = {
    LL: "#50e3c2",
    ML: "#ffcc4c",
    OL: "#ff3e3d",
  };

  const status_text: any = {
    LL: "Low Load: Smooth sailing",
    ML: "Moderate Load: Steady traffic",
    OL: "High Load: Expect delays",
  };

  const statusAnimation: any = {
    LL: <Lottie options={lowAnimationOptions} width={30} height={30} />,
    ML: <Lottie options={moderateAnimationOptions} width={30} height={30} />,
    OL: <Lottie options={overloadedAnimationOptions} width={30} height={30} />,
  };

  return (
    <Mainframe>
      <p style={{ color: "#fff", fontSize: "18px", fontWeight: 600 }}>Server</p>
      <section>
        <p style={{ color: "#a1a1a1", fontSize: "14px", fontWeight: 500 }}>Status</p>
        <section>
          <div>
            {statusAnimation[status]}
            <div style={{ display: "flex", flexDirection: "column", gap: '6px' }}>
              <div style={{display: 'flex', gap: '0.2rem'}}>
                <GrServerCluster size={18} color={`${status_color[status]}`} />
                <GrServerCluster size={18} color={`${status_color[status]}`} />
                <GrServerCluster size={18} color={`${status_color[status]}`} />
                <GrServerCluster size={18} color={`${status_color[status]}`} />
              </div>
              <div style={{display: 'flex', gap: '0.2rem'}}>
                <GrServerCluster size={18} color={`${status_color[status]}`} />
                <GrServerCluster size={18} color={`${status_color[status]}`} />
                <GrServerCluster size={18} color={`${status_color[status]}`} />
                <GrServerCluster size={18} color={`${status_color[status]}`} />
              </div>
            </div>
          </div>
          <p style={{ color: "#fff", fontSize: "14px", fontWeight: 500 }}>{status_text[status]}</p>
        </section>
        {/* <p style={{ color: "#a1a1a1", fontSize: "14px", fontWeight: 500 }}>Forecasted relief: 59min</p> */}
      </section>
    </Mainframe>
  );
};

const Mainframe = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  flex: 1;

  & > section {
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    gap: 0.6rem;

    & > section {
      display: flex;
      gap: 0.8rem;
      align-items: center;

      & > div {
        display: flex;
        gap: 0.2rem;
        align-items: center;
      }
    }
  }
`;

export default ServiceLoad;
