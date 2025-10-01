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

import dynamic from "next/dynamic";
const ReCAPTCHA = dynamic(() => import("react-google-recaptcha"), { ssr: false });

const key = "6Le3saIoAAAAAIG7n_zvmqk-xcHxSevNSDipyx-3";
const open_sans = Open_Sans({ subsets: ["latin"] });

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
  const [isClient, setIsClient] = useState(false);

  const [captchaIsDone, setCaptchaIsDone] = useState(false);

  function onChange() {
    setCaptchaIsDone(true);
    // console.log("changed");
  }

  useEffect(() => {
    setIsClient(true);
  }, []);

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
          // console.log(response.data);
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
        <Shell>
          <SideMenu className="vintage-sidemenu">
            <h3>Member Area</h3>
            <Link href="/">Home</Link>
            <Link href="/getIn" className="active">
              Login
            </Link>
            <Link href="/register">Create Account</Link>
            <Link href="/contact">Support</Link>
          </SideMenu>
          <Content>
            <HeaderRow>
              <h2>Secure Login</h2>
            </HeaderRow>
            <Tabs>
              <Tab className="vintage-tab active">Login</Tab>
              <TabLink href="/register" className="vintage-tab">
                Register
              </TabLink>
            </Tabs>
            {error && <ErrorBox>{error}</ErrorBox>}
            <Panel className="vintage-panel">
              <Form onSubmit={(event) => onSubmitHandler(event)} method="post">
                <label>Username</label>
                <Input type="text" ref={enteredEmail} placeholder="Enter your username" />
                <label>Password</label>
                <PasswordRow>
                  <Input style={{ flex: 1 }} type={passwordVisible ? "text" : "password"} id="password" name="password" value={enteredPassword} onChange={(e) => setEnteredPassword(e.target.value)} placeholder="Enter your password" />
                  <Toggle onClick={togglePasswordVisibility}>{passwordVisible ? "Hide" : "Show"}</Toggle>
                </PasswordRow>
                <CaptchaRow>{isClient && <ReCAPTCHA sitekey={key} onChange={onChange} />}</CaptchaRow>
                <Actions>
                  <SubmitButton type="submit" className="vintage-button">
                    Get In
                  </SubmitButton>
                </Actions>
              </Form>
            </Panel>
            <Meta>
              <p>
                Don&apos;t have an account?{" "}
                <Link href="/register" className="vintage-nav-link">
                  Register
                </Link>
              </p>
              <p>
                Trouble logging in?{" "}
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
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(180deg, #d9dde3 0%, #c9ced6 40%, #b6bcc6 100%);
  background-attachment: fixed;
`;
const Shell = styled.div`
  width: 100%;
  max-width: 880px;
  margin: 40px auto;
  display: flex;
  flex-direction: row;
  background: linear-gradient(180deg, #f8f7f3 0%, #efede6 100%);
  border: 1px solid #c5c3bb;
  box-shadow: 0 2px 0 #fff inset, 0 1px 0 #bab6ad inset, 0 8px 18px rgba(0, 0, 0, 0.35);

  @media (max-width: 768px) {
    flex-direction: column;
    margin: 20px auto;
    max-width: 95%;
  }
`;
const SideMenu = styled.div`
  width: 260px;
  padding: 12px;
  border-right: 1px solid #bdb9ad;
  display: flex;
  flex-direction: column;
  gap: 8px;

  @media (max-width: 768px) {
    width: 100%;
    border-right: none;
    border-bottom: 1px solid #bdb9ad;
    padding: 8px;
  }

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

    @media (max-width: 768px) {
      margin: -8px -8px 6px -8px;
      padding: 8px;
      font-size: 11px;
    }
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

    @media (max-width: 768px) {
      padding: 8px 10px;
      font-size: 11px;
    }
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
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 14px;

  @media (max-width: 768px) {
    padding: 16px;
    gap: 12px;
  }
`;
const HeaderRow = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  align-items: center;
  padding: 8px 0 0 0;

  & h2 {
    font-family: "Times New Roman", Times, Georgia, "Book Antiqua", serif;
    color: #1e2c45;
    font-size: 22px;
    text-align: center;

    @media (max-width: 768px) {
      font-size: 20px;
    }

    @media (max-width: 480px) {
      font-size: 18px;
    }
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
const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-width: 520px;

  @media (max-width: 768px) {
    max-width: 100%;
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
  cursor: pointer;
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

export default Login;
