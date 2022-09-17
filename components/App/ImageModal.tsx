import Modal from "react-modal";
import { useTheme } from "next-themes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import "swiper/swiper-bundle.min.css";

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);
Modal.setAppElement("#__next");

type Props = {
  imageUrls: string[];
  modalIsOpen: boolean;
  setModalIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  initialSlide: number;
};

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

const ImageModal: React.FC<Props> = ({ imageUrls, modalIsOpen, setModalIsOpen, initialSlide }) => {
  let modalStyleDarkMode = JSON.parse(JSON.stringify(modalStyle));
  modalStyleDarkMode.content.backgroundColor = "rgb(31 41 55)";

  const { theme } = useTheme();

  return (
    <div>
      <Modal isOpen={modalIsOpen} style={theme === "dark" ? modalStyleDarkMode : modalStyle} onRequestClose={() => setModalIsOpen(false)}>
        <div className="text-center">
          <button onClick={() => setModalIsOpen(false)}>
            <FontAwesomeIcon size="2x" className="text-green-400 absolute top-5 right-5" icon={faTimesCircle} />
          </button>
          <Swiper className="mt-2" id="swiper" spaceBetween={50} slidesPerView={1} initialSlide={initialSlide} navigation>
            {imageUrls.map((url, index) => (
              <SwiperSlide key={url}>
                <img style={{ maxHeight: "680px" }} className="border rounded-lg inline" src={url} alt={`screenshot${index}`} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </Modal>
    </div>
  );
};

export default ImageModal;
