import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const CategoryLinkForCategories = ({ categoryName, iconName }) => {
  const categoryNameFirstUpperCase =
    categoryName.toString().charAt(0).toUpperCase() + categoryName.slice(1);
  return (
    <Link href="applications/[category]" as={`/applications/${categoryName}`}>
      <a className="mb-5 transition duration-500 ease-in-out hover:text-green-600">
        <FontAwesomeIcon icon={iconName} size="lg" className="mr-3" />
        {categoryNameFirstUpperCase}
      </a>
    </Link>
  );
};

export default CategoryLinkForCategories;
