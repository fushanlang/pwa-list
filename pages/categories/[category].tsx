import { useState, useEffect } from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import firebase from "../../plugins/firebase";
import "firebase/firestore";
import Layout from "../../components/Layout";
import Card from "../../components/App/Card";
import Loading from "../../components/Common/Loading";

const db = firebase.firestore();
const Category: NextPage = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [apps, setApps] = useState<Object>([]);
  const [caategoryFirstUpperCase, setCaategoryFirstUpperCase] =
    useState<string | null>(null);
  const router = useRouter();
  const { category } = router.query;

  const fetchAppsData = async () => {
    const appssData = await db
      .collection("applications")
      .where("category", "==", category)
      .where("isPublic", "==", true)
      .get();
    setApps(
      appssData.docs.map((doc) => ({
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

  useEffect(() => {
    if (!category) {
      return;
    }
    setCaategoryFirstUpperCase(
      category.toString().charAt(0).toUpperCase() + category.slice(1)
    );
    fetchAppsData();
  }, [category]);
  // useEffect(() => {
  //   const unSub = db
  //     .collection("apps")
  //     .where("name", "==", "YouTube")
  //     .onSnapshot((snapshot) => {
  //       setApps(
  //         snapshot.docs.map((doc) => ({
  //           id: doc.id,
  //           name: doc.data().name,
  //           icon: doc.data().icon,
  //         }))
  //       );
  //     });
  //   return () => unSub();
  // }, []);
  return (
    <Layout title={caategoryFirstUpperCase}>
      <div className="px-2">
        {isLoading ? (
          <Loading />
        ) : (
          <div>
            <div className="text-2xl font-bold mt-3">
              {caategoryFirstUpperCase}
            </div>
            <div className="mt-2">
              <Card apps={apps} />
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Category;
