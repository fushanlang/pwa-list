import Link from "next/link";
const CategoryLink = ({ href, as, name }) => {
  return (
    <Link href={href} as={as}>
      <a className="mb-3 font-medium text-sm transition duration-500 ease-in-out hover:text-green-600">
        <i className="fad fa-envelope-open-text text-xs mr-2"></i>
        {name}
      </a>
    </Link>
  );
};
export default CategoryLink;
