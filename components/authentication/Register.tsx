import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Link from "next/link";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { Open_Sans } from "next/font/google";

import { BsArrowLeft } from "react-icons/bs";

import instance from "../../axios";
import requests from "../../requests";
import { userActions } from "@/redux_store/store";
import useAuthentication from "@/utils/hooks/useAuthentication";
import { InformationBox } from "@/pages/dashboard";

import { GoogleReCaptcha, useGoogleReCaptcha } from "react-google-recaptcha-v3";
import ReCAPTCHA from "react-google-recaptcha";

// import { loadCaptchaEnginge, LoadCanvasTemplate, LoadCanvasTemplateNoReload, validateCaptcha } from "react-simple-captcha";

const key = "6Le3saIoAAAAAIG7n_zvmqk-xcHxSevNSDipyx-3";
const open_sans = Open_Sans({ subsets: ["latin"] });

const Register = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  // const authenticate = useAuthentication()

  const { executeRecaptcha } = useGoogleReCaptcha();

  const enteredUsername = useRef<HTMLInputElement | null>(null);
  const [enteredPassword, setEnteredPassword] = useState("");
  const enteredEmail = useRef<HTMLInputElement | null>(null);
  const user_captcha_value = useRef<HTMLInputElement | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);

  const [captchaIsDone, setCaptchaIsDone] = useState(false);

  const [query, setQuery] = useState({
    "g-recaptcha-response": "",
  });

  function onChange() {
    setCaptchaIsDone(true);
    // console.log("changed");
  }

  // useEffect(() => {
  //   loadCaptchaEnginge(6);
  // }, []);

  const onSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // it handles both the registering and loggin in user
    const getIn = async (username: string, email: string, password: string) => {
      //showing loader for user
      setLoading(true);

      try {
        // First get the code
        const codeResponse = await instance.get(requests.sc);
        const code = codeResponse.data.code;

        // Then proceed with registration
        const response = await instance.post(requests.register, {
          username,
          email,
          password,
          code,
        });

        setLoading(false);
        if (response.data) {
          dispatch(userActions.loginUser(JSON.stringify(response.data)));
          localStorage.setItem("user", JSON.stringify(response.data));
          router.push("/dashboard");
          setLoading(false);
        } else {
          setError("Invalid OTP");
        }
      } catch (err: any) {
        setError(err.response?.data?.message || "An error occurred");
        setLoading(false);
      }
    };

    if (enteredUsername.current && enteredPassword && enteredEmail.current) {
      const username: string = enteredUsername.current.value;
      const email: string = enteredEmail.current.value;
      const password: string = enteredPassword;

      const captcha: string | undefined = user_captcha_value.current?.value;

      if (captchaIsDone) {
        getIn(username, email, password);
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
        <InformationBox style={{ backgroundColor: "#ca8107" }}>Please check and confirm your password when registering account!!!</InformationBox>
        <Up>
          <BackButton href={"/"}>
            <BsArrowLeft size={28} color="white" />
          </BackButton>
        </Up>
        <Bottom>
          <form onSubmit={(event) => onSubmitHandler(event)} method="post">
            <input type="text" ref={enteredUsername} placeholder="Username" />
            <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
              <input style={{ flex: 1 }} type={passwordVisible ? "text" : "password"} id="password" name="password" value={enteredPassword} onChange={(e) => setEnteredPassword(e.target.value)} placeholder="Password" />
              <span style={{ color: "var(--simple-blue)", cursor: "pointer" }} onClick={togglePasswordVisibility}>
                {passwordVisible ? "Hide" : "Show"}
              </span>
            </div>
            <input type="email" ref={enteredEmail} placeholder="Email" />
            {/* <LoadCanvasTemplate /> */}
            <ReCAPTCHA sitekey={key} onChange={onChange} />
            <button type="submit">Register</button>
            <p style={{ color: "#fff" }}>
              Already have an account?{" "}
              <Link href="/getIn" style={{ color: "var(--simple-blue)" }}>
                Login
              </Link>
            </p>
            <p style={{ color: "#fff" }}>
              Having trouble creating an account?{" "}
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
    background: #1d1f29;
    border: 1px solid #414651;
    font-family: ${open_sans.style.fontFamily};
    border-radius: 15px;

    &::placeholder {
      font-family: ${open_sans.style.fontFamily};
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
    height: 40px;
    border: none;
    width: 120px;
    font-size: 16px;
    align-self: flex-end;
    cursor: pointer;
    border-radius: 8px;
    font-family: ${open_sans.style.fontFamily};
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

const PasswrodToggle = styled.button`
  margin-left: 5px;
  cursor: pointer;
`;

export default Register;
