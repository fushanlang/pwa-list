import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faSearch,
  faStar,
  faHammer,
  faGamepad,
  faPlane,
  faChartBar,
  faBookOpen,
  faCode,
  faHeartbeat,
  faPalette,
} from "@fortawesome/free-solid-svg-icons";

const SideBar = () => {
  return (
    <div
      id="sideBar"
      className="bg-white border-r border-gray-300 p-6 w-60 hidden md:block overflow-scroll"
    >
      <div className="flex flex-col">
        <p className="uppercase text-xs text-gray-600 mb-4">homes</p>
        <Link href="/" as="/">
          <a className="mb-3 transition duration-500 ease-in-out hover:text-green-600">
            <FontAwesomeIcon icon={faHome} size="xs" className="mr-2" />
            Home
          </a>
        </Link>
        <Link href="/search" as="/search">
          <a className="mb-3 transition duration-500 ease-in-out hover:text-green-600">
            <FontAwesomeIcon icon={faSearch} size="xs" className="mr-2" />
            Search
          </a>
        </Link>
        <p className="uppercase text-xs text-gray-600 mb-4 mt-4">categories</p>
        <Link href="/applications/[category]" as="/applications/entertainment">
          <a className="mb-3 transition duration-500 ease-in-out hover:text-green-600">
            <FontAwesomeIcon icon={faStar} size="xs" className="mr-2" />
            Entertainment
          </a>
        </Link>
        <Link href="/applications/[category]" as="/applications/tools">
          <a className="mb-3 transition duration-500 ease-in-out hover:text-green-600">
            <FontAwesomeIcon icon={faHammer} size="xs" className="mr-2" />
            Tools
          </a>
        </Link>
        <Link href="/applications/[category]" as="/applications/game">
          <a className="mb-3 transition duration-500 ease-in-out hover:text-green-600">
            <FontAwesomeIcon icon={faGamepad} size="xs" className="mr-2" />
            Game
          </a>
        </Link>
        <Link href="/applications/[category]" as="/applications/travel">
          <a className="mb-3 transition duration-500 ease-in-out hover:text-green-600">
            <FontAwesomeIcon icon={faPlane} size="xs" className="mr-2" />
            Travel
          </a>
        </Link>
        <Link href="/applications/[category]" as="/applications/business">
          <a className="mb-3 transition duration-500 ease-in-out hover:text-green-600">
            <FontAwesomeIcon icon={faChartBar} size="xs" className="mr-2" />
            Business
          </a>
        </Link>
        <Link href="/applications/[category]" as="/applications/education">
          <a className="mb-3 transition duration-500 ease-in-out hover:text-green-600">
            <FontAwesomeIcon icon={faBookOpen} size="xs" className="mr-2" />
            Education
          </a>
        </Link>
        <Link href="/applications/[category]" as="/applications/tech">
          <a className="mb-3 transition duration-500 ease-in-out hover:text-green-600">
            <FontAwesomeIcon icon={faCode} size="xs" className="mr-2" />
            Tech
          </a>
        </Link>
        <Link href="/applications/[category]" as="/applications/health">
          <a className="mb-3 transition duration-500 ease-in-out hover:text-green-600">
            <FontAwesomeIcon icon={faHeartbeat} size="xs" className="mr-2" />
            Health
          </a>
        </Link>
        <Link href="/applications/[category]" as="/applications/design">
          <a className="mb-3 transition duration-500 ease-in-out hover:text-green-600">
            <FontAwesomeIcon icon={faPalette} size="xs" className="mr-2" />
            Design
          </a>
        </Link>
        <Link href="/applications/[category]" as="/applications/design">
          <a className="mb-3 transition duration-500 ease-in-out hover:text-green-600">
            <FontAwesomeIcon icon={faPalette} size="xs" className="mr-2" />
            Design
          </a>
        </Link>
        <Link href="/applications/[category]" as="/applications/design">
          <a className="mb-3 transition duration-500 ease-in-out hover:text-green-600">
            <FontAwesomeIcon icon={faPalette} size="xs" className="mr-2" />
            Design
          </a>
        </Link>
        <Link href="/applications/[category]" as="/applications/design">
          <a className="mb-3 transition duration-500 ease-in-out hover:text-green-600">
            <FontAwesomeIcon icon={faPalette} size="xs" className="mr-2" />
            Design
          </a>
        </Link>
        <Link href="/applications/[category]" as="/applications/design">
          <a className="mb-3 transition duration-500 ease-in-out hover:text-green-600">
            <FontAwesomeIcon icon={faPalette} size="xs" className="mr-2" />
            Design
          </a>
        </Link>
        <Link href="/applications/[category]" as="/applications/design">
          <a className="mb-3 transition duration-500 ease-in-out hover:text-green-600">
            <FontAwesomeIcon icon={faPalette} size="xs" className="mr-2" />
            Design
          </a>
        </Link>
        <Link href="/applications/[category]" as="/applications/design">
          <a className="mb-3 transition duration-500 ease-in-out hover:text-green-600">
            <FontAwesomeIcon icon={faPalette} size="xs" className="mr-2" />
            Design
          </a>
        </Link>
        <Link href="/applications/[category]" as="/applications/design">
          <a className="mb-3 transition duration-500 ease-in-out hover:text-green-600">
            <FontAwesomeIcon icon={faPalette} size="xs" className="mr-2" />
            Design
          </a>
        </Link>
        <Link href="/applications/[category]" as="/applications/design">
          <a className="mb-3 transition duration-500 ease-in-out hover:text-green-600">
            <FontAwesomeIcon icon={faPalette} size="xs" className="mr-2" />
            Design
          </a>
        </Link>
        <Link href="/applications/[category]" as="/applications/design">
          <a className="mb-3 transition duration-500 ease-in-out hover:text-green-600">
            <FontAwesomeIcon icon={faPalette} size="xs" className="mr-2" />
            Design
          </a>
        </Link>
      </div>
    </div>
  );
};

export default SideBar;
