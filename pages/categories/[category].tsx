import { NextPage } from "next";
import { useRouter } from "next/router";
import firebase from "../../plugins/firebase";
import "firebase/firestore";
import Layout from "../../components/Layout";
import Card from "../../components/App/Card";

const db = firebase.firestore();
interface Props {
  apps: any;
  category: string;
}
const Category: NextPage<Props> = (props) => {
  const { apps, category } = props;
  return (
    <Layout title={category}>
      <div className="px-2">
        <div>
          <div className="text-2xl font-bold mt-3">{category}</div>
          <div className="mt-2">
            <Card apps={apps} />
          </div>
        </div>
      </div>
    </Layout>
  );
};
export const getStaticPaths = async () => {
  const apps = await db
    .collection("applications")
    .where("isPublic", "==", true)
    .get();
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
  const categoryFirstUpperCase =
    category.toString().charAt(0).toUpperCase() + category.slice(1);
  const applications = await db
    .collection("applications")
    .where("isPublic", "==", true)
    .where("category", "==", category)
    .orderBy("nameLowercase", "desc")
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
      category: categoryFirstUpperCase,
    },
    revalidate: 10,
  };
}

export default Category;
