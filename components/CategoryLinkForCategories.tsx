import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const CategoryLinkForCategories = ({ categoryName, iconName }) => {
  const categoryNameFirstUpperCase =
    categoryName.toString().charAt(0).toUpperCase() + categoryName.slice(1);
  return (
    <Link href="categories/[category]" as={`/categories/${categoryName}`}>
      <a className="mb-9 text-base transition duration-500 ease-in-out hover:text-green-600">
        <FontAwesomeIcon icon={iconName} size="lg" className="mr-3" />
        {categoryNameFirstUpperCase}
      </a>
    </Link>
  );
};

export default CategoryLinkForCategories;
