import { useState, useEffect } from "react";
import Layout from "../components/Layout";
import firebase from "../plugins/firebase";
import "firebase/firestore";
import ApplicationCard from "../components/ApplicationCard";
const db = firebase.firestore();

const Index = () => {
  const [searchParam, setSearchParam] = useState<String | null>(null);
  const [searchedApp, setSearchedApp] = useState<Object | null>([
    { id: "", name: "", icon: "", overview: "", description: "" },
  ]);
  useEffect(() => {
    const fetchApplicationsData = async () => {
      console.log(searchParam);
      const applicationsData = await db
        .collection("applications")
        .orderBy("name")
        .startAt(searchParam)
        .endAt(searchParam + "\uf8ff")
        .get();
      setSearchedApp(
        applicationsData.docs.map((doc) => ({
          id: doc.id,
          name: doc.data().name,
          icon: doc.data().icon,
          overview: doc.data().overview,
          description: doc.data().description,
        }))
      );
    };
    fetchApplicationsData();
  }, [searchParam]);
  return (
    <Layout>
      <p className="text-4xl">Welcome to Nextjs</p>
      <form className="my-8">
        <input
          className="shadow border rounded w-full py-2 px-3 leading-tight"
          type="text"
          onChange={(e) => {
            setSearchParam(e.target.value);
          }}
        />
      </form>
      <ApplicationCard applications={searchedApp} />
    </Layout>
  );
};
export default Index;
