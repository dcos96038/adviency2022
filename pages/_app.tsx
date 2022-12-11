import "../styles/globals.css";
import type {AppProps} from "next/app";

import {UIProvider} from "../context/uiContext";
import {GiftsProvider} from "../context/giftsContext";

export default function App({Component, pageProps}: AppProps) {
  return (
    <UIProvider>
      <GiftsProvider>
        <Component {...pageProps} />
      </GiftsProvider>
    </UIProvider>
  );
}
