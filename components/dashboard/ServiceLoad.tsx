import React, { useMemo } from "react";
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
  const userInformation: string | null = typeof localStorage !== "undefined" ? localStorage.getItem("user") : null;
  const membership: string = userInformation ? JSON.parse(userInformation).membership || "Free" : "Free";

  // If membership is Private, force status to LL
  const effectiveStatus = membership === "Private" ? "LL" : status;

  const status_color: any = {
    LL: "#4b8a3c", // vintage green
    ML: "#b89a45", // vintage gold
    OL: "#8e1b1b", // vintage burgundy
  };

  const status_text: any = {
    LL: "[Low Load] Smooth sailing",
    ML: "[Moderate Load] Steady traffic",
    OL: "[High Load] Expect delays",
  };

  const statusAnimation: any = {
    LL: <Lottie options={lowAnimationOptions} width={30} height={30} />,
    ML: <Lottie options={moderateAnimationOptions} width={30} height={30} />,
    OL: <Lottie options={overloadedAnimationOptions} width={30} height={30} />,
  };

  // Generate randomized green nodes across a compact 3x5 grid
  const ROWS = 3;
  const NODES_PER_ROW = 15; // 15 in each row
  const TOTAL_NODES = ROWS * NODES_PER_ROW;
  const GREEN_COLOR = "#8e1b1b";

  const greenIndices = useMemo(() => {
    const indices = new Set<number>();
    while (indices.size < 5) {
      indices.add(Math.floor(Math.random() * TOTAL_NODES));
    }
    return indices;
  }, [effectiveStatus]);

  const renderRow = (rowIndex: number) => (
    <ServerRow key={rowIndex}>
      {Array.from({ length: NODES_PER_ROW }).map((_, colIndex) => {
        const globalIndex = rowIndex * NODES_PER_ROW + colIndex;
        const color = greenIndices.has(globalIndex) ? GREEN_COLOR : status_color[effectiveStatus];
        return <GrServerCluster key={globalIndex} size={18} color={color} />;
      })}
    </ServerRow>
  );

  return (
    <Mainframe>
      <StatusHeader>
        <StatusLabel>Server Status:</StatusLabel>
        <StatusText>{status_text[effectiveStatus]}</StatusText>
      </StatusHeader>
      <StatusSection>
        <StatusContent>
          <AnimationContainer>{statusAnimation[effectiveStatus]}</AnimationContainer>
          <ServerGrid>{Array.from({ length: ROWS }).map((_, row) => renderRow(row))}</ServerGrid>
        </StatusContent>
      </StatusSection>
    </Mainframe>
  );
};

const Mainframe = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  flex: 1;
  min-height: 146px;
  background: linear-gradient(180deg, #fbfaf6 0%, #f0eee7 100%);
  border: 1px solid #c5c1b7;
  box-shadow: 0 1px 0 #fff inset;
  padding: 12px 16px;

  @media (max-width: 768px) {
    padding: 10px 12px;
    gap: 10px;
    min-height: 120px;
  }

  @media (max-width: 480px) {
    padding: 8px 10px;
    gap: 8px;
    min-height: 100px;
  }
`;

const StatusHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    gap: 3px;
  }

  @media (max-width: 480px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 2px;
  }
`;

const StatusLabel = styled.p`
  color: #1e2c45;
  font-size: 14px;
  font-weight: 700;
  font-family: Verdana, Arial, Helvetica, sans-serif;
  margin: 0;

  @media (max-width: 768px) {
    font-size: 13px;
  }

  @media (max-width: 480px) {
    font-size: 12px;
  }
`;

const StatusText = styled.p`
  color: #2c2c2c;
  font-size: 12px;
  font-weight: 600;
  font-family: Verdana, Arial, Helvetica, sans-serif;
  margin: 0;

  @media (max-width: 768px) {
    font-size: 11px;
  }

  @media (max-width: 480px) {
    font-size: 10px;
  }
`;

const StatusSection = styled.section`
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  gap: 8px;

  @media (max-width: 768px) {
    gap: 6px;
  }

  @media (max-width: 480px) {
    gap: 4px;
  }
`;

const StatusContent = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;

  @media (max-width: 768px) {
    gap: 8px;
  }

  @media (max-width: 480px) {
    gap: 6px;
    flex-direction: column;
    align-items: flex-start;
  }
`;

const AnimationContainer = styled.div`
  display: flex;
  align-items: center;

  @media (max-width: 480px) {
    align-self: center;
  }
`;

const ServerGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;

  @media (max-width: 768px) {
    gap: 4px;
  }

  @media (max-width: 480px) {
    gap: 3px;
  }
`;

const ServerRow = styled.div`
  display: flex;
  gap: 0.2rem;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    gap: 0.15rem;
  }

  @media (max-width: 480px) {
    gap: 0.1rem;
    justify-content: center;
  }
`;

export default ServiceLoad;
