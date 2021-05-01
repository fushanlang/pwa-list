import "../styles/globals.css";
import "tailwindcss/tailwind.css";
import "../styles/swiper.css";
import "@fortawesome/fontawesome-svg-core/styles.css";
import Router from "next/router";
import * as gtag from "../plugins/gtag";
Router.events.on("routeChangeComplete", (url) => gtag.pageview(url));
const MyApp = ({ Component, pageProps }) => {
  return <Component {...pageProps} />;
};

export default MyApp;
