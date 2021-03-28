import Link from "next/link";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faListUl, faSearch } from "@fortawesome/free-solid-svg-icons";

const BottomBar = () => {
  const router = useRouter();
  const path = router.pathname;
  console.log(path);
  return (
    <div className="bottom-0 w-full bg-white fixed md:hidden">
      <ul className="flex h-14 justify-around items-center">
        <li className="text-center px-6">
          <Link href="/">
            {path === "/" ? (
              <a className="block px-8 text-green-600">
                <FontAwesomeIcon icon={faHome} size="lg" className="" />
                <span className="text-xs block">Home</span>
              </a>
            ) : (
              <a className="block px-8 transition duration-500 ease-in-out hover:text-green-600">
                <FontAwesomeIcon icon={faHome} size="lg" className="" />
                <span className="text-xs block">Home</span>
              </a>
            )}
          </Link>
        </li>
        <li className="text-center px-6">
          <Link href="/search">
            {path === "/search" ? (
              <a className="block px-8 text-green-600">
                <FontAwesomeIcon icon={faSearch} size="lg" className="" />
                <span className="text-xs block">Search</span>
              </a>
            ) : (
              <a className="block px-8 transition duration-500 ease-in-out hover:text-green-600">
                <FontAwesomeIcon icon={faSearch} size="lg" className="" />
                <span className="text-xs block">Search</span>
              </a>
            )}
          </Link>
        </li>
        <li className="text-center">
          <Link href="/categories">
            {path === "/categories" ? (
              <a className="block px-8 text-green-600">
                <FontAwesomeIcon icon={faListUl} size="lg" className="" />
                <span className="text-xs block">Categories</span>
              </a>
            ) : (
              <a className="block px-8 transition duration-500 ease-in-out hover:text-green-600">
                <FontAwesomeIcon icon={faListUl} size="lg" className="" />
                <span className="text-xs block">Categories</span>
              </a>
            )}
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default BottomBar;
