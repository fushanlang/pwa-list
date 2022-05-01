import Link from "next/link";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faListUl, faSearch } from "@fortawesome/free-solid-svg-icons";

const BottomBar: React.FC = () => {
  const router = useRouter();
  const path = router.pathname;
  return (
    <div className="bottom-0 w-full border-t fixed bg-white dark:bg-gray-800 md:hidden">
      <ul className="flex h-14 justify-around items-center pt-1">
        <li className="text-center pr-6">
          <Link href="/">
            {path === "/" ? (
              <a className="block text-green-500">
                <FontAwesomeIcon icon={faHome} size="lg" className="" />
                <span className="text-xs block">Home</span>
              </a>
            ) : (
              <a className="block hover:text-green-500">
                <FontAwesomeIcon icon={faHome} size="lg" className="" />
                <span className="text-xs block">Home</span>
              </a>
            )}
          </Link>
        </li>
        <li className="text-center">
          <Link href="/search">
            {path === "/search" ? (
              <a className="block text-green-500">
                <FontAwesomeIcon icon={faSearch} size="lg" className="" />
                <span className="text-xs block">Search</span>
              </a>
            ) : (
              <a className="block hover:text-green-500">
                <FontAwesomeIcon icon={faSearch} size="lg" className="" />
                <span className="text-xs block">Search</span>
              </a>
            )}
          </Link>
        </li>
        <li className="text-center">
          <Link href="/categories">
            {path === "/categories" ? (
              <a className="block text-green-500">
                <FontAwesomeIcon icon={faListUl} size="lg" className="" />
                <span className="text-xs block">Categories</span>
              </a>
            ) : (
              <a className="block hover:text-green-500">
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