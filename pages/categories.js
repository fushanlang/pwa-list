import Layout from "../components/Layout";
import Link from "next/link";

const categories = () => {
  return (
    <div>
      {" "}
      <Layout title="Home">
        <div className="text-xl">
          <p className="font-bold mb-4">Categories</p>
          <Link
            href="applications/entertainment"
            as="applications/entertainment"
          >
            <a className="mb-3 transition duration-500 ease-in-out hover:text-green-600">
              entertainment
            </a>
          </Link>
        </div>
      </Layout>
    </div>
  );
};

export default categories;
