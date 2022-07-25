import Modal from "react-modal";
import { useTheme } from "next-themes";
import Link from "next/link";

import Loading from "../../components/Common/Loading";

interface Props {
  modalOpen: boolean;
  isSubmitting: boolean;
}

const CompletedModal: React.FC<Props> = ({ modalOpen, isSubmitting }) => {
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
      top: "4rem",
      left: "3rem",
      right: "3rem",
      bottom: "4rem",
      backgroundColor: "white",
      borderRadius: "1rem",
      padding: "1.5rem",
    },
  };
  let modalStyleDarkMode = JSON.parse(JSON.stringify(modalStyle));
  modalStyleDarkMode.content.backgroundColor = "rgb(31 41 55)";
  const { theme } = useTheme();

  return (
    <div>
      <Modal style={theme === "dark" ? modalStyleDarkMode : modalStyle} isOpen={modalOpen}>
        {isSubmitting ? (
          <div className="text-center mt-64">
            <Loading />
            <div className="text-xl mt-10">submitting...</div>
          </div>
        ) : (
          <div className="text-lg text-center pt-28">
            <img src={"/add-complete.svg"} className="w-72 inline" />
            <div className="mt-14">Your app submission has been completed successfully.</div>
            <div className="mt-1">This app will be published after checking.</div>
            <div className="text-2xl mt-6 mb-7">Thank you</div>
            <div className="mt-4">
              <Link href="/submissions" as="/submissions">
                <button className="py-1 px-5 bg-green-400 hover:bg-green-500 text-white rounded focus:outline-none" type="submit">
                  Check Submission
                </button>
              </Link>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default CompletedModal;
