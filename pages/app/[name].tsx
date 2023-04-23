import { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink, faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import AdSense from "react-adsense";

import { GOOGLE_ADSENSE_CLIENT } from "../../plugins/googleAdsense";
import Layout from "../../components/Layout/Layout";
import NotFound from "../../components/Common/NotFound";
import { db } from "../../plugins/firebase";
import capitalizeFirstLetter from "../../plugins/common/capitalizeFirstLetter";
import type { App } from "../../types/apps";

type Props = { app: App; isFound: boolean };

const App: NextPage<Props> = (props) => {
  const { app, isFound } = props;
  const router = useRouter();
  const url = `https://www.pwalist.app${router.asPath}`;
  let images: any = {};
  if (isFound) {
    images = {};
    if (app.imageMobile1) images.mobile1 = app.imageMobile1;
    if (app.imageMobile2) images.mobile2 = app.imageMobile2;
    if (app.imageMobile3) images.mobile3 = app.imageMobile3;
    if (app.imagePc1) images.pc1 = app.imagePc1;
    if (app.imagePc2) images.pc2 = app.imagePc2;
    if (app.imagePc3) images.pc3 = app.imagePc3;
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
      <div className="px-4 py-6">
        {!isFound ? (
          <NotFound />
        ) : (
          <div className="border border-green-200 pl-5 pr-4 py-7 rounded-lg">
            <button
              className="text-center py-1 px-5 tracking-wide rounded-md border-2 border-black dark:border-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
              onClick={() => router.back()}
            >
              <FontAwesomeIcon icon={faChevronLeft} />
              &nbsp;Back
            </button>
            <div className="mt-5 my-1">
              <div className="flex items-center mb-5">
                <div className="w-20 pt-1">
                  <Image
                    className="rounded-md"
                    alt="icon"
                    src={app.icon || "/default-app-icon.png"}
                    width={100}
                    height={100}
                    objectFit="contain"
                  />
                </div>
                <div className="ml-5">
                  <h1 className="font-bold text-2xl">{app.name}</h1>
                  <h2 className="text-base font-semibold">{app.category}</h2>
                  <div className="mt-1 text-base font-semibold">
                    {app.tag1 && <span>{app.tag1}</span>}
                    {app.tag2 && <span> / {app.tag2}</span>}
                    {app.tag3 && <span> / {app.tag3}</span>}
                  </div>
                </div>
              </div>
              <div>
                <a
                  target="_blank"
                  href={app.link}
                  className="text-center w-56 py-1 inline-block tracking-wide text-white bg-green-400 rounded-md hover:bg-green-500"
                >
                  Link&nbsp;
                  <FontAwesomeIcon icon={faLink} />
                </a>
              </div>
            </div>
            <div className="flex mt-6 overflow-scroll">
              {Object.keys(images).map((key) => (
                <img
                  key={key}
                  className={`max-h-120 mx-2 rounded-lg border ${key.indexOf("pc") === 0 ? "hidden lg:inline-block" : ""}`}
                  src={images[key]}
                  alt={`screenshot${key}`}
                />
              ))}
            </div>
            <div className="mt-7 break-words">
              <h3 className="text-left font-bold text-xl mb-2">About this app</h3>
              <p className="text-left text-lg whitespace-pre-line">{app.description}</p>
            </div>
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
  const res = await db.collection("applications").where("nameLowercase", "==", name).where("isPublic", "==", true).limit(1).get();
  if (res.empty) {
    return {
      props: {
        app: {},
        isFound: false,
      },
    };
  }
  const app = res.docs[0].data();
  return {
    props: {
      app: {
        id: res.docs[0].id,
        name: app.name,
        nameLowercase: app.nameLowercase,
        icon: app.icon,
        category: capitalizeFirstLetter(app.category),
        tag1: app.tag1,
        tag2: app.tag2,
        tag3: app.tag3,
        description: app.description,
        link: app.link,
        imageMobile1: app.imageMobile1,
        imageMobile2: app.imageMobile2,
        imageMobile3: app.imageMobile3,
        imagePc1: app.imagePc1,
        imagePc2: app.imagePc2,
        imagePc3: app.imagePc3,
      },
      isFound: true,
    },
  };
};
export default App;
