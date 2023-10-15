import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Source_Code_Pro } from "next/font/google";
import styled from "styled-components";
import { Provider } from "react-redux";
import NextNProgress from "nextjs-progressbar";

import { store } from "@/redux_store/store";
import { GoogleReCaptchaProvider, withGoogleReCaptcha } from "react-google-recaptcha-v3";

const source_code_pro = Source_Code_Pro({ subsets: ["latin"] });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <GoogleReCaptchaProvider reCaptchaKey={"6Le3saIoAAAAANfudm6R__UW8BQmmiqc8dy9BDnE"}>
        <Mainframe>
          <NextNProgress color="#009DD2" startPosition={0.1} stopDelayMs={100} height={2} showOnShallow={true} options={{ easing: "ease", speed: 300 }} />
          <Component {...pageProps} />
        </Mainframe>
      </GoogleReCaptchaProvider>
    </Provider>
  );
}

const Mainframe = styled.div`
  font-family: ${source_code_pro.style.fontFamily};
  position: relative;
`;
