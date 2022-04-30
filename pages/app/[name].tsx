import { useState } from "react";
import { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import "firebase/firestore";
import AdSense from "react-adsense";
import { GOOGLE_ADSENSE_CLIENT } from "../../plugins/googleAdsense";
import Layout from "../../components/Layout/Layout";
import NotFound from "../../components/Common/NotFound";
import ImageModal from "../../components/App/ImageModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink, faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import firebase from "../../plugins/firebase";
import { changeFirstUpperCase } from "../../plugins/common/functions";

const db = firebase.firestore();
interface Props {
  app: any;
  isFound: boolean;
}

const App: NextPage<Props> = (props) => {
  const { app, isFound } = props;
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [initialSlide, setInitialSlide] = useState<number>(0);
  const router = useRouter();
  const url = `https://www.pwalist.app${router.asPath}`;
  // setting the initial slide
  var slideNum = [0, 1, 2, 3, 4, 5];
  if (isFound) {
    if (app.imageMobile1 === null) slideNum.splice(0, 0, null);
    if (app.imageMobile2 === null) slideNum.splice(1, 0, null);
    if (app.imageMobile3 === null) slideNum.splice(2, 0, null);
  }
  return (
    <Layout title={isFound ? app.name : "Not Found"}>
      {isFound && (
        <Head>
          <meta name="description" content={app.description} />
          <meta key="og:title" property="og:title" content={app.name} />
          <meta key="og:site_name" property="og:site_name" content={app.name} />
          <meta key="og:url" property="og:url" content={url} />
          <meta key="og:image" property="og:image" content={app.icon} />
          <meta property="og:type" content="website" />
          <meta key="og:description" property="og:description" content={app.description} />
          <meta key="twitter:card" property="twitter:card" content="summary" />
        </Head>
      )}
      <div>
        {!isFound ? (
          <NotFound />
        ) : (
          <div className="border border-green-200 px-4 py-7 rounded-lg">
            <button
              className="text-center mb-5 py-1 px-5 inline-block tracking-wide border-2 border-black bg-white shadow-md rounded-md hover:bg-gray-200 hover:shadow-none transition ease-in-out"
              onClick={() => router.back()}
            >
              <FontAwesomeIcon icon={faChevronLeft} />
              &nbsp;Back
            </button>
            <div className="flex items-center ml-1">
              <div className="mr-4 w-20">
                <img className="rounded-md" src={app.icon || "/default-app-icon.png"} />
              </div>
              <div className="flex flex-col">
                <h1 className="font-bold text-2xl ml-1">{app.name}</h1>
                <h2 className="text-base text-gray-500 font-semibold ml-1">{app.category}</h2>
                <div className="mt-2">
                  {app.tag1 && (
                    <span className="text-sm px-1.5 py-0.5 mr-1 rounded-xl border-2 border-green-300 text-gray-500 font-semibold">
                      {app.tag1}
                    </span>
                  )}
                  {app.tag2 && (
                    <span className="text-sm px-1.5 py-0.5 mr-1 rounded-xl border-2 border-green-300 text-gray-500 font-semibold">
                      {app.tag2}
                    </span>
                  )}
                  {app.tag3 && (
                    <span className="text-sm px-1.5 py-0.5 mr-1 rounded-xl border-2 border-green-300 text-gray-500 font-semibold">
                      {app.tag3}
                    </span>
                  )}
                </div>
              </div>
            </div>
            <div>
              <a
                target="_blank"
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
            <div className="mt-7 px-4 break-words">
              <h3 className="text-left font-bold text-xl mb-2">About this app</h3>
              <p style={{ whiteSpace: "pre-line" }} className="text-left text-lg">
                {app.description}
              </p>
            </div>
            <ImageModal app={app} modalIsOpen={modalIsOpen} setModalIsOpen={setModalIsOpen} initialSlide={initialSlide} />
          </div>
        )}
        {/* Google Adsense start*/}
        {/* <div className="overflow-scroll text-center mt-7">
          <AdSense.Google
            client={GOOGLE_ADSENSE_CLIENT}
            slot="6767679949"
            style={{ width: 970, height: 90 }}
            format=""
          />
        </div> */}
        {/* Google Adsense end*/}
      </div>
    </Layout>
  );
};
export const getStaticPaths = async () => {
  const apps = await db.collection("applications").where("isPublic", "==", true).get();
  const paths = apps.docs.map((app: any) => ({
    params: {
      name: app.data().nameLowercase,
    },
  }));
  return {
    paths,
    fallback: true,
  };
};
export const getStaticProps = async (context) => {
  const { name } = context.params;
  const res = await db.collection("applications").where("nameLowercase", "==", name).get();
  const app = res.docs.map((res) => res.data());
  if (app.length == 0) {
    return {
      props: {
        app: {},
        isFound: false,
      },
    };
  }
  app[0]["category"] = changeFirstUpperCase(app[0]["category"]);
  delete app[0]["createdAt"];
  delete app[0]["updatedAt"];
  return {
    props: {
      app: app[0],
      isFound: true,
    },
  };
};
export default App;
