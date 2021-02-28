import Layout from "../components/Layout";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
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

const categories = () => {
  return (
    <div>
      <Layout>
        <div className="text-xl flex flex-col rounded-md bg-white px-7 pt-5 pb-6">
          <p className="text-2xl font-bold mb-4">Categories</p>
          <Link
            href="applications/entertainment"
            as="applications/entertainment"
          >
            <a className="mb-5 transition duration-500 ease-in-out hover:text-green-600">
              <FontAwesomeIcon icon={faStar} size="lg" className="mr-3" />
              Entertainment
            </a>
          </Link>
          <Link href="applications/tools" as="applications/tools">
            <a className="mb-5 transition duration-500 ease-in-out hover:text-green-600">
              <FontAwesomeIcon icon={faHammer} size="lg" className="mr-3" />
              Tools
            </a>
          </Link>
          <Link href="applications/tools" as="applications/game">
            <a className="mb-5 transition duration-500 ease-in-out hover:text-green-600">
              <FontAwesomeIcon icon={faGamepad} size="lg" className="mr-3" />
              Game
            </a>
          </Link>
          <Link href="applications/tools" as="applications/travel">
            <a className="mb-5 transition duration-500 ease-in-out hover:text-green-600">
              <FontAwesomeIcon icon={faPlane} size="lg" className="mr-3" />
              Travel
            </a>
          </Link>
          <Link href="applications/tools" as="applications/business">
            <a className="mb-5 transition duration-500 ease-in-out hover:text-green-600">
              <FontAwesomeIcon icon={faChartBar} size="lg" className="mr-3" />
              Business
            </a>
          </Link>
          <Link href="applications/tools" as="applications/education">
            <a className="mb-5 transition duration-500 ease-in-out hover:text-green-600">
              <FontAwesomeIcon icon={faBookOpen} size="lg" className="mr-3" />
              Education
            </a>
          </Link>
          <Link href="applications/tools" as="applications/tech">
            <a className="mb-5 transition duration-500 ease-in-out hover:text-green-600">
              <FontAwesomeIcon icon={faCode} size="lg" className="mr-3" />
              Tech
            </a>
          </Link>
          <Link href="applications/tools" as="applications/health">
            <a className="mb-5 transition duration-500 ease-in-out hover:text-green-600">
              <FontAwesomeIcon icon={faHeartbeat} size="lg" className="mr-3" />
              Health
            </a>
          </Link>
          <Link href="applications/tools" as="applications/design">
            <a className="mb-5 transition duration-500 ease-in-out hover:text-green-600">
              <FontAwesomeIcon icon={faPalette} size="lg" className="mr-3" />
              Design
            </a>
          </Link>
        </div>
      </Layout>
    </div>
  );
};

export default categories;
