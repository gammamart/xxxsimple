import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { userActions } from "@/redux_store/store";
import instance from "@/axios";
import Navbar from "@/components/global/Navbar";
import requests from "@/requests";
import Head from "next/head";

const DashboardScreen = () => {
  const dispatch = useDispatch();
  const user = JSON.parse(useSelector((state: any) => state.userSlice.user));
  console.log(user?.token);

  useEffect(() => {
    const headerConfig = {
      headers: { Authorization: `Bearer ${user?.token}` },
    };

    // getting user profile from the backend and saving them to redux store
    if (user) {
      instance.get(requests.profile, headerConfig).then((response) => dispatch(userActions.saveProfile(JSON.stringify(response.data))));
    }
  }, [dispatch, user]);

  return (
    <>
      <Head>
        <title>Dashboard</title>
      </Head>
      <Mainframe>
        <NavigationFrame>
          <Navbar />
        </NavigationFrame>
        <DynamicPageFrame>{/* <Outlet /> */}</DynamicPageFrame>
      </Mainframe>
    </>
  );
};

const Mainframe = styled.div`
  height: 100vh;
  /* max-height: 900px; */
  min-height: 650px;
  display: flex;
`;
const NavigationFrame = styled.div`
  /* border-right: 1px solid rgb(255, 255, 255, 0.34);
  width: 550px;
  height: 100%;
  max-height: 900px;

  @media (min-width: 1200px) {
    width: 550px;
  }
  @media (max-width: 700px) {
    width: 100px;
  } */
`;
const DynamicPageFrame = styled.div`
  /* border: 1px solid aquamarine; */
  width: 100%;
  height: 100%;
`;

export default DashboardScreen;
