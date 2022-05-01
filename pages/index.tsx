import { useContext } from "react";
import Link from "next/link";
import firebase from "../plugins/firebase";
import "firebase/firestore";
import { NextPage } from "next";
import AdSense from "react-adsense";
import { GOOGLE_ADSENSE_CLIENT } from "../plugins/googleAdsense";
import Layout from "../components/Layout/Layout";
import Card from "../components/App/Card";
import ChangeThemeButton from "../components/Common/ChangeThemeButton";
import { AuthContext } from "../contexts/Auth";

const db = firebase.firestore();
const logo = {
  fontFamily: "'Nunito', sans-serif",
};
interface Props {
  apps: object;
}
const Index: NextPage<Props> = ({ apps }) => {
  const { currentUser } = useContext(AuthContext);
  const date = new Date();
  return (
    <Layout title="Home">
      <div className="px-2">
        <div className="flex mt-3 justify-between">
          <h1 className="text-3xl font-bold" style={logo}>
            P<span className="text-green-500">W</span>A LIST
          </h1>
          <span className="mr-2">
            <ChangeThemeButton />
          </span>
        </div>
        <div>
          <div className="text-xl font-bold mt-3">
            <span className="text-xl px-2 py-0.5 mr-1">!! New Apps !!</span>
          </div>
          <div className="mt-2">
            <Card apps={apps} />
          </div>
          {/* Google Adsense start*/}
          {/* <div className="overflow-scroll text-center mt-10">
              <AdSense.Google
                client={GOOGLE_ADSENSE_CLIENT}
                slot="6767679949"
                style={{ width: 970, height: 90 }}
                format=""
              />
            </div> */}
          {/* Google Adsense end*/}
          <div className="flex flex-col items-center text-center mt-7 md:hidden">
            <Link href="/about" as="/about">
              <a className="py-2 w-48 mb-4 text-white bg-gray-500 rounded-2xl hover:bg-gray-600">
                <strong>What is a PWA</strong>
              </a>
            </Link>

            {currentUser ? (
              <Link href="/submissions" as="/submissions">
                <a className="py-2 w-48 mb-3 text-white bg-green-500 rounded-2xl hover:bg-green-600">
                  <strong>Submit App</strong>
                </a>
              </Link>
            ) : (
              <Link href="/sign-up" as="/sign-up">
                <a className="py-2 w-48 mb-3 text-white bg-green-400 rounded-2xl hover:bg-green-500">
                  <strong>Submit App</strong>
                </a>
              </Link>
            )}
            <div className="mt-2 text-xs text-green-500">
              <div>
                <Link href="/terms-privacy" as="/terms-privacy">
                  <a className="text-base mt-1">Terms of Service & Privacy</a>
                </Link>
              </div>
              <div>
                <a className="text-base text-green-500" target="_blank" href="mailto:hello.pwalist@gmail.com">
                  Contact
                </a>
              </div>
            </div>
            <p className="mt-2">
              Made By&nbsp;
              <a className="text-green-500 text-base" target="_blank" href="https://masakifukunishi.site">
                Masaki
              </a>
            </p>
            <p className="mt-1">&copy; PWA List {date.getFullYear()}</p>
          </div>
        </div>
      </div>
    </Layout>
  );
};
export async function getStaticProps() {
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
    revalidate: 10,
  };
}

export default Index;
