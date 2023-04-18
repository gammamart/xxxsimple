import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Source_Code_Pro } from "next/font/google";
import styled from "styled-components";
import { Provider } from "react-redux";

import { store } from "@/redux_store/store";

const source_code_pro = Source_Code_Pro({ subsets: ["latin"] });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Mainframe>
        <Component {...pageProps} />
      </Mainframe>
    </Provider>
  );
}

const Mainframe = styled.div`
  font-family: ${source_code_pro.style.fontFamily};
`;
