/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { useRouter } from "next/router";

const useAuthentication = () => {
  const router = useRouter();

  useEffect(() => {
    const activeUser = localStorage.getItem("user") ? true : false;

    if (!activeUser) {
      router.replace("/getIn");
      return;
    } 
  }, []);
};

export default useAuthentication;
