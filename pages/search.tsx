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
  const [initialSearchParam, setInitialSearchParam] = useState<any | null>(
    null
  );
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
        .orderBy("nameLowercase")
        .startAt(searchParamLowercase)
        .endAt(searchParamLowercase + "\uf8ff")
        .where("isPublic", "==", true)
        .get();
      const applicationsDataTag1 = await db
        .collection("applications")
        .orderBy("tag1Lowercase")
        .startAt(searchParamLowercase)
        .endAt(searchParamLowercase + "\uf8ff")
        .where("isPublic", "==", true)
        .get();
      const applicationsDataTag2 = await db
        .collection("applications")
        .orderBy("tag2Lowercase")
        .startAt(searchParamLowercase)
        .endAt(searchParamLowercase + "\uf8ff")
        .where("isPublic", "==", true)
        .get();
      const applicationsDataTag3 = await db
        .collection("applications")
        .orderBy("tag3Lowercase")
        .startAt(searchParamLowercase)
        .endAt(searchParamLowercase + "\uf8ff")
        .where("isPublic", "==", true)
        .get();
      mergedApplicationData.push(...applicationsDataName.docs);
      mergedApplicationData.push(...applicationsDataTag1.docs);
      mergedApplicationData.push(...applicationsDataTag2.docs);
      mergedApplicationData.push(...applicationsDataTag3.docs);
      var applicationDataDuplicateInclude = mergedApplicationData.map(
        (doc) => ({
          id: doc.id,
          name: doc.data().name,
          nameLowercase: doc.data().nameLowercase,
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
    localStorage.saveKey = searchParam;
  }, [searchParam]);
  useEffect(() => {
    if (
      localStorage.saveKey !== null &&
      localStorage.saveKey !== "" &&
      localStorage.saveKey !== "empty" &&
      typeof localStorage.saveKey !== "undefined"
    ) {
      setInitialSearchParam(localStorage.saveKey);
      setSearchParam(localStorage.saveKey);
    }
  }, []);
  return (
    <Layout>
      <div className="flex w-4/5 m-auto mt-5 rounded-md shadow h-11 bg-white">
        <div className="m-auto ml-3">
          <FontAwesomeIcon icon={faSearch} size="lg" />
        </div>
        <input
          className="focus:outline-none ml-2 w-full pl-2 text-base rounded-md"
          type="text"
          placeholder="Search"
          defaultValue={initialSearchParam}
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
