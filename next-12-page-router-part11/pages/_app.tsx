import Head from "next/head";
import "../styles/globals.css";
import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div style={{ maxWidth: "600px", margin: "auto" }}>
      <Head>
        <title>My page title</title>
      </Head>
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
