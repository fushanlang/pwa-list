import React, { useState } from "react";
import Image from "next/image";
import Router from "next/router";
import firebase from "../../plugins/firebase";
import "firebase/firestore";
import Layout from "../../components/Layout";
import NotFound from "../../components/NotFound";
import ApplicationImageModal from "../../components/ApplicationImageModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink, faChevronLeft } from "@fortawesome/free-solid-svg-icons";

const db = firebase.firestore();
const ApplicationName = (applicationData) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [initialSlide, setInitialSlide] = useState(0);
  const application = applicationData.applicationData;
  return (
    <Layout>
      {application.name === undefined ? (
        <NotFound />
      ) : (
        <div className="bg-white px-4 py-7 rounded-lg">
          <button
            className="text-center mb-5 py-1 px-5 inline-block tracking-wide border-2 border-black bg-white shadow-md rounded-md hover:bg-gray-200 hover:shadow-none transition ease-in-out"
            onClick={() => Router.back()}
          >
            <FontAwesomeIcon icon={faChevronLeft} />
            &nbsp;Back
          </button>
          <div className="flex items-center">
            <div className="mr-4 h-20 w-20">
              <img src={application.icon || "/default-app-icon.png"} />
            </div>
            <div className="flex flex-col">
              <h1 className="font-bold text-2xl ml-1">{application.name}</h1>
              <h2 className="text-base ml-1">{application.category}</h2>
              <div className="mt-1">
                {application.tag1 && (
                  <span className="text-xs px-2 py-1 mr-2 rounded bg-gray-600 text-white">
                    {application.tag1}
                  </span>
                )}
                {application.tag2 && (
                  <span className="text-xs px-2 py-1 mr-2 rounded bg-gray-600 text-white">
                    {application.tag2}
                  </span>
                )}
                {application.tag3 && (
                  <span className="text-xs px-2 py-1 mr-2 rounded bg-gray-600 text-white">
                    {application.tag3}
                  </span>
                )}
              </div>
            </div>
          </div>
          <div>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={application.link}
              className="text-center w-60 mt-7 ml-1 py-1 inline-block tracking-wide text-gray-50 bg-green-400 shadow-md rounded-md hover:bg-green-500 hover:shadow-none transition ease-in-out"
            >
              VIEW&nbsp;
              <FontAwesomeIcon icon={faLink} />
            </a>
          </div>
          <div className="flex mt-6 overflow-scroll">
            <img
              onClick={() => {
                setModalIsOpen(true);
                setInitialSlide(0);
              }}
              className="border rounded max-h-96 mx-2 cursor-pointer"
              src={application.imageMobile1}
            />
            <img
              onClick={() => {
                setModalIsOpen(true);
                setInitialSlide(1);
              }}
              className="border rounded max-h-96 mx-2 cursor-pointer"
              src={application.imageMobile2}
            />
            <img
              onClick={() => {
                setModalIsOpen(true);
                setInitialSlide(2);
              }}
              className="border rounded max-h-96 mx-2 cursor-pointer hidden lg:inline-block"
              src={application.imagePc1}
            />
            <img
              onClick={() => {
                setModalIsOpen(true);
                setInitialSlide(3);
              }}
              className="border rounded max-h-96 mx-2 cursor-pointer hidden lg:inline-block "
              src={application.imagePc2}
            />
          </div>
          <div className="mt-7 px-4">
            <h3 className="text-left font-bold text-xl mb-2">About this app</h3>
            <p
              style={{ whiteSpace: "pre-line" }}
              className="text-left text-base"
            >
              {application.description}
            </p>
          </div>
          <ApplicationImageModal
            application={application}
            modalIsOpen={modalIsOpen}
            setModalIsOpen={setModalIsOpen}
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
    .where("nameLowercase", "==", name)
    .where("isPublic", "==", true)
    .get();
  if (applicationDataDb.empty) {
    return {
      applicationData: [],
    };
  }
  const application = applicationDataDb.docs[0].data();
  const returnApplicationData = {
    name: application.name,
    icon: application.icon,
    tag1: application.tag1,
    tag2: application.tag2,
    tag3: application.tag3,
    category: application.category,
    link: application.link,
    description: application.description,
    imagePc1: application.imagePc1,
    imagePc2: application.imagePc2,
    imageMobile1: application.imageMobile1,
    imageMobile2: application.imageMobile2,
  };
  return {
    applicationData: returnApplicationData,
  };
};
export default ApplicationName;
