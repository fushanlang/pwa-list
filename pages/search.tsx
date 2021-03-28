import { useState, useEffect } from "react";
import Layout from "../components/Layout";
import firebase from "../plugins/firebase";
import "firebase/firestore";
import ApplicationCard from "../components/ApplicationCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
const db = firebase.firestore();

const Search = () => {
  const [searchParam, setSearchParam] = useState<String | null>(null);
  const [searchedApp, setSearchedApp] = useState<Object | null>([]);
  var mergedApplicationData = [];
  useEffect(() => {
    if (searchParam === null || searchParam === "") {
      setSearchParam("empty");
      return;
    }
    const fetchApplicationsData = async () => {
      var searchParamLowercase = searchParam
        ? searchParam.toLowerCase().replace(/\s+/g, "")
        : null;
      const applicationsDataName = await db
        .collection("applications")
        .orderBy("name_lowercase")
        .startAt(searchParamLowercase)
        .endAt(searchParamLowercase + "\uf8ff")
        .get();
      const applicationsDataTag1 = await db
        .collection("applications")
        .orderBy("tag1_lowercase")
        .startAt(searchParamLowercase)
        .endAt(searchParamLowercase + "\uf8ff")
        .get();
      const applicationsDataTag2 = await db
        .collection("applications")
        .orderBy("tag2_lowercase")
        .startAt(searchParamLowercase)
        .endAt(searchParamLowercase + "\uf8ff")
        .get();
      const applicationsDataTag3 = await db
        .collection("applications")
        .orderBy("tag3_lowercase")
        .startAt(searchParamLowercase)
        .endAt(searchParamLowercase + "\uf8ff")
        .get();
      console.log(applicationsDataName);
      console.log(applicationsDataTag1);
      console.log(applicationsDataTag2);
      mergedApplicationData.push(...applicationsDataName.docs);
      mergedApplicationData.push(...applicationsDataTag1.docs);
      mergedApplicationData.push(...applicationsDataTag2.docs);
      mergedApplicationData.push(...applicationsDataTag3.docs);
      var applicationDataDuplicateInclude = mergedApplicationData.map(
        (doc) => ({
          id: doc.id,
          name: doc.data().name,
          name_lowercase: doc.data().name_lowercase,
          icon: doc.data().icon,
          category: doc.data().category,
          tag1: doc.data().tag1,
          tag2: doc.data().tag2,
          tag3: doc.data().tag3,
          description: doc.data().description,
        })
      );
      const applicationData = applicationDataDuplicateInclude.filter(
        (element, index, self) =>
          self.findIndex((e) => e.id === element.id) === index
      );
      setSearchedApp(applicationData);
    };
    fetchApplicationsData();
  }, [searchParam]);
  return (
    <Layout>
      <div className="flex w-4/5 m-auto mt-2 rounded-md shadow h-11 bg-white">
        <div className="m-auto ml-3">
          <FontAwesomeIcon icon={faSearch} size="lg" className="" />
        </div>
        <input
          className="focus:outline-none ml-2 w-full pl-2 text-base rounded-md"
          type="text"
          placeholder="Search"
          onChange={(e) => {
            setSearchParam(e.target.value);
          }}
        />
      </div>
      <div className="mt-8">
        <ApplicationCard applications={searchedApp} />
      </div>
    </Layout>
  );
};
export default Search;
