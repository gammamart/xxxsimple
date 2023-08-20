import React, { useRef, useState } from "react";
import styled from "styled-components";
import Link from "next/link";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import ReCAPTCHA from "react-google-recaptcha";

import { BsArrowLeft } from "react-icons/bs";

import instance from "../../axios";
import requests from "../../requests";
import { userActions } from "@/redux_store/store";
import useAuthentication from "@/utils/hooks/useAuthentication";

const Login = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const authenticate = useAuthentication();

  const enteredEmail = useRef<HTMLInputElement | null>(null);
  const [enteredPassword, setEnteredPassword] = useState("");
  const [sendOtp, setSendOtp] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);

  const [recaptchaValue, setRecaptchaValue] = useState<string | null>(null);

  const handleRecaptchaChange = (value: string | null) => {
    setRecaptchaValue(value);
  };

  const onSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!recaptchaValue) {
      setError("Please complete the reCAPTCHA.");
      return;
    }

    // it handles both the registering and loggin in user
    const getIn = (email: string, password: string) => {
      //showing loader for user
      setLoading(true);
      // send otp to user email to confirm ownership
      instance
        .post(requests.login, { username: email, password })
        .then((response) => {
          // setSendOtp(true);
          setLoading(false);
          if (response.data) {
            dispatch(userActions.loginUser(JSON.stringify(response.data)));
            localStorage.setItem("user", JSON.stringify(response.data));
            router.push("/dashboard");
          }
          console.log(response.data);
        })
        .catch(() => {
          setError("Incorrect Credentials");
          setLoading(false);
        });
    };

    if (enteredEmail.current && enteredPassword) {
      const email: string = enteredEmail.current.value;
      const password: string = enteredPassword;

      getIn(email, password);
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
        <Up>
          <BackButton href={"/"}>
            <BsArrowLeft size={28} color="white" />
          </BackButton>
        </Up>
        <Bottom>
          <form onSubmit={(event) => onSubmitHandler(event)} method="post">
            <input type="text" ref={enteredEmail} placeholder="Username" />
            <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
              <input style={{ flex: 1 }} type={passwordVisible ? "text" : "password"} id="password" name="password" value={enteredPassword} onChange={(e) => setEnteredPassword(e.target.value)} placeholder="Password" />
              <span style={{ color: "var(--simple-blue)", cursor: "pointer" }} onClick={togglePasswordVisibility}>
                {passwordVisible ? "Hide" : "Show"}
              </span>
            </div>
            <ReCAPTCHA sitekey="6Lf6374nAAAAACevsPMWiI2SfZ1idsRSq0h85nbs" onChange={handleRecaptchaChange} />
            <button type="submit">Get In</button>
            <p style={{ color: "#fff" }}>
              Don&apos;t have an account?{" "}
              <Link href="/register" style={{ color: "var(--simple-blue)" }}>
                Register
              </Link>
            </p>
            <p style={{ color: "#fff" }}>
              Having trouble logining in?{" "}
              <Link href="/contact" style={{ color: "var(--simple-blue)" }}>
                Contact us
              </Link>
            </p>
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

export default Login;
