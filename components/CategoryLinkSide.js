import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
const CategoryLinkSide = ({ href, as, name }) => {
  return (
    <Link href={href} as={as}>
      <a className="mb-3 font-medium text-sm transition duration-500 ease-in-out hover:text-green-600">
        {name}
      </a>
    </Link>
  );
};
export default CategoryLinkSide;
