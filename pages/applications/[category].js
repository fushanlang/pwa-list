import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { db } from "../../plugins/firebase";
import Layout from "../../components/Layout";
import ApplicationCard from "../../components/ApplicationCard";

const ApplicationsCategory = () => {
  const [applications, setApplications] = useState([
    { id: "", title: "", icon: "" },
  ]);
  const router = useRouter();
  const { category } = router.query;
  useEffect(() => {
    const fetchApplicationData = async () => {
      const applicationSnapShot = await db
        .collection("applications")
        .where("category", "==", category)
        .get();
      setApplications(
        applicationSnapShot.docs.map((doc) => ({
          id: doc.id,
          title: doc.data().title,
          icon: doc.data().icon,
        }))
      );
    };
    fetchApplicationData();
  }, [category]);
  // useEffect(() => {
  //   const unSub = db
  //     .collection("applications")
  //     .where("title", "==", "YouTube")
  //     .get((snapshot) => {
  //       setApplications(
  //         snapshot.docs.map((doc) => ({
  //           id: doc.id,
  //           title: doc.data().title,
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
