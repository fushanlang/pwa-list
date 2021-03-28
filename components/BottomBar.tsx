import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faListUl, faSearch } from "@fortawesome/free-solid-svg-icons";

const BottomBar = () => {
  return (
    <div className="bottom-0 w-full bg-white fixed md:hidden">
      <ul className="flex h-14 justify-around items-center">
        <li className="text-center px-6">
          <Link href="/">
            <a className="block px-8 transition duration-500 ease-in-out hover:text-green-600">
              <FontAwesomeIcon icon={faHome} size="lg" className="" />
              <span className="text-xs block">Home</span>
            </a>
          </Link>
        </li>
        <li className="text-center px-6">
          <Link href="/search">
            <a className="block px-8 transition duration-500 ease-in-out hover:text-green-600">
              <FontAwesomeIcon icon={faSearch} size="lg" className="" />
              <span className="text-xs block">Search</span>
            </a>
          </Link>
        </li>
        <li className="text-center">
          <Link href="/categories">
            <a className="block px-8 transition duration-500 ease-in-out hover:text-green-600">
              <FontAwesomeIcon icon={faListUl} size="lg" className="" />
              <span className="text-xs block">Categories</span>
            </a>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default BottomBar;
