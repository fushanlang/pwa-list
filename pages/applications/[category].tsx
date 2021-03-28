import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import firebase from "../../plugins/firebase";
import "firebase/firestore";
import Layout from "../../components/Layout";
import ApplicationCard from "../../components/ApplicationCard";

const db = firebase.firestore();
const ApplicationsCategory = () => {
  const [applications, setApplications] = useState([{}]);
  const router = useRouter();
  const { category } = router.query;
  const caategoryFirstUpperCase =
    category.toString().charAt(0).toUpperCase() + category.slice(1);
  useEffect(() => {
    if (!category) {
      return;
    }
    const fetchApplicationsData = async () => {
      const applicationsData = await db
        .collection("applications")
        .where("category", "==", category)
        .get();
      setApplications(
        applicationsData.docs.map((doc) => ({
          id: doc.id,
          name: doc.data().name,
          name_lowercase: doc.data().name_lowercase,
          icon: doc.data().icon,
          category: doc.data().category,
          tag1: doc.data().tag1,
          tag2: doc.data().tag2,
          tag3: doc.data().tag3,
          description: doc.data().description,
        }))
      );
    };
    fetchApplicationsData();
  }, [category]);
  // useEffect(() => {
  //   const unSub = db
  //     .collection("applications")
  //     .where("name", "==", "YouTube")
  //     .get((snapshot) => {
  //       setApplications(
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
    <Layout>
      <div className="text-2xl mb-4">{caategoryFirstUpperCase}</div>
      <div className="ml-1">
        <ApplicationCard applications={applications} />
      </div>
    </Layout>
  );
};

export default ApplicationsCategory;
