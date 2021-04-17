import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
  DocumentInitialProps,
} from "next/document";
const title = "PWA LIST";
const url = "https://pwalist.app/";
const description =
  "You can find progressive web apps by category or name in PWA LIST!";
const imageUrl =
  "https://firebasestorage.googleapis.com/v0/b/pwa-list-b9174.appspot.com/o/common%2Fpwalist.png?alt=media&token=2247b98b-24d0-4304-92ad-f498607f0dcc";

class MyDocument extends Document {
  static async getInitialProps(
    ctx: DocumentContext
  ): Promise<DocumentInitialProps> {
    return await Document.getInitialProps(ctx);
  }

  render() {
    return (
      <Html lang="ja-JP" dir="ltr">
        <Head>
          {/* windows */}
          <meta
            name="msapplication-square70x70logo"
            content="/favicons/site-tile-70x70.png"
          />
          <meta
            name="msapplication-square150x150logo"
            content="/favicons/site-tile-150x150.png"
          />
          <meta
            name="msapplication-wide310x150logo"
            content="/favicons/site-tile-310x150.png"
          />
          <meta
            name="msapplication-square310x310logo"
            content="/favicons/site-tile-310x310.png"
          />
          <meta name="msapplication-TileColor" content="#000" />
          {/* safari */}
          <meta name="/faviconsapple-mobile-web-app-capable" content="yes" />
          <meta
            name="/faviconsapple-mobile-web-app-status-bar-style"
            content="#000"
          />
          <meta name="/faviconsapple-mobile-web-app-title" content="PWA LIST" />
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/favicons/apple-touch-icon-180x180.png"
          />
          {/* common */}
          <meta name="application-name" content="PWA LIST" />
          <meta name="theme-color" content="#000" />
          <link rel="icon" sizes="192x192" href="/icon-192x192.png" />
          <link rel="icon" href="/favicons/favicon.ico" />
          <link rel="manifest" href="/favicons/manifest.json" />
          <meta name="description" content={description} />
          <meta
            key="keywords"
            name="keywords"
            content="pwa, Progressive Web Apps"
          />
          <meta key="og:title" property="og:title" content={title} />
          <meta key="og:site_name" property="og:site_name" content={title} />
          <meta key="og:url" property="og:url" content={url} />
          <meta key="og:image" property="og:image" content={imageUrl} />
          <meta property="og:type" content="website" />
          <meta
            key="og:description"
            property="og:description"
            content={description}
          />
          <meta
            key="twitter:card"
            property="twitter:card"
            content="summary_large_image"
          />
          <meta name="twitter:site" content="@masakifukunishi" />
          {/* font */}
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=Nunito:wght@800&display=swap"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
