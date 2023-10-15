import React, { useRef, useState } from "react";
import styled from "styled-components";
import Link from "next/link";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { Source_Code_Pro } from "next/font/google";

import { BsArrowLeft } from "react-icons/bs";

import instance from "../../axios";
import requests from "../../requests";
import { userActions } from "@/redux_store/store";
import useAuthentication from "@/utils/hooks/useAuthentication";

import ReCAPTCHA from "react-google-recaptcha";

const key = "6Le3saIoAAAAAIG7n_zvmqk-xcHxSevNSDipyx-3";
const source_code_pro = Source_Code_Pro({ subsets: ["latin"] });

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

  const [captchaIsDone, setCaptchaIsDone] = useState(false);

  function onChange() {
    setCaptchaIsDone(true);
    console.log("changed");
  }

  const onSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

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

      if (captchaIsDone) {
        getIn(email, password);
      } else {
        alert("Captcha Does Not Match");
      }
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
            <ReCAPTCHA sitekey={key} onChange={onChange} />
            <button type="submit">Get In</button>
            <p style={{ color: "#ecedf0" }}>
              Don&apos;t have an account?{" "}
              <Link href="/register" style={{ color: "var(--simple-blue)" }}>
                Register
              </Link>
            </p>
            <p style={{ color: "#ecedf0" }}>
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
  font-family: ${source_code_pro.style.fontFamily};
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
    background: #1d1f29;
    border: 1px solid #414651;
    font-family: ${source_code_pro.style.fontFamily};
    border-radius: 15px;

    &::placeholder {
      font-family: ${source_code_pro.style.fontFamily};
      font-size: 1rem;
      color: #afb3bd;
    }

    &:focus {
      outline: 2px solid #41465178;
      outline-offset: 2px;
      transition: outline 0.6s ease-out;
    }
  }

  & form button {
    background-color: white;
    color: black;
    height: 38px;
    border: none;
    width: 100px;
    font-size: 16px;
    align-self: flex-end;
    cursor: pointer;
    border-radius: 8px;
    font-family: ${source_code_pro.style.fontFamily};
    font-weight: 600;
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
