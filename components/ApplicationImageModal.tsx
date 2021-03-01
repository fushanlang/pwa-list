import React, { useState } from "react";
import Image from "next/image";
import Modal from "react-modal";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import "swiper/swiper-bundle.min.css";
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);
Modal.setAppElement("#__next");

const ApplocationImageModal = ({
  application,
  modalsOpen,
  setModalsOpen,
  initialSlide,
}) => {
  return (
    <div>
      <Modal isOpen={modalsOpen} onRequestClose={() => setModalsOpen(false)}>
        <div className="text-center mt-8">
          <Swiper
            spaceBetween={50}
            slidesPerView={1}
            initialSlide={initialSlide}
            navigation
            onSlideChange={() => console.log("slide change")}
            onSwiper={(swiper) => console.log(swiper)}
          >
            <SwiperSlide>
              <Image
                width={380}
                height={680}
                className="rounded-lg"
                src={application.image_mobile1}
              />
            </SwiperSlide>
            <SwiperSlide>
              <Image
                width={380}
                height={680}
                className="rounded-lg"
                src={application.image_mobile2}
              />
            </SwiperSlide>
            <SwiperSlide className="hidden lg:inline-block">
              <Image
                width={1320}
                height={680}
                className="rounded-lg"
                src={application.image_pc1}
              />
            </SwiperSlide>
            <SwiperSlide className="hidden lg:inline-block">
              <Image
                width={1320}
                height={680}
                className="rounded-lg"
                src={application.image_pc2}
              />
            </SwiperSlide>
          </Swiper>
        </div>
      </Modal>
    </div>
  );
};

export default ApplocationImageModal;
