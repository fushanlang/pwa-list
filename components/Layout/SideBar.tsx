import Link from "next/link";
import { useContext } from "react";
import { AuthContext } from "../../contexts/Auth";
import { useRouter } from "next/router";
import CategoryLinkForSideBar from "./CategoryLinkForSideBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
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
  faUtensils,
  faMusic,
  faNewspaper,
  faShoppingBag,
  faRunning,
  faShareAlt,
  faHeart,
} from "@fortawesome/free-solid-svg-icons";
library.add(
  faStar,
  faHammer,
  faGamepad,
  faPlane,
  faChartBar,
  faBookOpen,
  faCode,
  faHeartbeat,
  faPalette,
  faUtensils,
  faMusic,
  faNewspaper,
  faShoppingBag,
  faRunning,
  faShareAlt,
  faHeart
);
const SideBar: React.FC = () => {
  const { currentUser } = useContext(AuthContext);
  const router = useRouter();
  const path = router.pathname;
  const date = new Date();
  return (
    <div className="border-r border-gray-300 w-60 hidden md:block overflow-scroll">
      <div className="px-6 pt-3">
        <div className="flex flex-col mt-3 ">
          <Link href="/" as="/">
            {path === "/" ? (
              <a className="text-base mb-3 text-green-500">
                <FontAwesomeIcon icon={faHome} size="xs" className="mr-2" />
                Home
              </a>
            ) : (
              <a className="text-base mb-3 transition duration-500 ease-in-out hover:text-green-500">
                <FontAwesomeIcon icon={faHome} size="xs" className="mr-2" />
                Home
              </a>
            )}
          </Link>
          <Link href="/search" as="/search">
            {path === "/search" ? (
              <a className="text-base mb-3 text-green-500">
                <FontAwesomeIcon icon={faSearch} size="xs" className="mr-2" />
                Search
              </a>
            ) : (
              <a className="text-base mb-3 hover:text-green-500">
                <FontAwesomeIcon icon={faSearch} size="xs" className="mr-2" />
                Search
              </a>
            )}
          </Link>
          <p className="mb-3 mt-1">CATEGORIES</p>
          <CategoryLinkForSideBar categoryName="business" iconName="chart-bar" />
          <CategoryLinkForSideBar categoryName="design" iconName="palette" />
          <CategoryLinkForSideBar categoryName="education" iconName="book-open" />
          <CategoryLinkForSideBar categoryName="entertainment" iconName="star" />
          <CategoryLinkForSideBar categoryName="food" iconName="utensils" />
          <CategoryLinkForSideBar categoryName="games" iconName="gamepad" />
          <CategoryLinkForSideBar categoryName="health" iconName="heartbeat" />
          <CategoryLinkForSideBar categoryName="music" iconName="music" />
          <CategoryLinkForSideBar categoryName="news" iconName="newspaper" />
          <CategoryLinkForSideBar categoryName="shopping" iconName="shopping-bag" />
          <CategoryLinkForSideBar categoryName="social" iconName="share-alt" />
          <CategoryLinkForSideBar categoryName="sports" iconName="running" />
          <CategoryLinkForSideBar categoryName="tech" iconName="code" />
          <CategoryLinkForSideBar categoryName="tools" iconName="hammer" />
          <CategoryLinkForSideBar categoryName="travel" iconName="plane" />
        </div>
      </div>
      <div className="mb-2 w-60 text-center">
        <div className="w-full border-t-2">
          <Link href="/about" as="/about">
            <a className="w-40 inline-block mt-5 mb-1 py-1 text-gray-50 bg-gray-600 shadow-md rounded-2xl hover:bg-gray-700 hover:shadow-none transition ease-in-out">
              <strong>What is a PWA</strong>
            </a>
          </Link>
          {currentUser ? (
            <Link href="/submissions" as="/submissions">
              <a className="w-40 inline-block mt-2 mb-1 py-1 text-gray-50 bg-green-400 shadow-md rounded-2xl hover:bg-green-500 hover:shadow-none transition ease-in-out">
                <strong>Submit App</strong>
              </a>
            </Link>
          ) : (
            <Link href="/sign-up" as="/sign-up">
              <a className="w-40 inline-block mt-2 mb-1 py-1 text-gray-50 bg-green-400 shadow-md rounded-2xl hover:bg-green-500 hover:shadow-none transition ease-in-out">
                <strong>Submit App</strong>
              </a>
            </Link>
          )}
          <div className="mt-3 text-xs text-green-500">
            <div>
              <Link href="/terms-privacy" as="/terms-privacy">
                <a className="mt-1">Terms of Service & Privacy</a>
              </Link>
            </div>
            <div>
              <a className="text-green-500" target="_blank" href="mailto:hello.pwalist@gmail.com">
                Contact
              </a>
            </div>
          </div>
          <p className="mt-2">
            Made By&nbsp;
            <a className="text-green-500 text-base" target="_blank" href="https://masakifukunishi.site">
              Masaki
            </a>
          </p>
          <p className="text-xs mt-2">&copy; PWA List {date.getFullYear()}</p>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
