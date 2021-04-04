import Head from "next/head";
import SideBar from "../components/SideBar";
import BottomBar from "../components/BottomBar";

const Layout = ({ children, title = "PWA Store" }) => {
  return (
    <div className="text-gray-600 text-sm font-mono">
      <Head>
        <style>
          @import
          url('https://fonts.googleapis.com/css2?family=Nunito:wght@800&display=swap');
        </style>
        <title>{title}</title>
      </Head>
      <div className="h-screen flex">
        <SideBar />
        <div className="bg-gray-100 flex-1 p-6 mb-12 md:mb-0 overflow-scroll">
          {children}
        </div>
        <BottomBar />
      </div>
    </div>
  );
};
export default Layout;
