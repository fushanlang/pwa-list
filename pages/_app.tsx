import "../styles/globals.css";
import "tailwindcss/tailwind.css";
import "../styles/swiper.css";
import "../styles/loading.css";
import "../styles/loadingCompletedModal.css";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { AppProps } from "next/app";
import Router from "next/router";
import * as gtag from "../plugins/gtag";
import { AuthProvider } from "../contexts/Auth";
Router.events.on("routeChangeComplete", (url) => gtag.pageview(url));
const WrappedApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
};

export default WrappedApp;
