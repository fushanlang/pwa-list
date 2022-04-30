import Modal from "react-modal";
import { useTheme } from "next-themes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import "swiper/swiper-bundle.min.css";
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);
Modal.setAppElement("#__next");

interface Props {
  app: any;
  modalIsOpen: boolean;
  setModalIsOpen: any;
  initialSlide: number;
}

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
let modalStyleDarkMode = JSON.parse(JSON.stringify(modalStyle));
modalStyleDarkMode.content.backgroundColor = "rgb(31 41 55)";

const ImageModal: React.FC<Props> = ({ app, modalIsOpen, setModalIsOpen, initialSlide }) => {
  const { theme } = useTheme();
  return (
    <div>
      <Modal
        isOpen={modalIsOpen}
        style={theme === "dark" ? modalStyleDarkMode : modalStyle}
        onRequestClose={() => setModalIsOpen(false)}
      >
        <div className="text-center">
          <button onClick={() => setModalIsOpen(false)}>
            <FontAwesomeIcon size="2x" className="text-green-400 absolute top-5 right-5" icon={faTimesCircle} />
          </button>
          <Swiper className="mt-2" id="swiper" spaceBetween={50} slidesPerView={1} initialSlide={initialSlide} navigation>
            <div>
              {app.imageMobile1 !== null && (
                <SwiperSlide>
                  <img style={{ maxHeight: "680px" }} className="border rounded-lg inline" src={app.imageMobile1} />
                </SwiperSlide>
              )}
              {app.imageMobile2 !== null && (
                <SwiperSlide>
                  <img style={{ maxHeight: "680px" }} className="border rounded-lg inline" src={app.imageMobile2} />
                </SwiperSlide>
              )}
              {app.imageMobile3 !== null && (
                <SwiperSlide>
                  <img style={{ maxHeight: "680px" }} className="border rounded-lg inline" src={app.imageMobile3} />
                </SwiperSlide>
              )}
              {app.imagePc1 !== null && (
                <SwiperSlide className="hidden lg:inline-block">
                  <img style={{ maxHeight: "680px" }} className="border rounded-lg inline mt-20 xl:mt-0" src={app.imagePc1} />
                </SwiperSlide>
              )}
              {app.imagePc2 !== null && (
                <SwiperSlide className="hidden lg:inline-block">
                  <img style={{ maxHeight: "680px" }} className="border rounded-lg inline mt-20 xl:mt-0" src={app.imagePc2} />
                </SwiperSlide>
              )}
              {app.imagePc3 !== null && (
                <SwiperSlide className="hidden lg:inline-block">
                  <img style={{ maxHeight: "680px" }} className="border rounded-lg inline mt-20 xl:mt-0" src={app.imagePc3} />
                </SwiperSlide>
              )}
            </div>
          </Swiper>
        </div>
      </Modal>
    </div>
  );
};

export default ImageModal;
