import Head from "next/head";
import SideBar from "../components/SideBar";
import BottomBar from "../components/BottomBar";
import CategoryLinkForCategories from "../components/CategoryLinkForCategories";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
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
const categories = () => {
  return (
    <>
      <Head>
        <title>Categories | PWA List</title>
      </Head>
      <div className="text-gray-600 text-sm">
        <div className="h-screen flex">
          <SideBar />
          <div className="flex-1 overflow-scroll bg-white p-5 pl-7 mb-7">
            <p className="text-lg mt-1 mb-6">Categories</p>
            <div className="flex flex-col ml-1">
              <CategoryLinkForCategories
                categoryName="business"
                iconName="chart-bar"
              />
              <CategoryLinkForCategories
                categoryName="design"
                iconName="palette"
              />
              <CategoryLinkForCategories
                categoryName="education"
                iconName="book-open"
              />
              <CategoryLinkForCategories
                categoryName="entertainment"
                iconName="star"
              />
              <CategoryLinkForCategories
                categoryName="food"
                iconName="utensils"
              />
              <CategoryLinkForCategories
                categoryName="games"
                iconName="gamepad"
              />
              <CategoryLinkForCategories
                categoryName="health"
                iconName="heartbeat"
              />
              <CategoryLinkForCategories
                categoryName="music"
                iconName="music"
              />
              <CategoryLinkForCategories
                categoryName="news"
                iconName="newspaper"
              />
              <CategoryLinkForCategories
                categoryName="shopping"
                iconName="shopping-bag"
              />
              <CategoryLinkForCategories
                categoryName="social"
                iconName="share-alt"
              />
              <CategoryLinkForCategories
                categoryName="sports"
                iconName="running"
              />
              <CategoryLinkForCategories categoryName="tech" iconName="code" />
              <CategoryLinkForCategories
                categoryName="tools"
                iconName="hammer"
              />
              <CategoryLinkForCategories
                categoryName="travel"
                iconName="plane"
              />
            </div>
          </div>
          <BottomBar />
        </div>
      </div>
    </>
  );
};

export default categories;
