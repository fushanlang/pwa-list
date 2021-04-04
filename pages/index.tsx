import Layout from "../components/Layout";
import Link from "next/link";
import { useState, useEffect } from "react";
import firebase from "../plugins/firebase";
import "firebase/firestore";
import ApplicationCard from "../components/ApplicationCard";
const db = firebase.firestore();

const Index = () => {
  const [newApps, setNewApps] = useState<Object | null>([]);
  const [featuredApps, setFeaturedApps] = useState<Object | null>([]);
  const date = new Date();
  useEffect(() => {
    const fetchFeaturedAppData = async () => {
      const applicationsData = await db
        .collection("applications")
        .where("isFeatured", "==", true)
        .where("isPublic", "==", true)
        .orderBy("featureOrder")
        .get();
      setFeaturedApps(
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
    };
    fetchFeaturedAppData();
  }, []);
  useEffect(() => {
    const fetchNewAppData = async () => {
      const applicationsData = await db
        .collection("applications")
        .where("isNewApp", "==", true)
        .where("isPublic", "==", true)
        .orderBy("newAppOrder")
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
    };
    fetchNewAppData();
  }, []);
  return (
    <Layout>
      <div className="text-2xl ">PWA LIST</div>
      <div className="font-bold text-xl mt-4">Featured</div>
      <div className="ml-1 mt-2">
        <ApplicationCard applications={featuredApps} />
      </div>
      <div className="font-bold text-xl mt-10">New Apps</div>
      <div className="ml-1 mt-2">
        <ApplicationCard applications={newApps} />
      </div>
      <div className="text-center mt-12 block md:hidden">
        <Link href="/add" as="/add">
          <a className="inline-block mb-2 px-7 py-1 text-gray-50 bg-green-400 shadow-md rounded-md hover:bg-green-600 hover:shadow-none transition ease-in-out">
            <strong>Submit Your App</strong>
          </a>
        </Link>
        <p className="text-sm">
          Made By&nbsp;
          <a
            className="text-green-500"
            target="_blank"
            rel="noopener noreferrer"
            href="https://twitter.com/masakifukunishi"
          >
            Masaki
          </a>
        </p>
        <p className="text-xs">&copy; PWA LIST {date.getFullYear()}</p>
      </div>
    </Layout>
  );
};
export default Index;
