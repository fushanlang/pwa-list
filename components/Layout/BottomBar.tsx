import Link from "next/link";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faListUl, faSearch } from "@fortawesome/free-solid-svg-icons";

const BottomBar: React.FC = () => {
  const router = useRouter();
  const path = router.pathname;
  return (
    <div className="fixed bottom-0 w-full border-t bg-white dark:bg-gray-800 md:hidden">
      <ul className="flex justify-around items-center h-14 pt-1">
        <li className="text-center w-20">
          <Link href="/">
            {path === "/" ? (
              <a className="block text-green-500">
                <FontAwesomeIcon icon={faHome} size="lg" />
                <div className="text-xs">Home</div>
              </a>
            ) : (
              <a className="block hover:text-green-500">
                <FontAwesomeIcon icon={faHome} size="lg" />
                <div className="text-xs">Home</div>
              </a>
            )}
          </Link>
        </li>
        <li className="text-center w-20">
          <Link href="/search">
            {path === "/search" ? (
              <a className="block text-green-500">
                <FontAwesomeIcon icon={faSearch} size="lg" />
                <div className="text-xs">Search</div>
              </a>
            ) : (
              <a className="block hover:text-green-500">
                <FontAwesomeIcon icon={faSearch} size="lg" />
                <div className="text-xs">Search</div>
              </a>
            )}
          </Link>
        </li>
        <li className="text-center w-20">
          <Link href="/categories">
            {path === "/categories" ? (
              <a className="block text-green-500">
                <FontAwesomeIcon icon={faListUl} size="lg" />
                <div className="text-xs">Categories</div>
              </a>
            ) : (
              <a className="block hover:text-green-500">
                <FontAwesomeIcon icon={faListUl} size="lg" />
                <div className="text-xs">Categories</div>
              </a>
            )}
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default BottomBar;
