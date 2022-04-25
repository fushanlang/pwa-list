import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { changeFirstUpperCase } from "../../plugins/common/functions";

interface Props {
  categoryName: string;
  iconName: any;
}
const CategoryLinkForCategories: React.FC<Props> = ({ categoryName, iconName }) => {
  return (
    <Link href="categories/[category]" as={`/categories/${categoryName}`}>
      <a className="mb-9 text-base transition duration-500 ease-in-out hover:text-green-600">
        <FontAwesomeIcon icon={iconName} size="lg" className="mr-3" />
        {changeFirstUpperCase(categoryName)}
      </a>
    </Link>
  );
};

export default CategoryLinkForCategories;
