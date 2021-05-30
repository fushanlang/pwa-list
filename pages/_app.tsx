import "../styles/globals.css";
import "tailwindcss/tailwind.css";
import "../styles/swiper.css";
import "../styles/loading.css";
import "../styles/loadingCompletedModal.css";
import "@fortawesome/fontawesome-svg-core/styles.css";
import Router from "next/router";
import * as gtag from "../plugins/gtag";
import { AuthProvider } from "../contexts/Auth";
Router.events.on("routeChangeComplete", (url) => gtag.pageview(url));
const MyApp = ({ Component, pageProps }) => {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
};

export default MyApp;
