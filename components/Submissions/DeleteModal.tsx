import Modal from "react-modal";
import Image from "next/image";
import { useTheme } from "next-themes";
import { useDispatch } from "react-redux";

import { remove } from "../../store/modules/userApps";
import { db } from "../../plugins/firebase";
import deleteFromStorage from "../../plugins/image/deleteFromStorage";
import { SubmissionTableApp } from "../../types/apps";

type Props = {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  targetApp: SubmissionTableApp;
};

const DeleteModal: React.FC<Props> = ({ isModalOpen, setIsModalOpen, targetApp }) => {
  Modal.setAppElement("#__next");

  const modalStyle = {
    overlay: {
      position: "fixed",
      backgroundColor: "rgba(0,0,0,0.85)",
      textAlign: "center",
    },
    content: {
      position: "absolute",
      left: "0",
      right: "0",
      margin: "auto",
      width: "355px",
      height: "420px",
      backgroundColor: "white",
      borderRadius: "1rem",
    },
  };
  let modalStyleDarkMode = JSON.parse(JSON.stringify(modalStyle));
  modalStyleDarkMode.content.backgroundColor = "rgb(31 41 55)";

  const dispatch = useDispatch();
  const dleteApp = async (app) => {
    try {
      deleteFromStorage("application-icons", app.name);
      deleteFromStorage("application-images", app.name);
      await db.collection("applications").doc(app.id).delete();
      dispatch(remove(app.id));
    } catch (e) {
      alert("An error occurred while deleting");
    } finally {
      setIsModalOpen(false);
    }
  };
  const { theme } = useTheme();

  return (
    <Modal style={theme === "dark" ? modalStyleDarkMode : modalStyle} isOpen={isModalOpen} onRequestClose={() => setIsModalOpen(false)}>
      <div className="text-center mt-5">
        <Image className="rounded-md w-20" alt="icon" src={targetApp.icon} width={100} height={100} objectFit="contain" />
        <div className="text-xl mt-1 mb-6">{targetApp.name}</div>
        <div className="text-base mb-5">Are you sure you want to delete this submission?</div>
        <button
          className="text-lg h-10 px-3 mr-2 border rounded text-white bg-red-500 hover:bg-red-600"
          onClick={() => dleteApp(targetApp)}
        >
          Delete
        </button>
        <button className="text-lg h-10 px-3 border rounded hover:bg-gray-100 dark:hover:bg-gray-700" onClick={() => setIsModalOpen(false)}>
          Cancel
        </button>
      </div>
    </Modal>
  );
};

export default DeleteModal;
