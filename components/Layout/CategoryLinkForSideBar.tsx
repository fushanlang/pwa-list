import Link from "next/link";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { changeFirstUpperCase } from "../../plugins/common/functions";

interface Props {
  categoryName: string;
  iconName: any;
}
const CategoryLinkForSideBar: React.FC<Props> = ({ categoryName, iconName }) => {
  const router = useRouter();
  const { category } = router.query;
  return (
    <Link href="/categories/[category]" as={`/categories/${categoryName}`}>
      {categoryName === category ? (
        <a className="mb-4 text-green-600">
          <FontAwesomeIcon icon={iconName} size="xs" className="mr-2" />
          {changeFirstUpperCase(categoryName)}
        </a>
      ) : (
        <a className="mb-4 transition duration-500 ease-in-out hover:text-green-600">
          <FontAwesomeIcon icon={iconName} size="xs" className="mr-2" />
          {changeFirstUpperCase(categoryName)}
        </a>
      )}
    </Link>
  );
};

export default CategoryLinkForSideBar;
