import Modal from "react-modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import "swiper/swiper-bundle.min.css";
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);
Modal.setAppElement("#__next");
const modalStyle = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    backgroundColor: "rgba(0,0,0,0.85)",
  },
  content: {
    position: "absolute",
    top: "3rem",
    left: "1.3rem",
    right: "1.3rem",
    bottom: "3rem",
    backgroundColor: "white",
    borderRadius: "1rem",
    padding: "1.5rem",
  },
};
const ApplicationImageModal = ({
  application,
  modalIsOpen,
  setModalIsOpen,
  initialSlide,
}) => {
  return (
    <div>
      <Modal
        isOpen={modalIsOpen}
        style={modalStyle}
        onRequestClose={() => setModalIsOpen(false)}
      >
        <div className="text-center">
          <button onClick={() => setModalIsOpen(false)}>
            <FontAwesomeIcon
              size="2x"
              className="text-green-400 absolute top-5 right-5"
              icon={faTimesCircle}
            />
          </button>
          <Swiper
            className="mt-2"
            id="swiper"
            spaceBetween={50}
            slidesPerView={1}
            initialSlide={initialSlide}
            navigation
          >
            <SwiperSlide>
              <img
                className="border rounded-lg inline"
                src={application.imageMobile1}
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                className="border rounded-lg inline"
                src={application.imageMobile2}
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                className="border rounded-lg inline"
                src={application.imageMobile3}
              />
            </SwiperSlide>
            <SwiperSlide className="hidden lg:inline-block">
              <img
                className="border rounded-lg inline w-11/12 mt-20 xl:mt-0"
                src={application.imagePc1}
              />
            </SwiperSlide>
            <SwiperSlide className="hidden lg:inline-block">
              <img
                className="border rounded-lg inline w-11/12 mt-20 xl:mt-0"
                src={application.imagePc2}
              />
            </SwiperSlide>
            <SwiperSlide className="hidden lg:inline-block">
              <img
                className="border rounded-lg inline w-11/12 mt-20 xl:mt-0"
                src={application.imagePc3}
              />
            </SwiperSlide>
          </Swiper>
        </div>
      </Modal>
    </div>
  );
};

export default ApplicationImageModal;
