import { NextPage } from "next";
import Link from "next/link";

import Layout from "../../components/Layout/Layout";
import Card from "../../components/App/Card";
import { db } from "../../plugins/firebase";
import mapToCardApp from "../../plugins/common/mapToCardApp";
import capitalizeFirstLetter from "../../plugins/common/capitalizeFirstLetter";
import type { CardApp } from "../../types/apps";

type Props = { apps: CardApp[]; category: string };

const Category: NextPage<Props> = (props) => {
  const { apps, category } = props;
  return (
    <Layout title={category}>
      <div className="p-6">
        <h1 className="text-3xl font-bold mt-3" style={{ fontFamily: "'Nunito', sans-serif" }}>
          <Link href="/" as="/">
            <a>
              P<span className="text-green-500">W</span>A LIST
            </a>
          </Link>
        </h1>
        <h2 className="text-2xl font-bold mt-3">{category}</h2>
        <div className="mt-2">
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
            {apps.map((app) => (
              <Card app={app} key={app.id} />
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};
export const getStaticPaths = async () => {
  const apps = await db.collection("applications").where("isPublic", "==", true).get();
  const paths = apps.docs.map((app: any) => ({
    params: {
      category: app.data().category,
    },
  }));
  return {
    paths,
    fallback: false,
  };
};

export async function getStaticProps(context) {
  const { category } = context.params;
  const apps = await db
    .collection("applications")
    .where("isPublic", "==", true)
    .where("category", "==", category)
    .orderBy("nameLowercase")
    .get();

  return {
    props: {
      apps: apps.docs.map((doc) => mapToCardApp(doc)),
      category: capitalizeFirstLetter(category),
    },
    // revalidate: 20,
  };
}

export default Category;
