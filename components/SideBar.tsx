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
  faPalette
);
const SideBar = () => {
  const router = useRouter();
  const path = router.pathname;
  return (
    <div
      id="sideBar"
      className="bg-white border-r border-gray-300 p-6 w-60 hidden md:block overflow-scroll"
    >
      <div className="flex flex-col">
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
        <p className="uppercase text-gray-600 mb-2 mt-2">categories</p>
        <CategoryLinkForSideBar categoryName="entertainment" iconName="star" />
        <CategoryLinkForSideBar categoryName="tools" iconName="hammer" />
        <CategoryLinkForSideBar categoryName="game" iconName="gamepad" />
        <CategoryLinkForSideBar categoryName="travel" iconName="plane" />
        <CategoryLinkForSideBar categoryName="business" iconName="chart-bar" />
        <CategoryLinkForSideBar categoryName="education" iconName="book-open" />
        <CategoryLinkForSideBar categoryName="tech" iconName="code" />
        <CategoryLinkForSideBar categoryName="health" iconName="heartbeat" />
        <CategoryLinkForSideBar categoryName="design" iconName="palette" />
        <CategoryLinkForSideBar categoryName="design" iconName="palette" />
        <CategoryLinkForSideBar categoryName="design" iconName="palette" />
        <CategoryLinkForSideBar categoryName="design" iconName="palette" />
        <CategoryLinkForSideBar categoryName="design" iconName="palette" />
        <CategoryLinkForSideBar categoryName="design" iconName="palette" />
        <CategoryLinkForSideBar categoryName="design" iconName="palette" />
        <CategoryLinkForSideBar categoryName="design" iconName="palette" />
        <CategoryLinkForSideBar categoryName="design" iconName="palette" />
        <CategoryLinkForSideBar categoryName="design" iconName="palette" />
        <CategoryLinkForSideBar categoryName="design" iconName="palette" />
        <CategoryLinkForSideBar categoryName="design" iconName="palette" />
        {/* <div className="mt-10 ">
          <Link href="/add" as="/add">
            <a className="text-center inline-block w-40 text-gray-50 bg-green-400 shadow-md p-1 rounded-md hover:bg-green-600 hover:shadow-none transition ease-in-out">
              <strong>Submit Your App</strong>
            </a>
          </Link>
          <p className="mt-2">Made by Masaki</p>
          <p className="text-xs mt-1">Contact Me</p>
          <p className="text-xs mt-3">&copy; PWA LIST 2021</p>
        </div> */}
      </div>
    </div>
  );
};

export default SideBar;
