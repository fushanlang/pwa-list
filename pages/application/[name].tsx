import React, { useState } from "react";
import firebase from "../../plugins/firebase";
import "firebase/firestore";
import Layout from "../../components/Layout";
import NotFound from "../../components/NotFound";
import ApplocationImageModal from "../../components/ApplocationImageModal";

const db = firebase.firestore();
const ApplicationName = (applicationData) => {
  const [modalsOpen, setModalsOpen] = useState(false);
  const [initialSlide, setInitialSlide] = useState(0);
  const application = applicationData.applicationData;
  return (
    <Layout>
      {application.name === undefined ? (
        <NotFound />
      ) : (
        <div className="text-center bg-white px-4 py-12 rounded-lg">
          <h1 className="font-bold text-3xl mb-5">{application.name}</h1>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href={application.url}
            className="inline-block w-60 text-lg text-gray-50 bg-green-400 shadow-md p-1 rounded-md hover:bg-green-600 hover:shadow-none transition ease-in-out"
          >
            VIEW
          </a>
          <div className="flex mt-6 overflow-scroll">
            <img
              onClick={() => {
                setModalsOpen(true);
                setInitialSlide(0);
              }}
              className="rounded-lg max-h-96 mx-2 cursor-pointer"
              src={application.image_smartphone1}
            />
            <img
              onClick={() => {
                setModalsOpen(true);
                setInitialSlide(1);
              }}
              className="rounded-lg max-h-96 mx-2 cursor-pointer"
              src={application.image_smartphone2}
            />
            <img
              onClick={() => {
                setModalsOpen(true);
                setInitialSlide(2);
              }}
              className="rounded-lg max-h-96 mx-2 cursor-pointer hidden lg:inline-block"
              src={application.image_pc1}
            />
            <img
              onClick={() => {
                setModalsOpen(true);
                setInitialSlide(3);
              }}
              className="rounded-lg max-h-96 mx-2 cursor-pointer hidden lg:inline-block "
              src={application.image_pc2}
            />
          </div>
          <div className="mt-7 px-4">
            <h3 className="text-left font-bold text-xl mb-2">About this app</h3>
            <p className="text-left text-base">{application.description}</p>
          </div>
          <ApplocationImageModal
            application={application}
            modalsOpen={modalsOpen}
            setModalsOpen={setModalsOpen}
            initialSlide={initialSlide}
          />
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
    image_pc1: application.image_pc1,
    image_pc2: application.image_pc2,
    image_smartphone1: application.image_smartphone1,
    image_smartphone2: application.image_smartphone2,
  };
  return {
    applicationData: returnApplicationData,
  };
};
export default ApplicationName;
