import Link from "next/link";
import { NextPage } from "next";
import AdSense from "react-adsense";
import { GOOGLE_ADSENSE_CLIENT } from "../plugins/googleAdsense";

import { db } from "../plugins/firebase";
import mapToCardApp from "../plugins/common/mapToCardApp";
import mapToFeaturedApp from "../plugins/common/mapToFeaturedApp";
import Layout from "../components/Layout/Layout";
import FeaturedCard from "../components/App/FeaturedCard";
import Card from "../components/App/Card";
import ChangeThemeButton from "../components/Common/ChangeThemeButton";
import type { CardApp } from "../types/apps";
import type { FeaturedApp } from "../types/apps";

type Props = { newApps: CardApp[]; featuredApps: FeaturedApp[] };

const Index: NextPage<Props> = ({ newApps, featuredApps }) => {
  return (
    <Layout title="Home">
      <div className="min-h-screen p-6">
        <div className="flex justify-between mt-3">
          <h1 className="text-3xl font-bold" style={{ fontFamily: "'Nunito', sans-serif" }}>
            <Link href="/" as="/">
              <a>
                P<span className="text-green-500">W</span>A LIST
              </a>
            </Link>
          </h1>
          <ChangeThemeButton />
        </div>
        <div>
          <div className="mt-2">
            <h2 className="text-lg font-semibold">Featured apps</h2>
            <div className="flex py-3 mb-3 overflow-scroll">
              {featuredApps.map((app) => (
                <FeaturedCard app={app} key={app.id} />
              ))}
            </div>
          </div>
          <div className="mt-2">
            <h2 className="text-lg font-semibold">New apps</h2>
            <p className="text-base text-gray-500 dark:text-gray-300">Recently added Progressive Web Apps</p>
          </div>
          <div className="mt-3">
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
              {newApps.map((app) => (
                <Card app={app} key={app.id} />
              ))}
            </div>
          </div>
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
      <div className="border-t-2 text-center mb-3 md:hidden">
        <div className="text-base mt-5">
          <div>
            <Link href="/about" as="/about">
              <a className="mr-3">About</a>
            </Link>
            <Link href="/submissions" as="/submissions">
              <a className="mr-3">Submit app</a>
            </Link>
            <a className="mr-3" target="_blank" href="mailto:hello.pwalist@gmail.com">
              Contact
            </a>
          </div>
          <div className="mt-1">
            <Link href="/privacy" as="/privacy">
              <a className="mr-2">Privacy</a>
            </Link>
            <a className="mr-2" target="_blank" href="https://twitter.com/pwalist">
              Twitter
            </a>
          </div>
        </div>
        <p className="mt-3">
          Made By
          <a className="text-base ml-1" target="_blank" href="https://masakifukunishi.site">
            Masaki
          </a>
        </p>
        <p className="mt-1">&copy; PWA List {new Date().getFullYear()}</p>
      </div>
    </Layout>
  );
};
export async function getStaticProps() {
  const newApps = await db
    .collection("applications")
    .where("isNewApp", "==", true)
    .where("isPublic", "==", true)
    .orderBy("newAppOrder", "desc")
    .get();

  const featuredApps = await db
    .collection("applications")
    .where("isFeatured", "==", true)
    .where("isPublic", "==", true)
    .orderBy("featuredOrder", "asc")
    .get();

  return {
    props: {
      newApps: newApps.docs.map((doc) => mapToCardApp(doc)),
      featuredApps: featuredApps.docs.map((doc) => mapToFeaturedApp(doc)),
    },
    // revalidate: 20,
  };
}

export default Index;
