import Document, { Html, Head, Main, NextScript, DocumentContext, DocumentInitialProps } from "next/document";
import { GA_TRACKING_ID } from "../plugins/gtag";
import { GOOGLE_ADSENSE_CLIENT } from "../plugins/googleAdsense";
const description = "Find your favorite progressive web apps here";

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext): Promise<DocumentInitialProps> {
    return await Document.getInitialProps(ctx);
  }

  render() {
    return (
      <Html lang="en" dir="ltr">
        <Head>
          {/* Global Site Tag (gtag.js) - Google Analytics */}
          <script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`} />
          <script
            dangerouslySetInnerHTML={{
              __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_TRACKING_ID}', {
              page_path: window.location.pathname,
            });
          `,
            }}
          />
          {/* Google Adsense */}
          {/* <script
            data-ad-client={GOOGLE_ADSENSE_CLIENT}
            async
            src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
          ></script> */}
          {/* windows */}
          <meta name="msapplication-square70x70logo" content="/favicons/site-tile-70x70.png" />
          <meta name="msapplication-square150x150logo" content="/favicons/site-tile-150x150.png" />
          <meta name="msapplication-wide310x150logo" content="/favicons/site-tile-310x150.png" />
          <meta name="msapplication-square310x310logo" content="/favicons/site-tile-310x310.png" />
          <meta name="msapplication-TileColor" content="#000" />
          {/* safari */}
          <meta name="/faviconsapple-mobile-web-app-capable" content="yes" />
          <meta name="/faviconsapple-mobile-web-app-status-bar-style" content="#000" />
          <meta name="/faviconsapple-mobile-web-app-title" content="PWA List" />
          <link rel="apple-touch-icon" sizes="180x180" href="/favicons/apple-touch-icon-180x180.png" />
          {/* common */}
          <meta name="application-name" content="PWA List" />
          <meta name="theme-color" content="#000" />
          <link rel="icon" sizes="192x192" href="/favicons/icon-192x192.png" />
          <link rel="icon" href="/favicons/favicon.ico" />
          <link rel="manifest" href="/manifest.json" />
          <meta name="description" content={description} />
          <meta key="keywords" name="keywords" content="pwa, Progressive Web Apps" />
        </Head>
        <body className="text-sm font-sans text-gray-600 dark:text-gray-200 dark:bg-gray-800">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
