import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { db } from "../../plugins/firebase";
import Layout from "../../components/Layout";
import ApplicationCard from "../../components/ApplicationCard";

const ApplicationsCategory = () => {
  const [applications, setApplications] = useState([
    { id: "", name: "", icon: "" },
  ]);
  const router = useRouter();
  const { category } = router.query;
  useEffect(() => {
    if (category) {
      const fetchApplicationsData = async () => {
        const applicationsSnapShot = await db
          .collection("applications")
          .where("category", "==", category)
          .get();
        setApplications(
          applicationsSnapShot.docs.map((doc) => ({
            id: doc.id,
            name: doc.data().name,
            icon: doc.data().icon,
          }))
        );
      };
      fetchApplicationsData();
    }
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
