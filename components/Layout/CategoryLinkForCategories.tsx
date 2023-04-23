import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import capitalizeFirstLetter from "../../plugins/common/capitalizeFirstLetter";

type Props = {
  categoryName: string;
  iconName: any;
};

const CategoryLinkForCategories: React.FC<Props> = ({ categoryName, iconName }) => {
  return (
    <div className="mb-9">
      <Link href="categories/[category]" as={`/categories/${categoryName}`}>
        <a className="block text-base transition hover:text-green-500 dark:hover:text-green-500">
          <FontAwesomeIcon icon={iconName} size="lg" className="mr-3" />
          {capitalizeFirstLetter(categoryName)}
        </a>
      </Link>
    </div>
  );
};

export default CategoryLinkForCategories;
