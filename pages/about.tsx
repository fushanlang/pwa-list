import { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import Layout from "../components/Layout";
const About: NextPage = () => {
  const logo = {
    fontFamily: "'Nunito', sans-serif",
  };
  return (
    <Layout title="What is a PWA?">
      <Head>
        <meta
          name="description"
          content="PWA stands for 'Progressive Web Apps' and refers to websites that
            can be installed on PCs and smartphones."
        />
      </Head>
      <div className="pl-6 pr-4 py-5 bg-white rounded-lg">
        <h1 className="text-3xl font-bold mb-4" style={logo}>
          P<span className="text-green-500">W</span>A LIST
        </h1>
        <h2 className="text-2xl font-bold">What is a PWA?</h2>
        <div className="mt-3 leading-relaxed text-lg">
          <p>
            PWA stands for 'Progressive Web Apps' and refers to websites that
            can be installed on PCs and smartphones.
            <br />
            By installing a PWA, a website is added to the home screen, and you
            can use the website with a native application-like feel.
          </p>
          <h2 className="text-xl font-bold mt-5 mb-1">How to install</h2>
          <p>
            To install, simply visit a PWA-enabled website and click the install
            button.
            <br />
            The following is an explanation of how to install in the case of
            Chrome.
          </p>
          {/* <h3 className="text-lg font-bold mt-4 mb-3">For Smartphones</h3> */}
          <div className="ml-3 mt-5 mb-3">
            <img
              style={{ height: "530px" }}
              src={"/about/mobile1.jpg"}
              className="mr-8 mb-3 rounded-md inline"
            />
            <img
              style={{ maxHeight: "530px" }}
              src={"/about/mobile2.jpg"}
              className="mr-8 mb-3 rounded-md inline"
            />
            <img
              style={{ maxHeight: "530px" }}
              src={"/about/mobile3.jpg"}
              className="mr-8 mb-3 rounded-md inline"
            />
          </div>
          {/* <h3 className="text-lg font-bold mt-3 mb-3">For PCs</h3>
          <div className="ml-3 mb-5">
            <img
              style={{ maxHeight: "530px" }}
              src={"/about/pc1.png"}
              className="mr-8 mb-2 rounded-md "
            />
          </div> */}
          <p>
            The procedure is a little different depending on the browser, but
            basically it is just this.
          </p>
          <h2 className="text-xl font-bold mt-5 mb-1">What is PWA List?</h2>
          <p>
            The PWA List is a site where you can search for PWAs by category,
            tag, or name.
            <br />
            Please find your favorite PWA!
          </p>
        </div>
        <Link href="/" as="/">
          <button
            className="bg-green-400 hover:bg-green-500 text-white font-bold mt-5 w-36 h-8 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Home
          </button>
        </Link>
      </div>
    </Layout>
  );
};
export default About;
