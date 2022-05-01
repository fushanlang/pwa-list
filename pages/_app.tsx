import "../styles/globals.css";
import "tailwindcss/tailwind.css";
import "../styles/swiper.css";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { AppProps } from "next/app";
import Router from "next/router";
import * as gtag from "../plugins/gtag";
import { AuthProvider } from "../contexts/Auth";
import { ThemeProvider } from "next-themes";
import Head from "next/head";
Router.events.on("routeChangeComplete", (url) => gtag.pageview(url));

const title = "PWA List";
const url = "https://pwalist.app/";
const description = "Find your favorite progressive web apps here";
const imageUrl =
  "https://firebasestorage.googleapis.com/v0/b/pwa-list-b9174.appspot.com/o/common%2Fpwalist.png?alt=media&token=2247b98b-24d0-4304-92ad-f498607f0dcc";

const WrappedApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <meta key="og:title" property="og:title" content={title} />
        <meta key="og:site_name" property="og:site_name" content={title} />
        <meta key="og:url" property="og:url" content={url} />
        <meta key="og:image" property="og:image" content={imageUrl} />
        <meta property="og:type" content="website" />
        <meta key="og:description" property="og:description" content={description} />
        <meta key="twitter:card" property="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@masakifukunishi" />
        {/* font */}
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Nunito:wght@800&display=swap" />
      </Head>
      <ThemeProvider attribute="class" defaultTheme="light">
        <AuthProvider>
          <Component {...pageProps} />
        </AuthProvider>
      </ThemeProvider>
    </>
  );
};

export default WrappedApp;
