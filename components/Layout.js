import Head from "next/head";
import Link from "next/link";

export default function Layout({ children, title = "PWA Store" }) {
  return (
    <div className="text-gray-600 text-sm font-mono">
      <Head>
        <title>{title}</title>
      </Head>
      <header>
        <div class="h-14 border-b border-gray-300"></div>
      </header>
      <div class="h-screen flex flex-row flex-wrap">
        <div
          id="sideBar"
          class="relative flex flex-col flex-wrap bg-white border-r border-gray-300 p-6 flex-none w-64 animated faster hidden md:block"
        >
          <div class="flex flex-col">
            <p class="uppercase text-xs text-gray-600 mb-4 tracking-wider">
              homes
            </p>
            <a
              href="/"
              class="mb-3 capitalize font-medium text-sm hover:text-green-600 transition ease-in-out duration-500"
            >
              Analytics dashboard
            </a>
            <p class="uppercase text-xs text-gray-600 mb-4 mt-4 tracking-wider">
              categories
            </p>
            <Link href="/[category]" as="business">
              <a className="mb-3 capitalize font-medium text-sm hover:text-green-600 transition ease-in-out duration-500">
                <i class="fad fa-envelope-open-text text-xs mr-2"></i>
                Business
              </a>
            </Link>
            <Link href="/[category]" as="travel">
              <a className="mb-3 capitalize font-medium text-sm hover:text-green-600 transition ease-in-out duration-500">
                <i class="fad fa-envelope-open-text text-xs mr-2"></i>
                Travel
              </a>
            </Link>
            <Link href="/[category]" as="shopping">
              <a className="mb-3 capitalize font-medium text-sm hover:text-green-600 transition ease-in-out duration-500">
                <i class="fad fa-envelope-open-text text-xs mr-2"></i>
                Shopping
              </a>
            </Link>
          </div>
        </div>
        <div class="bg-gray-100 flex-1">{children}</div>
      </div>
    </div>
  );
}
