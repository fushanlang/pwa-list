import Link from "next/link";
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
      </div>
    </div>
  );
};

export default SideBar;
