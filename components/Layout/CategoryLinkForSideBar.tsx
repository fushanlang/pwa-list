import Link from "next/link";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { changeFirstUpperCase } from "../../plugins/common/functions";

type Props = {
  categoryName: string;
  iconName: any;
};
const CategoryLinkForSideBar: React.FC<Props> = ({ categoryName, iconName }) => {
  const router = useRouter();
  const { category } = router.query;
  return (
    <Link href="/categories/[category]" as={`/categories/${categoryName}`}>
      {categoryName === category ? (
        <a className="ml-1 mb-4 text-green-500">
          <FontAwesomeIcon icon={iconName} size="xs" className="mr-2" />
          {changeFirstUpperCase(categoryName)}
        </a>
      ) : (
        <a className="ml-1 mb-4 transitions hover:text-green-500">
          <FontAwesomeIcon icon={iconName} size="xs" className="mr-2" />
          {changeFirstUpperCase(categoryName)}
        </a>
      )}
    </Link>
  );
};

export default CategoryLinkForSideBar;
