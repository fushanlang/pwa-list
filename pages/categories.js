import Layout from "../components/Layout";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faHammer } from "@fortawesome/free-solid-svg-icons";

const categories = () => {
  return (
    <div>
      {" "}
      <Layout title="Home">
        <div className="text-xl flex flex-col">
          <p className="font-bold mb-4 ml-1">Categories</p>
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
        </div>
      </Layout>
    </div>
  );
};

export default categories;
