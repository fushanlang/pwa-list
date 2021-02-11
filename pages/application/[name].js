import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { db } from "../../plugins/firebase";
import Layout from "../../components/Layout";

const ApplicationName = () => {
  const [application, setApplication] = useState([]);
  const router = useRouter();
  const { name } = router.query;
  useEffect(() => {
    if (!name) {
      return;
    }
    const fetchApplicationData = async () => {
      const applicationData = await db
        .collection("applications")
        .where("name", "==", name)
        .get();
      //   if (applicationData.empty) {
      //     res.statusCode = 404;
      //     return;
      //   }
      setApplication(applicationData.docs[0].data());
    };
    fetchApplicationData();
  }, [name]);
  return (
    <Layout title={application.name}>
      <h1>{application.name}</h1>
      <img alt="application-icon" width="50" src={application.icon} />
      <p>{application.url}</p>
      <p>{application.description}</p>
    </Layout>
  );
};

export default ApplicationName;
