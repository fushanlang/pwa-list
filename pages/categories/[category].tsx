import { NextPage } from "next";

import Layout from "../../components/Layout/Layout";
import Card from "../../components/App/Card";
import { db } from "../../plugins/firebase";
import { changeFirstUpperCase } from "../../plugins/common/functions";
import { CardApp } from "../../types/apps";

type Props = { apps: CardApp[]; category: string };

const Category: NextPage<Props> = (props) => {
  const { apps, category } = props;
  return (
    <Layout title={category}>
      <div className="p-6">
        <h1 className="text-2xl font-bold mt-3">{category}</h1>
        <div className="mt-2">
          <Card apps={apps} />
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
  const applications = await db
    .collection("applications")
    .where("isPublic", "==", true)
    .where("category", "==", category)
    .orderBy("nameLowercase")
    .get();
  const apps = applications.docs.map((doc) => ({
    id: doc.id,
    name: doc.data().name,
    nameLowercase: doc.data().nameLowercase,
    icon: doc.data().icon,
    category: doc.data().category,
    tag1: doc.data().tag1,
    tag2: doc.data().tag2,
    tag3: doc.data().tag3,
    description: doc.data().description,
  }));

  return {
    props: {
      apps: apps,
      category: changeFirstUpperCase(category),
    },
    // revalidate: 20,
  };
}

export default Category;
