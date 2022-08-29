import { NextPage } from "next";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
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

import Layout from "../components/Layout/Layout";
import CategoryLinkForCategories from "../components/Layout/CategoryLinkForCategories";

const Categories: NextPage = () => {
  return (
    <Layout title="Categories">
      <div className="pt-6 pl-7">
        <p className="text-lg mb-6">Categories</p>
        <div className="flex flex-col ml-1">
          <CategoryLinkForCategories categoryName="business" iconName="chart-bar" />
          <CategoryLinkForCategories categoryName="design" iconName="palette" />
          <CategoryLinkForCategories categoryName="education" iconName="book-open" />
          <CategoryLinkForCategories categoryName="entertainment" iconName="star" />
          <CategoryLinkForCategories categoryName="food" iconName="utensils" />
          <CategoryLinkForCategories categoryName="games" iconName="gamepad" />
          <CategoryLinkForCategories categoryName="lifestyle" iconName="child" />
          <CategoryLinkForCategories categoryName="music" iconName="music" />
          <CategoryLinkForCategories categoryName="news" iconName="newspaper" />
          <CategoryLinkForCategories categoryName="shopping" iconName="shopping-bag" />
          <CategoryLinkForCategories categoryName="social" iconName="share-alt" />
          <CategoryLinkForCategories categoryName="tech" iconName="code" />
          <CategoryLinkForCategories categoryName="tools" iconName="hammer" />
          <CategoryLinkForCategories categoryName="travel" iconName="plane" />
        </div>
      </div>
    </Layout>
  );
};

export default Categories;
