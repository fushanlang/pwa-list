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
      <div className="text-center">
        <h1 className="font-bold text-2xl">{application.name}</h1>
        {/* <img alt="application-icon" width="50" src={application.icon} /> */}
        <a
          target="_blank"
          rel="noopener noreferrer"
          href={application.url}
          className="inline-block w-64 bg-white shadow-md my-8 p-3 rounded-md hover:bg-gray-200 hover:shadow-none transition ease-in-out"
        >
          VIEW
        </a>
        <p>{application.description}</p>
      </div>
    </Layout>
  );
};

export default ApplicationName;
