import { NextPage } from "next";
import { useState, useEffect } from "react";
import Layout from "../components/Layout";
import firebase from "../plugins/firebase";
import "firebase/firestore";
import Card from "../components/App/Card";
import Loading from "../components/Common/Loading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
const db = firebase.firestore();

const Search: NextPage = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [searchParam, setSearchParam] = useState<String | null>(null);
  const [initialSearchParam, setInitialSearchParam] = useState<any | null>(
    null
  );
  const [searchedApps, setSearchedApps] = useState<Object | null>([]);
  useEffect(() => {
    if (searchParam === null || searchParam === "") {
      setSearchParam("empty");
      return;
    }
    const fetchAppsData = async () => {
      let searchParamLowercase = searchParam
        ? searchParam.toLowerCase().replace(/\s+/g, "")
        : null;
      const appsName = await db
        .collection("applications")
        .orderBy("nameLowercase")
        .startAt(searchParamLowercase)
        .endAt(searchParamLowercase + "\uf8ff")
        .where("isPublic", "==", true)
        .get();
      const appsTag1 = await db
        .collection("applications")
        .orderBy("tag1Lowercase")
        .startAt(searchParamLowercase)
        .endAt(searchParamLowercase + "\uf8ff")
        .where("isPublic", "==", true)
        .get();
      const appsTag2 = await db
        .collection("applications")
        .orderBy("tag2Lowercase")
        .startAt(searchParamLowercase)
        .endAt(searchParamLowercase + "\uf8ff")
        .where("isPublic", "==", true)
        .get();
      const appsTag3 = await db
        .collection("applications")
        .orderBy("tag3Lowercase")
        .startAt(searchParamLowercase)
        .endAt(searchParamLowercase + "\uf8ff")
        .where("isPublic", "==", true)
        .get();
      let mergedApps = [];
      mergedApps.push(...appsName.docs);
      mergedApps.push(...appsTag1.docs);
      mergedApps.push(...appsTag2.docs);
      mergedApps.push(...appsTag3.docs);
      var appsDuplicateInclude = mergedApps.map((doc) => ({
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
      const apps = appsDuplicateInclude.filter(
        (element, index, self) =>
          self.findIndex((e) => e.id === element.id) === index
      );
      setSearchedApps(apps);
      setIsLoading(false);
    };
    fetchAppsData();
    localStorage.searchParam = searchParam;
  }, [searchParam]);
  useEffect(() => {
    if (
      localStorage.searchParam !== null &&
      localStorage.searchParam !== "" &&
      localStorage.searchParam !== "empty" &&
      typeof localStorage.searchParam !== "undefined"
    ) {
      setInitialSearchParam(localStorage.searchParam);
      setSearchParam(localStorage.searchParam);
    }
  }, []);
  return (
    <Layout title="Search">
      <div className="px-2">
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
        {isLoading ? (
          <Loading />
        ) : (
          <div className="mt-8">
            <Card apps={searchedApps} />
          </div>
        )}
      </div>
    </Layout>
  );
};
export default Search;
