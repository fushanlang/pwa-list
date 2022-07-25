import Modal from "react-modal";
import { useTheme } from "next-themes";
import "firebase/firestore";

import firebase from "../../plugins/firebase";
import deleteFromStorage from "../../plugins/image/deleteFromStorage";

const db = firebase.firestore();
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

interface Props {
  modalOpen: boolean;
  setModalOpen: any;
  targetApp: any;
  fetchApps: any;
}

const DeleteModal: React.FC<Props> = ({ modalOpen, setModalOpen, targetApp, fetchApps }) => {
  const handleDeleteApp = async (app) => {
    await db.collection("applications").doc(app.id).delete();
    fetchApps();
    setModalOpen(false);
    await deleteFromStorage("application-icons", app.name, "icon");
    if (app.imageMobile1 !== null) await deleteFromStorage("application-images", app.name, "mobile1");
    if (app.imageMobile2 !== null) await deleteFromStorage("application-images", app.name, "mobile2");
    if (app.imageMobile3 !== null) await deleteFromStorage("application-images", app.name, "mobile3");
    if (app.imagePc1 !== null) await deleteFromStorage("application-images", app.name, "pc1");
    if (app.imagePc2 !== null) await deleteFromStorage("application-images", app.name, "pc2");
    if (app.imagePc3 !== null) await deleteFromStorage("application-images", app.name, "pc3");
  };
  const { theme } = useTheme();

  return (
    <>
      <Modal style={theme === "dark" ? modalStyleDarkMode : modalStyle} isOpen={modalOpen} onRequestClose={() => setModalOpen(false)}>
        <div className="text-center mt-5">
          <img className="inline-block w-20" src={targetApp.icon} />
          <div className="text-xl mb-6">{targetApp.name}</div>
          <div className="text-base mb-5">Are you sure you want to delete this submission?</div>
          <button
            className="text-lg h-10 px-3 mr-2 border rounded text-white bg-red-500 hover:bg-red-600"
            onClick={() => handleDeleteApp(targetApp)}
          >
            Delete
          </button>
          <button className="text-lg h-10 px-3 border rounded hover:bg-gray-100 dark:hover:bg-gray-700" onClick={() => setModalOpen(false)}>
            Cancel
          </button>
        </div>
      </Modal>
    </>
  );
};

export default DeleteModal;
