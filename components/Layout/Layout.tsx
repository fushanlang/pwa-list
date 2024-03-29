import Head from "next/head";

import SideBar from "./SideBar";
import BottomBar from "./BottomBar";

type Props = {
  children: React.ReactNode;
  title: string;
};

const Layout: React.FC<Props> = ({ children, title }) => {
  return (
    <>
      <Head>
        <title>{`${title} | PWA List`}</title>
      </Head>
      <div className="h-screen flex">
        <div className="hidden md:block overflow-scroll border-r">
          <SideBar />
        </div>
        <div className="flex-1 pb-16 md:pb-0 overflow-scroll">{children}</div>
        <BottomBar />
      </div>
    </>
  );
};
export default Layout;
