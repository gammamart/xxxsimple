import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Open_Sans } from "next/font/google";
import styled from "styled-components";
import { Provider } from "react-redux";
import NextNProgress from "nextjs-progressbar";
import { Analytics } from '@vercel/analytics/react';

import { store } from "@/redux_store/store";
import { GoogleReCaptchaProvider, withGoogleReCaptcha } from "react-google-recaptcha-v3";

const open_sans = Open_Sans({ subsets: ["latin"] });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <GoogleReCaptchaProvider reCaptchaKey={"6Le3saIoAAAAANfudm6R__UW8BQmmiqc8dy9BDnE"}>
        <Mainframe>
          <NextNProgress color="#009DD2" startPosition={0.1} stopDelayMs={100} height={2} showOnShallow={true} options={{ easing: "ease", speed: 300 }} />
          <Component {...pageProps} />
          <Analytics />
        </Mainframe>
      </GoogleReCaptchaProvider>
    </Provider>
  );
}

const Mainframe = styled.div`
  font-family: ${open_sans.style.fontFamily};
  position: relative;
`;
