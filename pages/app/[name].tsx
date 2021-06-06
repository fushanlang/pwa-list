import { useState, useEffect } from "react";
import { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import firebase from "../../plugins/firebase";
import "firebase/firestore";
import AdSense from "react-adsense";
import { GOOGLE_ADSENSE_CLIENT } from "../../plugins/googleAdsense";
import Layout from "../../components/Layout";
import NotFound from "../../components/Common/NotFound";
import ImageModal from "../../components/App/ImageModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink, faChevronLeft } from "@fortawesome/free-solid-svg-icons";

interface Props {
  appData: any;
}

const db = firebase.firestore();
const App: NextPage<Props> = (appData) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [initialSlide, setInitialSlide] = useState(0);
  const [existsBackPage, setExistsBackPage] = useState(true);
  const [caategoryFirstUpperCase, setCaategoryFirstUpperCase] =
    useState<string | null>(null);
  const app = appData.appData;
  const router = useRouter();
  const url = `https://www.pwalist.app${router.asPath}`;
  // setting the initial slide
  var slideNum = [0, 1, 2, 3, 4, 5];
  if (app.imageMobile1 === null) slideNum.splice(0, 0, null);
  if (app.imageMobile2 === null) slideNum.splice(1, 0, null);
  if (app.imageMobile3 === null) slideNum.splice(2, 0, null);

  useEffect(() => {
    if (typeof history.state.options.scroll === "undefined") {
      setExistsBackPage(false);
    }
    if (app.category !== undefined) {
      setCaategoryFirstUpperCase(
        app.category.toString().charAt(0).toUpperCase() + app.category.slice(1)
      );
    }
  }, []);
  return (
    <Layout title={app.name}>
      <Head>
        <meta name="description" content={app.description} />
        <meta key="og:title" property="og:title" content={app.name} />
        <meta key="og:site_name" property="og:site_name" content={app.name} />
        <meta key="og:url" property="og:url" content={url} />
        <meta key="og:image" property="og:image" content={app.icon} />
        <meta property="og:type" content="website" />
        <meta
          key="og:description"
          property="og:description"
          content={app.description}
        />
        <meta key="twitter:card" property="twitter:card" content="summary" />
      </Head>
      <div>
        {app.name === undefined ? (
          <NotFound />
        ) : (
          <div className="bg-white px-4 py-7 rounded-lg">
            {existsBackPage ? (
              <button
                className="text-center mb-5 py-1 px-5 inline-block tracking-wide border-2 border-black bg-white shadow-md rounded-md hover:bg-gray-200 hover:shadow-none transition ease-in-out"
                onClick={() => router.back()}
              >
                <FontAwesomeIcon icon={faChevronLeft} />
                &nbsp;Back
              </button>
            ) : (
              <Link href="/" as="/">
                <button className="text-center mb-5 py-1 px-5 inline-block tracking-wide border-2 border-black bg-white shadow-md rounded-md hover:bg-gray-200 hover:shadow-none transition ease-in-out">
                  <FontAwesomeIcon icon={faChevronLeft} />
                  &nbsp;Back
                </button>
              </Link>
            )}
            <div className="flex items-center ml-1">
              <div className="mr-4 w-20">
                <img
                  className="rounded-md"
                  src={app.icon || "/default-app-icon.png"}
                />
              </div>
              <div className="flex flex-col">
                <h1 className="font-bold text-2xl ml-1">{app.name}</h1>
                <h2 className="text-base ml-1">{caategoryFirstUpperCase}</h2>
                <div className="mt-1">
                  {app.tag1 && (
                    <span className="text-xs px-2 py-1 mr-2 rounded bg-gray-600 text-white">
                      {app.tag1}
                    </span>
                  )}
                  {app.tag2 && (
                    <span className="text-xs px-2 py-1 mr-2 rounded bg-gray-600 text-white">
                      {app.tag2}
                    </span>
                  )}
                  {app.tag3 && (
                    <span className="text-xs px-2 py-1 mr-2 rounded bg-gray-600 text-white">
                      {app.tag3}
                    </span>
                  )}
                </div>
              </div>
            </div>
            <div>
              <a
                target="_blank"
                // rel="noopener noreferrer"
                href={app.link}
                className="text-center w-60 mt-7 ml-1 py-1 inline-block tracking-wide text-gray-50 bg-green-400 shadow-md rounded-md hover:bg-green-500 hover:shadow-none transition ease-in-out"
              >
                VIEW&nbsp;
                <FontAwesomeIcon icon={faLink} />
              </a>
            </div>
            <div className="flex mt-6 overflow-scroll">
              {app.imageMobile1 !== null && (
                <img
                  onClick={() => {
                    setModalIsOpen(true);
                    setInitialSlide(slideNum[0]);
                  }}
                  className="border rounded max-h-96 mx-2 cursor-pointer"
                  src={app.imageMobile1}
                />
              )}
              {app.imageMobile2 !== null && (
                <img
                  onClick={() => {
                    setModalIsOpen(true);
                    setInitialSlide(slideNum[1]);
                  }}
                  className="border rounded max-h-96 mx-2 cursor-pointer"
                  src={app.imageMobile2}
                />
              )}
              {app.imageMobile3 !== null && (
                <img
                  onClick={() => {
                    setModalIsOpen(true);
                    setInitialSlide(slideNum[2]);
                  }}
                  className="border rounded max-h-96 mx-2 cursor-pointer"
                  src={app.imageMobile3}
                />
              )}
              {app.imagePc1 !== null && (
                <img
                  onClick={() => {
                    setModalIsOpen(true);
                    setInitialSlide(slideNum[3]);
                  }}
                  className="border rounded max-h-96 mx-2 cursor-pointer hidden lg:inline-block"
                  src={app.imagePc1}
                />
              )}
              {app.imagePc2 !== null && (
                <img
                  onClick={() => {
                    setModalIsOpen(true);
                    setInitialSlide(slideNum[4]);
                  }}
                  className="border rounded max-h-96 mx-2 cursor-pointer hidden lg:inline-block "
                  src={app.imagePc2}
                />
              )}
              {app.imagePc3 !== null && (
                <img
                  onClick={() => {
                    setModalIsOpen(true);
                    setInitialSlide(slideNum[5]);
                  }}
                  className="border rounded max-h-96 mx-2 cursor-pointer hidden lg:inline-block "
                  src={app.imagePc3}
                />
              )}
            </div>
            <div className="mt-7 px-4">
              <h3 className="text-left font-bold text-xl mb-2">
                About this app
              </h3>
              <p
                style={{ whiteSpace: "pre-line" }}
                className="text-left text-lg"
              >
                {app.description}
              </p>
            </div>
            <ImageModal
              app={app}
              modalIsOpen={modalIsOpen}
              setModalIsOpen={setModalIsOpen}
              initialSlide={initialSlide}
            />
          </div>
        )}
        {/* Google Adsense */}
        <div className="overflow-scroll text-center mt-7">
          <AdSense.Google
            client={GOOGLE_ADSENSE_CLIENT}
            slot="6767679949"
            style={{ width: 970, height: 90 }}
            format=""
          />
        </div>
        {/* Google Adsense */}
      </div>
    </Layout>
  );
};

App.getInitialProps = async ({ query }) => {
  const { name } = query;
  const appDataDb = await db
    .collection("applications")
    .where("nameLowercase", "==", name)
    .where("isPublic", "==", true)
    .get();
  if (appDataDb.empty) {
    return {
      appData: [],
    };
  }
  const app = appDataDb.docs[0].data();
  const returnAppData = {
    name: app.name,
    icon: app.icon,
    tag1: app.tag1,
    tag2: app.tag2,
    tag3: app.tag3,
    category: app.category,
    link: app.link,
    description: app.description,
    imagePc1: app.imagePc1,
    imagePc2: app.imagePc2,
    imagePc3: app.imagePc3,
    imageMobile1: app.imageMobile1,
    imageMobile2: app.imageMobile2,
    imageMobile3: app.imageMobile3,
  };
  return {
    appData: returnAppData,
  };
};
export default App;
