import Head from "next/head";
import Link from "next/link";
import CategoryLink from "./CategoryLink";

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
            <CategoryLink href="/" as="/" name="Home" />
            <p className="uppercase text-xs text-gray-600 mb-4 mt-4">
              categories
            </p>
            <CategoryLink
              href="/applications/[category]"
              as="/applications/entertainment"
              name="Entertainment"
            />
            <CategoryLink
              href="/applications/[category]"
              as="/applications/tools"
              name="Tools"
            />
            <CategoryLink
              href="/applications/[category]"
              as="/applications/shopping"
              name="Shopping"
            />
          </div>
        </div>
        <div className="bg-gray-100 flex-1 p-6"> {children}</div>
      </div>
    </div>
  );
};
export default Layout;
