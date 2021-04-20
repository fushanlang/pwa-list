import Link from "next/link";
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
  faNotesMedical,
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
  faNotesMedical,
  faHeart
);
const SideBar = () => {
  const router = useRouter();
  const path = router.pathname;
  const date = new Date();
  return (
    <div
      id="sideBar"
      className="bg-white border-r border-gray-300 w-60 hidden md:block overflow-scroll"
    >
      <div id="sideBar" className="p-6">
        <div className="flex flex-col mt-3 ">
          <Link href="/" as="/">
            {path === "/" ? (
              <a className="text-base mb-3 text-green-600">
                <FontAwesomeIcon icon={faHome} size="xs" className="mr-2" />
                Home
              </a>
            ) : (
              <a className="text-base mb-3 transition duration-500 ease-in-out hover:text-green-600">
                <FontAwesomeIcon icon={faHome} size="xs" className="mr-2" />
                Home
              </a>
            )}
          </Link>
          <Link href="/search" as="/search">
            {path === "/search" ? (
              <a className="text-base mb-3 text-green-600">
                <FontAwesomeIcon icon={faSearch} size="xs" className="mr-2" />
                Search
              </a>
            ) : (
              <a className="text-base mb-3 transition duration-500 ease-in-out hover:text-green-600">
                <FontAwesomeIcon icon={faSearch} size="xs" className="mr-2" />
                Search
              </a>
            )}
          </Link>
          <p className="uppercase text-gray-600 mb-3 mt-2">categories</p>
          <CategoryLinkForSideBar
            categoryName="business"
            iconName="chart-bar"
          />
          <CategoryLinkForSideBar categoryName="dating" iconName="heart" />
          <CategoryLinkForSideBar categoryName="design" iconName="palette" />
          <CategoryLinkForSideBar
            categoryName="education"
            iconName="book-open"
          />
          <CategoryLinkForSideBar
            categoryName="entertainment"
            iconName="star"
          />
          <CategoryLinkForSideBar categoryName="food" iconName="utensils" />
          <CategoryLinkForSideBar categoryName="game" iconName="gamepad" />
          <CategoryLinkForSideBar categoryName="health" iconName="heartbeat" />
          <CategoryLinkForSideBar
            categoryName="medical"
            iconName="notes-medical"
          />
          <CategoryLinkForSideBar categoryName="music" iconName="music" />
          <CategoryLinkForSideBar categoryName="news" iconName="newspaper" />
          <CategoryLinkForSideBar
            categoryName="shopping"
            iconName="shopping-bag"
          />
          <CategoryLinkForSideBar categoryName="social" iconName="share-alt" />
          <CategoryLinkForSideBar categoryName="sports" iconName="running" />
          <CategoryLinkForSideBar categoryName="tech" iconName="code" />
          <CategoryLinkForSideBar categoryName="tools" iconName="hammer" />
          <CategoryLinkForSideBar categoryName="travel" iconName="plane" />
        </div>
      </div>
      <div className="mt-1 mb-2 w-60 text-center">
        <div className="w-full border-t-2">
          <Link href="/add" as="/add">
            <a className="inline-block mt-5 mb-1 px-4 py-1 text-gray-50 bg-green-400 shadow-md rounded-md hover:bg-green-500 hover:shadow-none transition ease-in-out">
              <strong>Submit Your App</strong>
            </a>
          </Link>
          <p className="text-sm mt-2">
            Made By&nbsp;
            <a
              className="text-green-500"
              target="_blank"
              rel="noopener noreferrer"
              href="https://masakifukunishi.site"
            >
              Masaki
            </a>
          </p>
          <p className="text-xs mt-2">&copy; PWA LIST {date.getFullYear()}</p>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
