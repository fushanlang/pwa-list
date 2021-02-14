import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import firebase from "../../plugins/firebase";
import "firebase/firestore";
import Layout from "../../components/Layout";
import ApplicationCard from "../../components/ApplicationCard";

const db = firebase.firestore();
const ApplicationsCategory = () => {
  const [applications, setApplications] = useState([
    { id: "", name: "", icon: "", overview: "", description: "" },
  ]);
  const router = useRouter();
  const { category } = router.query;
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
          icon: doc.data().icon,
          overview: doc.data().overview,
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
    <Layout title={category}>
      <ApplicationCard applications={applications} />
    </Layout>
  );
};

export default ApplicationsCategory;
