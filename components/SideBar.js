import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faStar, faHammer } from "@fortawesome/free-solid-svg-icons";

const SideBar = () => {
  return (
    <div
      id="sideBar"
      className="bg-white border-r border-gray-300 p-6 w-60 hidden md:block"
    >
      <div className="flex flex-col">
        <p className="uppercase text-xs text-gray-600 mb-4">homes</p>
        <Link href="/" as="/">
          <a className="mb-3 text-sm transition duration-500 ease-in-out hover:text-green-600">
            <FontAwesomeIcon icon={faHome} size="xs" className="mr-2" />
            Home
          </a>
        </Link>
        <p className="uppercase text-xs text-gray-600 mb-4 mt-4">categories</p>
        <Link href="/applications/[category]" as="/applications/entertainment">
          <a className="mb-3 text-sm transition duration-500 ease-in-out hover:text-green-600">
            <FontAwesomeIcon icon={faStar} size="xs" className="mr-2" />
            Entertainment
          </a>
        </Link>
        <Link href="/applications/[category]" as="/applications/tools">
          <a className="mb-3 text-sm transition duration-500 ease-in-out hover:text-green-600">
            <FontAwesomeIcon icon={faHammer} size="xs" className="mr-2" />
            Tools
          </a>
        </Link>
      </div>
    </div>
  );
};

export default SideBar;
