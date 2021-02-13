import Head from "next/head";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faListUl } from "@fortawesome/free-solid-svg-icons";
import CategoryLinkSide from "./CategoryLinkSide";

const Layout = ({ children, title = "PWA Store" }) => {
  return (
    <div className="text-gray-600 text-sm font-mono">
      <Head>
        <title>{title}</title>
      </Head>
      <header>
        <div className="h-14 border-b border-gray-300"></div>
      </header>
      <div className="h-screen flex">
        <div
          id="sideBar"
          className="bg-white border-r border-gray-300 p-6 w-64 hidden md:block"
        >
          <div className="flex flex-col">
            <p className="uppercase text-xs text-gray-600 mb-4">homes</p>
            <Link href="/" as="/">
              <a className="mb-3 font-medium text-sm transition duration-500 ease-in-out hover:text-green-600">
                Home
              </a>
            </Link>
            <p className="uppercase text-xs text-gray-600 mb-4 mt-4">
              categories
            </p>
            <Link
              href="/applications/[category]"
              as="/applications/entertainment"
            >
              <a className="mb-3 font-medium text-sm transition duration-500 ease-in-out hover:text-green-600">
                Entertainment
              </a>
            </Link>
            <Link href="/applications/[category]" as="/applications/tools">
              <a className="mb-3 font-medium text-sm transition duration-500 ease-in-out hover:text-green-600">
                Tools
              </a>
            </Link>
          </div>
        </div>
        <div className="bg-gray-100 flex-1 p-6"> {children}</div>
      </div>
      <div className="bottom-0 w-full bg-white fixed md:hidden">
        <ul className="flex h-12 justify-around items-center">
          <li className="text-center px-6">
            <Link href="/">
              <a className="block px-8 transition duration-500 ease-in-out hover:text-green-600">
                <FontAwesomeIcon icon={faHome} size="lg" className="" />
                <span className="text-xs block">Home</span>
              </a>
            </Link>
          </li>
          <li className="text-center">
            <Link href="/categories">
              <a className="block px-8 transition duration-500 ease-in-out hover:text-green-600">
                <FontAwesomeIcon icon={faListUl} size="lg" className="" />
                <span className="text-xs block">Categories</span>
              </a>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};
export default Layout;
