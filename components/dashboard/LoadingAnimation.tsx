import Lottie from "react-lottie";
import React from "react";

import * as loadingAnimation from "../../public/statics/animations/loading.json";

const loadingAnimationOptions = {
  loop: true,
  autoplay: true,
  animationData: loadingAnimation,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

const LoadingAnimation: React.FC = () => {
  return (
    <>
      <Lottie options={loadingAnimationOptions} width={60} height={20} />
    </>
  );
};

export default LoadingAnimation;
