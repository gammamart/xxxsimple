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
    <div key={rowIndex} style={{ display: "flex", gap: "0.2rem" }}>
      {Array.from({ length: NODES_PER_ROW }).map((_, colIndex) => {
        const globalIndex = rowIndex * NODES_PER_ROW + colIndex;
        const color = greenIndices.has(globalIndex) ? GREEN_COLOR : status_color[effectiveStatus];
        return <GrServerCluster key={globalIndex} size={18} color={color} />;
      })}
    </div>
  );

  return (
    <Mainframe>
      <p style={{ display: "flex", alignItems: "center", gap: "4px", color: "#1e2c45", fontSize: "14px", fontWeight: 700, fontFamily: "Verdana, Arial, Helvetica, sans-serif" }}>
        Server Status: <p style={{ color: "#2c2c2c", fontSize: "12px", fontWeight: 600, fontFamily: "Verdana, Arial, Helvetica, sans-serif" }}>{status_text[effectiveStatus]}</p>
      </p>
      <section>
        {/* <p style={{ color: "#213a60", fontSize: "12px", fontWeight: 600, fontFamily: "Verdana, Arial, Helvetica, sans-serif" }}>Status</p> */}
        <p></p>
        <section>
          <div>
            {statusAnimation[effectiveStatus]}
            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>{Array.from({ length: ROWS }).map((_, row) => renderRow(row))}</div>
          </div>
        </section>
        {/* <p style={{ color: "#a1a1a1", fontSize: "14px", fontWeight: 500 }}>Forecasted relief: 59min</p> */}
      </section>
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

  & > section {
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    gap: 8px;

    & > section {
      display: flex;
      gap: 10px;
      align-items: center;

      & > div {
        display: flex;
        gap: 4px;
        align-items: center;
      }
    }
  }
`;

export default ServiceLoad;
