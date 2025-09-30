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
import dynamic from "next/dynamic";
const ReCAPTCHA = dynamic(() => import("react-google-recaptcha"), { ssr: false });

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
  const [isClient, setIsClient] = useState(false);

  const [captchaIsDone, setCaptchaIsDone] = useState(false);

  const [query, setQuery] = useState({
    "g-recaptcha-response": "",
  });

  function onChange() {
    setCaptchaIsDone(true);
    // console.log("changed");
  }

  useEffect(() => {
    setIsClient(true);
  }, []);

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

      if (true) {
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
        <Shell>
          <SideMenu className="vintage-sidemenu">
            <h3>Member Area</h3>
            <Link href="/">Home</Link>
            <Link href="/getIn">Login</Link>
            <Link href="/register" className="active">
              Create Account
            </Link>
            <Link href="/contact">Support</Link>
          </SideMenu>
          <Content>
            <HeaderRow>
              <h2>Create Account</h2>
            </HeaderRow>
            <Tabs>
              <TabLink href="/getIn" className="vintage-tab">
                Login
              </TabLink>
              <Tab className="vintage-tab active">Register</Tab>
            </Tabs>
            {error && <ErrorBox>{error}</ErrorBox>}
            <Panel className="vintage-panel">
              <FormGrid onSubmit={(event) => onSubmitHandler(event)} method="post">
                <label>Username</label>
                <Input type="text" ref={enteredUsername} placeholder="Choose a username" />

                <label>Password</label>
                <PasswordRow>
                  <Input style={{ flex: 1 }} type={passwordVisible ? "text" : "password"} id="password" name="password" value={enteredPassword} onChange={(e) => setEnteredPassword(e.target.value)} placeholder="Create a password" />
                  <Toggle onClick={togglePasswordVisibility}>{passwordVisible ? "Hide" : "Show"}</Toggle>
                </PasswordRow>

                <label>Email</label>
                <Input type="email" ref={enteredEmail} placeholder="Enter your email" />

                <label>Verification</label>
                <CaptchaRow>{isClient && <ReCAPTCHA sitekey={key} onChange={onChange} />}</CaptchaRow>

                <div></div>
                <Actions>
                  <SubmitButton type="submit" className="vintage-button">
                    Register
                  </SubmitButton>
                </Actions>
              </FormGrid>
            </Panel>
            <Meta>
              <p>
                Already have an account?{" "}
                <Link href="/getIn" className="vintage-nav-link">
                  Login
                </Link>
              </p>
              <p>
                Need help?{" "}
                <Link href="/contact" className="vintage-nav-link">
                  Contact us
                </Link>
              </p>
            </Meta>
          </Content>
        </Shell>
      </Mainframe>
    </>
  );
};

const Mainframe = styled.div`
  width: 100%;
  min-height: calc(100vh - 92px);
`;
const Shell = styled.div`
  width: 100%;
  max-width: 950px;
  margin: 84px auto;
  display: flex;
  flex-direction: row;
  background: linear-gradient(180deg, #f8f7f3 0%, #efede6 100%);
  border: 1px solid #c5c3bb;
  box-shadow: 0 2px 0 #fff inset, 0 1px 0 #bab6ad inset, 0 8px 18px rgba(0, 0, 0, 0.35);
`;
const SideMenu = styled.div`
  width: 260px;
  padding: 12px;
  border-right: 1px solid #bdb9ad;
  display: flex;
  flex-direction: column;
  gap: 8px;

  & h3 {
    margin: -12px -12px 8px -12px;
    padding: 10px 12px;
    font-family: Verdana, Arial, Helvetica, sans-serif;
    font-size: 12px;
    letter-spacing: 0.4px;
    text-transform: uppercase;
    color: #213a60;
    background: linear-gradient(180deg, #dcd8cc 0%, #cfcabf 100%);
    border-bottom: 1px solid #b7b2a6;
  }

  & a {
    display: block;
    padding: 10px 12px;
    color: #2c2c2c;
    text-decoration: none;
    font-family: Verdana, Arial, Helvetica, sans-serif;
    font-size: 12px;
    background: linear-gradient(180deg, #f7f5ef 0%, #ece9df 100%);
    border: 1px solid #d5d1c7;
    border-radius: 2px;
    box-shadow: 0 1px 0 #fff inset;
  }

  & a:hover {
    background: linear-gradient(180deg, #edeae1 0%, #e5e1d7 100%);
    text-decoration: underline;
  }

  & a.active {
    background: linear-gradient(180deg, #efece3 0%, #e4e0d6 100%);
    border-color: #bdb9ad;
    font-weight: 600;
  }
`;
const Content = styled.div`
  flex: 1;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;
const HeaderRow = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px 0 0 0;

  & h2 {
    font-family: "Times New Roman", Times, Georgia, "Book Antiqua", serif;
    color: #1e2c45;
    font-size: 22px;
    text-align: center;
  }
`;
const Tabs = styled.div`
  display: flex;
  gap: 10px;
  font-size: 14px;
  margin-top: 6px;
`;
const Tab = styled.div`
  text-decoration: underline;
`;
const TabLink = styled(Link)`
  text-decoration: underline;
`;
const Panel = styled.div``;
const FormGrid = styled.form`
  display: grid;
  gap: 10px 14px;
  align-items: center;
  max-width: 620px;

  & > label {
    font-family: Verdana, Arial, Helvetica, sans-serif;
    font-size: 12px;
    color: #1e2c45;
    text-align: left;
  }
`;
const Input = styled.input`
  height: 40px;
  padding: 0 10px;
  font-size: 14px;
  color: #2c2c2c;
  background: linear-gradient(180deg, #ffffff 0%, #f1efe8 100%);
  border: 1px solid #bdb9ad;
  box-shadow: 0 1px 0 #fff inset;
  border-radius: 2px;
  font-family: Verdana, Arial, Helvetica, sans-serif;

  &::placeholder {
    color: #6b6b6b;
  }
`;
const PasswordRow = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;
const Toggle = styled.span`
  color: #12325a;
  cursor: pointer;
  font-family: Verdana, Arial, Helvetica, sans-serif;
  font-size: 12px;
  text-decoration: underline;
`;
const CaptchaRow = styled.div`
  margin-top: 8px;
`;
const Actions = styled.div`
  margin-top: 12px;
  display: flex;
  justify-content: flex-end;
`;
const SubmitButton = styled.button`
  border: none;
  background: none;
  display: block;
  padding: 10px 12px;
  color: #2c2c2c;
  text-decoration: none;
  font-family: Verdana, Arial, Helvetica, sans-serif;
  font-size: 12px;
  background: linear-gradient(180deg, #f7f5ef 0%, #ece9df 100%);
  border: 1px solid #d5d1c7;
  border-radius: 2px;
  box-shadow: 0 1px 0 #fff inset;
`;
const Meta = styled.div`
  font-family: Verdana, Arial, Helvetica, sans-serif;
  font-size: 12px;
  color: #2c2c2c;

  & p + p {
    margin-top: 4px;
  }
`;
const ErrorBox = styled.div`
  background: #f8d7d9;
  border: 1px solid #d9959d;
  color: #831f29;
  padding: 8px 12px;
  font-family: Verdana, Arial, Helvetica, sans-serif;
  font-size: 12px;
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
