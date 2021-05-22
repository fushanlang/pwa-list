import Link from "next/link";
import { useState, useEffect } from "react";
import firebase from "../plugins/firebase";
import "firebase/firestore";
import React from "react";
import AdSense from "react-adsense";
import { GOOGLE_ADSENSE_CLIENT } from "../plugins/googleAdsense";
import Layout from "../components/Layout";
import Card from "../components/App/Card";
const db = firebase.firestore();
const logo = {
  fontFamily: "'Nunito', sans-serif",
};
const Index = () => {
  const [newApps, setNewApps] = useState<Object | null>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const date = new Date();
  useEffect(() => {
    const fetchNewAppData = async () => {
      const applicationsData = await db
        .collection("applications")
        .where("isNewApp", "==", true)
        .where("isPublic", "==", true)
        .orderBy("newAppOrder", "desc")
        .get();
      setNewApps(
        applicationsData.docs.map((doc) => ({
          id: doc.id,
          name: doc.data().name,
          nameLowercase: doc.data().nameLowercase,
          icon: doc.data().icon,
          category: doc.data().category,
          tag1: doc.data().tag1,
          tag2: doc.data().tag2,
          tag3: doc.data().tag3,
          description: doc.data().description,
        }))
      );
      setIsLoading(false);
    };
    fetchNewAppData();
  }, []);
  return (
    <Layout title="Home">
      <div className="px-2">
        <h1 className="text-3xl font-bold mt-3" style={logo}>
          P<span className="text-green-500">W</span>A LIST
        </h1>
        {isLoading ? (
          <div className="text-center mt-44">
            <div className="loader" />
          </div>
        ) : (
          <div>
            <div className="text-xl font-bold mt-6">New Apps</div>
            <div className="mt-2">
              <Card applications={newApps} />
            </div>
            {/* Google Adsense */}
            <div className="overflow-scroll text-center mt-10">
              <AdSense.Google
                client={GOOGLE_ADSENSE_CLIENT}
                slot="6767679949"
                style={{ width: 970, height: 90 }}
                format=""
              />
            </div>
            {/* Google Adsense */}
            <div className="flex flex-col items-center text-center mt-7 md:hidden">
              <Link href="/about" as="/about">
                <a className="py-1 w-48 mb-3 text-gray-50 bg-gray-600 shadow-md rounded-md hover:bg-gray-700 hover:shadow-none transition ease-in-out">
                  <strong>What is a PWA</strong>
                </a>
              </Link>
              <Link href="/add" as="/add">
                <a className="py-1 w-48 mb-3 text-gray-50 bg-green-400 shadow-md rounded-md hover:bg-green-500 hover:shadow-none transition ease-in-out">
                  <strong>Submit Your App</strong>
                </a>
              </Link>
              <a
                className="py-1 w-48 mb-6 text-gray-50 bg-blue-400 shadow-md rounded-md hover:bg-blue-500 hover:shadow-none transition ease-in-out"
                target="_blank"
                href="https://masakifukunishi.site"
              >
                <strong>Contact</strong>
              </a>
              <p className="text-sm">
                Made By&nbsp;
                <a
                  className="text-green-500"
                  target="_blank"
                  href="https://masakifukunishi.site"
                >
                  Masaki
                </a>
              </p>
              <p className="text-xs">&copy; PWA List {date.getFullYear()}</p>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};
export default Index;
