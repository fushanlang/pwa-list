import { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";

import Layout from "../components/Layout/Layout";

const About: NextPage = () => {
  const logo = {
    fontFamily: "'Nunito', sans-serif",
  };
  return (
    <Layout title="About">
      <Head>
        <meta name="description" content="In PWA List, you can search for Progressive Web Apps by category, tag, and app name." />
      </Head>
      <div className="px-7 py-6">
        <h1 className="text-3xl font-bold mb-3" style={logo}>
          About
        </h1>
        <h2 className="text-xl font-bold">Welcome to PWA List</h2>
        <div className="mt-1 mb-5 text-lg">
          <p>In PWA List, you can search for Progressive Web Apps by category, tag, and app name.</p>
        </div>
        <h2 className="text-xl font-bold">What are Progressive Web Apps?</h2>
        <div className="mt-1 mb-5 text-lg">
          <p>
            Progressive Web Applications (PWAs) are apps made with web technologies. They can be used from a web browser without
            installation, or installed and used like native apps.
          </p>
          <p>PWAs are built with features like push notifications and the ability to work offline.</p>
        </div>
        <h2 className="text-xl font-bold mb-1">How to install</h2>
        <div className="mt-1 mb-5 text-lg">
          <p>Installation is not required, but it will make it easier to use.</p>
          <p>
            To install, access the app in a web browser and click the Install button. The following is an explanation of how to install in
            the case of Chrome.
          </p>
          <div className="mt-4 ml-2 mb-1">
            <img alt="screenshot1" src={"/about/mobile1.jpg"} className="h-132 mr-8 mb-3 rounded-md inline" />
            <img alt="screenshot2" src={"/about/mobile2.jpg"} className="h-132 mr-8 mb-3 rounded-md inline" />
            <img alt="screenshot3" src={"/about/mobile3.jpg"} className="h-132 mr-8 mb-3 rounded-md inline" />
          </div>
          <p>The procedure is slightly different depending on the browser, but it is almost the same.</p>
        </div>
        <h2 className="text-xl font-bold mb-1">How to submit to PWA List</h2>
        <div className="mt-1 mb-4 text-lg">
          <p>
            If you know a good Progressive Web App, please submit it using
            <Link href="/submissions/create" as="/submissions/create">
              <a className="text-blue-400"> this form</a>
            </Link>
            .
          </p>
        </div>
        <Link href="/" as="/">
          <button className="bg-green-400 hover:bg-green-500 text-white font-bold mt-5 w-36 h-8 rounded focus:outline-none" type="submit">
            Home
          </button>
        </Link>
      </div>
    </Layout>
  );
};
export default About;
