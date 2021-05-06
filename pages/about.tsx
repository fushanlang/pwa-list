import Layout from "../components/Layout";
const about = () => {
  return (
    <Layout>
      <div className="pl-6 pr-4 py-6 bg-white rounded-lg">
        <h1 className="text-2xl font-bold">What is a PWA?</h1>
        <div className="mt-3 leading-relaxed text-base">
          <p>
            PWA stands for "Progressive Web Apps" and refers to websites that
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
          <div className="ml-3 mt-5">
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
      </div>
    </Layout>
  );
};
export default about;
