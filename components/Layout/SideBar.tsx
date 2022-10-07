import Link from "next/link";
import { useRouter } from "next/router";
import CategoryLinkForSideBar from "./CategoryLinkForSideBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";

import {
  faBookOpen,
  faChartBar,
  faChild,
  faCode,
  faGamepad,
  faHammer,
  faHome,
  faMusic,
  faNewspaper,
  faPalette,
  faPlane,
  faSearch,
  faShareAlt,
  faShoppingBag,
  faStar,
  faUtensils,
} from "@fortawesome/free-solid-svg-icons";
library.add(
  faBookOpen,
  faChartBar,
  faChild,
  faCode,
  faGamepad,
  faHammer,
  faMusic,
  faNewspaper,
  faPalette,
  faPlane,
  faShareAlt,
  faShoppingBag,
  faStar,
  faUtensils
);
const SideBar: React.FC = () => {
  const router = useRouter();
  const path = router.pathname;
  return (
    <div className="border-gray-300">
      <div className="w-60">
        <div className="px-6 pt-3">
          <div className="flex flex-col mt-4 ">
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
            <p className="mb-3 mt-2">CATEGORIES</p>
            <div className="ml-1">
              <CategoryLinkForSideBar categoryName="business" iconName="chart-bar" />
              <CategoryLinkForSideBar categoryName="design" iconName="palette" />
              <CategoryLinkForSideBar categoryName="education" iconName="book-open" />
              <CategoryLinkForSideBar categoryName="entertainment" iconName="star" />
              <CategoryLinkForSideBar categoryName="food" iconName="utensils" />
              <CategoryLinkForSideBar categoryName="games" iconName="gamepad" />
              <CategoryLinkForSideBar categoryName="lifestyle" iconName="child" />
              <CategoryLinkForSideBar categoryName="music" iconName="music" />
              <CategoryLinkForSideBar categoryName="news" iconName="newspaper" />
              <CategoryLinkForSideBar categoryName="shopping" iconName="shopping-bag" />
              <CategoryLinkForSideBar categoryName="social" iconName="share-alt" />
              <CategoryLinkForSideBar categoryName="tech" iconName="code" />
              <CategoryLinkForSideBar categoryName="tools" iconName="hammer" />
              <CategoryLinkForSideBar categoryName="travel" iconName="plane" />
            </div>
          </div>
        </div>
        <div className="mb-2 w-60 text-center">
          <div className="w-full text-xs border-t-2">
            <div className="mt-4">
              <div>
                <Link href="/about" as="/about">
                  <a className="mr-2">About</a>
                </Link>
                <Link href="/submissions" as="/submissions">
                  <a className="mr-2">Submit app</a>
                </Link>
                <a className="mr-2" target="_blank" href="mailto:hello.pwalist@gmail.com">
                  Contact
                </a>
              </div>
              <div className="mt-1">
                <Link href="/terms-privacy" as="/terms-privacy">
                  <a className="mr-2">Terms & Privacy</a>
                </Link>
                <a className="mr-2" target="_blank" href="https://twitter.com/pwalist">
                  Twitter
                </a>
              </div>
            </div>
            <p className="mt-3">
              Made By
              <a className="ml-1" target="_blank" href="https://masakifukunishi.site">
                Masaki
              </a>
            </p>
            <p className="mt-1">&copy; PWA List {new Date().getFullYear()}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
