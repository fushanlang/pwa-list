import Link from "next/link";
import "firebase/firestore";
import { NextPage } from "next";
import AdSense from "react-adsense";
import { GOOGLE_ADSENSE_CLIENT } from "../plugins/googleAdsense";

import firebase from "../plugins/firebase";
import { useLoginUser } from "../contexts/Auth";
import Layout from "../components/Layout/Layout";
import Card from "../components/App/Card";
import ChangeThemeButton from "../components/Common/ChangeThemeButton";
import { CardApp } from "../types/app";

type Props = { apps: CardApp[] };

const Index: NextPage<Props> = ({ apps }) => {
  const loginUser = useLoginUser();
  const logo = { fontFamily: "'Nunito', sans-serif" };
  const date = new Date();

  return (
    <Layout title="Home">
      <div className="min-h-screen p-6">
        <div className="flex mt-3 justify-between">
          <h1 className="text-3xl font-bold" style={logo}>
            P<span className="text-green-500">W</span>A LIST
          </h1>
          <span className="mr-2">
            <ChangeThemeButton />
          </span>
        </div>
        <div>
          <div className="ml-1.5 my-2">
            <h2 className="text-xl font-bold">New Apps</h2>
            <p className="text-base text-gray-500 dark:text-gray-300">Recently added Progressive Web Apps.</p>
          </div>
          <>
            <Card apps={apps} />
          </>
          {/* Google Adsense start*/}
          {/* <div className="overflow-scroll text-center mt-16">
              <AdSense.Google client={GOOGLE_ADSENSE_CLIENT} slot="6767679949" style={{ width: 970, height: 90 }} format="" />
            </div> */}
          {/* Google Adsense end*/}
        </div>
      </div>
      <div className="bg-gray-50 dark:bg-gray-900 p-8">
        <h2 className="text-lg font-semibold mb-1">What is PWA List?</h2>
        <div className="text-base text-gray-500 dark:text-gray-300">
          <p>In PWA List, you can search for Progressive Web Apps by category, tag, and app name.</p>
          <p>
            <span className="mr-2">PWA runs on a web browser and can also be installed like a native app.</span>
            <Link href="/about" as="/about">
              <a className="text-blue-400">Learn more.</a>
            </Link>
          </p>
        </div>
      </div>
      <div className="flex flex-col items-center border-t-2 text-center mb-3 md:hidden">
        <div className="text-base mt-5">
          <div>
            <Link href="/about" as="/about">
              <a className="mr-3">About</a>
            </Link>
            {loginUser ? (
              <Link href="/submissions" as="/submissions">
                <a className="mr-3">Submit app</a>
              </Link>
            ) : (
              <Link href="/sign-up" as="/sign-up">
                <a className="mr-3">Submit app</a>
              </Link>
            )}
            <a className="mr-3" target="_blank" href="mailto:hello.pwalist@gmail.com">
              Contact
            </a>
          </div>
          <div className="mt-1">
            <Link href="/terms-privacy" as="/terms-privacy">
              <a className="mr-2">Terms & Privacy</a>
            </Link>
            <a className="mr-2" target="_blank" href="https://twitter.com/pwalist">
              Twitter
            </a>
          </div>
        </div>
        <p className="mt-3">
          Made By&nbsp;
          <a className="text-base" target="_blank" href="https://masakifukunishi.site">
            Masaki
          </a>
        </p>
        <p className="mt-1">&copy; PWA List {date.getFullYear()}</p>
      </div>
    </Layout>
  );
};
export async function getStaticProps() {
  const db = firebase.firestore();
  const applications = await db
    .collection("applications")
    .where("isNewApp", "==", true)
    .where("isPublic", "==", true)
    .orderBy("newAppOrder", "desc")
    .get();
  const apps = applications.docs.map((doc) => ({
    id: doc.id,
    name: doc.data().name,
    nameLowercase: doc.data().nameLowercase,
    icon: doc.data().icon,
    category: doc.data().category,
    tag1: doc.data().tag1,
    tag2: doc.data().tag2,
    tag3: doc.data().tag3,
    description: doc.data().description,
  }));

  return {
    props: { apps },
    // revalidate: 20,
  };
}

export default Index;
