import Modal from "react-modal";
import Link from "next/link";
Modal.setAppElement("#__next");

const CompletedModal = ({ modalsOpen, setModalsOpen }) => {
  return (
    <div>
      <Modal isOpen={modalsOpen}>
        <div className="text-lg text-center pt-28">
          <img src={"/add-complete.svg"} className="w-72 inline" />
          <div className="mt-14">
            Your app submission has been completed successfully.
          </div>
          <div className="mt-1">This app will be published after checking.</div>
          <div className="text-2xl mt-6 mb-7">Thank you</div>
          <div className="mt-4">
            <Link href="/" as="/">
              <button
                className="h-8 w-36 bg-green-400 hover:bg-green-500 text-white font-bold rounded focus:outline-none focus:shadow-outline"
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

export default CompletedModal;
