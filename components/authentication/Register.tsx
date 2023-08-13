import React, { useRef, useState } from "react";
import styled from "styled-components";
import Link from "next/link";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";

import { BsArrowLeft } from "react-icons/bs";

import instance from "../../axios";
import requests from "../../requests";
import { userActions } from "@/redux_store/store";
import useAuthentication from "@/utils/hooks/useAuthentication";
import { InformationBox } from "@/pages/dashboard";

const Register = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  // const authenticate = useAuthentication()

  const enteredUsername = useRef<HTMLInputElement | null>(null);
  const [enteredPassword, setEnteredPassword] = useState("");
  const enteredEmail = useRef<HTMLInputElement | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);

  const onSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // it handles both the registering and loggin in user
    const getIn = (username: string, email: string, password: string) => {
      //showing loader for user
      setLoading(true);
      // send otp to user email to confirm ownership
      instance
        .post(requests.register, { username, email, password })
        .then((response) => {
          // setSendOtp(true);
          setLoading(false);
          if (response.data) {
            dispatch(userActions.loginUser(JSON.stringify(response.data)));
            localStorage.setItem("user", JSON.stringify(response.data));
            router.push("/dashboard");
            setLoading(false);
          } else {
            setError("Invalid OTP");
          }
          console.log(response.data);
        })
        .catch((err) => {
          setError(err.response.data.message);
          setLoading(false);
        });
    };

    if (enteredUsername.current && enteredPassword && enteredEmail.current) {
      const username: string = enteredUsername.current.value;
      const email: string = enteredEmail.current.value;
      const password: string = enteredPassword;

      getIn(username, email, password);
    }
  };

  const togglePasswordVisibility = (): void => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <>
      {loading && <Loader></Loader>}
      <Mainframe>
        {error && <span style={{ width: "auto", color: "#831f29", padding: "8px 30px 8px 30px", backgroundColor: "#f8d7d9", position: "absolute", right: "100px" }}>{error}</span>}
        <InformationBox style={{backgroundColor: "#ca8107"}}>Please check and confirm your password when registering account!!!</InformationBox>
        <Up>
          <BackButton href={"/"}>
            <BsArrowLeft size={28} color="white" />
          </BackButton>
        </Up>
        <Bottom>
          <form onSubmit={(event) => onSubmitHandler(event)} method="post">
            <input type="text" ref={enteredUsername} placeholder="Username" />
            <div style={{display: "flex", alignItems: "center", gap: "1rem"}}>
              <input style={{flex: 1}} type={passwordVisible ? "text" : "password"} id="password" name="password" value={enteredPassword} onChange={(e) => setEnteredPassword(e.target.value)} placeholder="Password" />
              <span style={{color: "var(--simple-blue)", cursor: "pointer"}} onClick={togglePasswordVisibility}>{passwordVisible ? "Hide" : "Show"}</span>
            </div>
            <input type="email" ref={enteredEmail} placeholder="Email" />
            <button type="submit">Register</button>
            <p style={{color: "#fff"}}>Having trouble creating an account? <Link href="/contact" style={{color: "var(--simple-blue)"}}>Contact us</Link></p>
          </form>
        </Bottom>
      </Mainframe>
    </>
  );
};

const Mainframe = styled.div`
  width: 100%;
  height: 100%;
`;
const Up = styled.div`
  height: 60px;
  display: flex;
  align-items: center;
  padding-left: 20px;
`;
const Bottom = styled.div`
  height: calc(100% - 60px);
  padding: 20px;
  display: flex;
  flex-direction: column;

  & form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  & form input {
    background-color: transparent;
    border: 2px solid black;
    height: 50px;
    border-radius: 0;
    color: white;
    padding-left: 10px;
    font-size: 16px;

    &:focus {
      outline: none;
    }
  }

  & form button {
    background-color: black;
    color: white;
    height: 40px;
    border: none;
    width: 120px;
    font-size: 16px;
    align-self: flex-end;
    cursor: pointer;
  }
`;

const BackButton = styled(Link)`
  cursor: pointer;
`;
const Loader = styled.div`
  height: 4px;
  width: 80px;
  background-color: var(--simple-blue);
  animation-duration: 1s;
  animation-name: slidein;
  animation-iteration-count: infinite;
  @media (min-width: 1000px) {
    width: 40px;
  }
  @keyframes slidein {
    from {
      margin-left: 0vw;
    }

    to {
      margin-left: 90%;
    }
  }
`;

const PasswrodToggle = styled.button`
  margin-left: 5px;
  cursor: pointer;
`;

export default Register;
