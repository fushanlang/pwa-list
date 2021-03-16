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
      if (searchParam == null || searchParam == "") {
        return;
      }
      var searchParamLowercase = searchParam.toLowerCase().replace(/\s+/g, "");
      const applicationsData = await db
        .collection("applications")
        .orderBy("name_lowercase")
        .startAt(searchParamLowercase)
        .endAt(searchParamLowercase + "\uf8ff")
        .get();
      setSearchedApp(
        applicationsData.docs.map((doc) => ({
          id: doc.id,
          name: doc.data().name,
          name_lowercase: doc.data().name_lowercase,
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
