import Head from "next/head";
import SideBar from "../components/SideBar";
import BottomBar from "../components/BottomBar";

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
        <SideBar />
        <div className="bg-gray-100 flex-1 p-6"> {children}</div>
        <BottomBar />
      </div>
    </div>
  );
};
export default Layout;
