import React, { useState, useEffect } from "react";
import Image from "next/image";
import firebase from "../../plugins/firebase";
import "firebase/firestore";
import Layout from "../../components/Layout";
import NotFound from "../../components/NotFound";
import Modal from "react-modal";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.min.css";
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from "swiper";
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);
Modal.setAppElement("#__next");

const db = firebase.firestore();
const ApplicationName = (applicationData) => {
  const [modalsOpen, setModalsOpen] = useState(false);
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
              className="rounded-lg max-h-96 mx-2 hidden lg:inline-block"
              src={application.image_pc1}
            />
            <img
              className="rounded-lg max-h-96 mx-2 hidden lg:inline-block"
              src={application.image_pc2}
            />
            <img
              className="rounded-lg max-h-96 mx-2"
              src={application.image_smartphone1}
            />
            <img
              className="rounded-lg max-h-96 mx-2"
              src={application.image_smartphone2}
            />
          </div>
          <div className="mt-7 px-4">
            <h3 className="text-left font-bold text-xl mb-2">About this app</h3>
            <p className="text-left text-base">{application.description}</p>
          </div>

          <button className="" onClick={() => setModalsOpen(true)}>
            Open Modal
          </button>
          <Modal
            className="rounded-none outline-none text-center max-h-96 mt-20 mx-2"
            isOpen={modalsOpen}
            onRequestClose={() => setModalsOpen(false)}
          >
            <div className="">
              <Swiper
                spaceBetween={50}
                slidesPerView={1}
                navigation
                pagination={{ clickable: true }}
                onSlideChange={() => console.log("slide change")}
                onSwiper={(swiper) => console.log(swiper)}
              >
                <SwiperSlide>
                  <Image
                    width={1320}
                    height={680}
                    className="rounded-lg"
                    src={application.image_pc1}
                  />
                </SwiperSlide>
                <SwiperSlide>
                  <Image
                    width={1320}
                    height={680}
                    className="rounded-lg"
                    src={application.image_pc2}
                  />
                </SwiperSlide>
                <SwiperSlide>
                  <Image
                    width={380}
                    height={680}
                    className="rounded-lg"
                    src={application.image_smartphone1}
                  />
                </SwiperSlide>
                <SwiperSlide>
                  <Image
                    width={380}
                    height={680}
                    className="rounded-lg"
                    src={application.image_smartphone2}
                  />
                </SwiperSlide>
              </Swiper>
            </div>
          </Modal>
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
