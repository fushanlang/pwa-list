import Head from "next/head";
import SideBar from "./SideBar";
import BottomBar from "./BottomBar";

const Layout = ({ children, title }) => {
  return (
    <>
      <Head>
        <title>{`${title} | PWA List`}</title>
      </Head>
      <div className="h-screen flex">
        <SideBar />
        <div className="flex-1 px-4 py-6 mb-12 md:mb-0 overflow-scroll">{children}</div>
        <BottomBar />
      </div>
    </>
  );
};
export default Layout;
