import Layout from "../components/Layout";
import Link from "next/link";
import CategoryLinkForCategories from "../components/CategoryLinkForCategories";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
const categories = () => {
  return (
    <div>
      <Layout>
        <div className="text-xl flex flex-col rounded-md bg-white px-7 pt-5 pb-6">
          <p className="text-2xl font-bold mb-4">Categories</p>
          <CategoryLinkForCategories
            categoryName="entertainment"
            iconName="star"
          />
          <CategoryLinkForCategories categoryName="tools" iconName="hammer" />
          <CategoryLinkForCategories categoryName="game" iconName="gamepad" />
          <CategoryLinkForCategories categoryName="travel" iconName="plane" />
          <CategoryLinkForCategories
            categoryName="business"
            iconName="chart-bar"
          />
          <CategoryLinkForCategories
            categoryName="education"
            iconName="book-open"
          />
          <CategoryLinkForCategories categoryName="tech" iconName="code" />
          <CategoryLinkForCategories
            categoryName="health"
            iconName="heartbeat"
          />
          <CategoryLinkForCategories categoryName="design" iconName="palette" />
        </div>
      </Layout>
    </div>
  );
};

export default categories;
