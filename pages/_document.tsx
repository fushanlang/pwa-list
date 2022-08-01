import Document, { Html, Head, Main, NextScript, DocumentContext, DocumentInitialProps } from "next/document";

import { GA_TRACKING_ID } from "../plugins/gtag";
import { GOOGLE_ADSENSE_CLIENT } from "../plugins/googleAdsense";

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
          {/* <script data-ad-client={GOOGLE_ADSENSE_CLIENT} async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script> */}
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
