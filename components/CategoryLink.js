import Link from "next/link";
const CategoryLink = ({ href, as, name }) => {
  return (
    <Link href={href} as={as}>
      <a className="mb-3 font-medium text-sm hover:text-green-600 transition ease-in-out">
        <i className="fad fa-envelope-open-text text-xs mr-2"></i>
        {name}
      </a>
    </Link>
  );
};
export default CategoryLink;
