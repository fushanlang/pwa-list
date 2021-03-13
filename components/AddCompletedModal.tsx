import Modal from "react-modal";
import Link from "next/link";
Modal.setAppElement("#__next");

const AddCompletedModal = ({ modalsOpen, setModalsOpen }) => {
  return (
    <div>
      <Modal isOpen={modalsOpen}>
        <div className="text-center mt-8">
          <div className="text-xl">
            Your app submission has been completed successfully.
          </div>
          <div>This app will be published after checking</div>
          <div>Thank you</div>
          <div className="mt-5">
            <Link href="/" as="/">
              <button
                className="w-48 bg-green-500 hover:bg-green-700 text-white font-bold py-2 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Home
              </button>
            </Link>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default AddCompletedModal;
