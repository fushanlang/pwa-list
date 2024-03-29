import Link from "next/link";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import capitalizeFirstLetter from "../../plugins/common/capitalizeFirstLetter";

type Props = {
  categoryName: string;
  iconName: any;
};
const CategoryLinkForSideBar: React.FC<Props> = ({ categoryName, iconName }) => {
  const router = useRouter();
  const { category } = router.query;
  return (
    <div className="mb-4">
      <Link href="/categories/[category]" as={`/categories/${categoryName}`}>
        {categoryName === category ? (
          <a className="block text-green-500">
            <FontAwesomeIcon icon={iconName} size="xs" className="mr-2" />
            {capitalizeFirstLetter(categoryName)}
          </a>
        ) : (
          <a className="block hover:text-green-500">
            <FontAwesomeIcon icon={iconName} size="xs" className="mr-2" />
            {capitalizeFirstLetter(categoryName)}
          </a>
        )}
      </Link>
    </div>
  );
};

export default CategoryLinkForSideBar;
