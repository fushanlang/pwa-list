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
      <a className="mb-9 text-base transition hover:text-green-500 dark:hover:text-green-500">
        <FontAwesomeIcon icon={iconName} size="lg" className="mr-3" />
        {changeFirstUpperCase(categoryName)}
      </a>
    </Link>
  );
};

export default CategoryLinkForCategories;
