import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import firebase from "../../plugins/firebase";
import "firebase/firestore";
import Layout from "../../components/Layout";
import NotFound from "../../components/NotFound";

const db = firebase.firestore();
const ApplicationName = (applicationData) => {
  const application = applicationData.applicationData;
  return (
    <Layout title={application.name}>
      {application.name === undefined ? (
        <NotFound />
      ) : (
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
      )}
    </Layout>
  );
};

ApplicationName.getInitialProps = async ({ query }) => {
  const { name } = query;
  const applicationDataDb = await db
    .collection("applications")
    .where("name", "==", name)
    .get();
  if (applicationDataDb.empty) {
    return {
      applicationData: [],
    };
  }
  const application = applicationDataDb.docs[0].data();
  const returnApplicationData = {
    name: application.name,
    url: application.url,
    description: application.description,
  };
  return {
    applicationData: returnApplicationData,
  };
};
export default ApplicationName;
