import Head from "next/head";
import Link from "next/link";

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
            <a
              href="/"
              className="mb-3 font-medium text-sm hover:text-green-600 transition ease-in-out"
            >
              Analytics dashboard
            </a>
            <p className="uppercase text-xs text-gray-600 mb-4 mt-4">
              categories
            </p>
            <Link
              href="/applications/[category]"
              as="/applications/entertainment"
            >
              <a className="mb-3 font-medium text-sm hover:text-green-600 transition ease-in-out">
                <i className="fad fa-envelope-open-text text-xs mr-2"></i>
                Entertainment
              </a>
            </Link>
            <Link href="/applications/[category]" as="/applications/tools">
              <a className="mb-3 font-medium text-sm hover:text-green-600 transition ease-in-out">
                <i className="fad fa-envelope-open-text text-xs mr-2"></i>
                Tools
              </a>
            </Link>
            <Link href="/applications/[category]" as="/applications/shopping">
              <a className="mb-3 font-medium text-sm hover:text-green-600 transition ease-in-out">
                <i className="fad fa-envelope-open-text text-xs mr-2"></i>
                Shopping
              </a>
            </Link>
          </div>
        </div>
        <div className="bg-gray-100 flex-1 p-6"> {children}</div>
      </div>
    </div>
  );
};
export default Layout;
