import { NextPage } from "next";
import { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import firebase from "../plugins/firebase";
import "firebase/firestore";
import Card from "../components/App/Card";
import Loading from "../components/Common/Loading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
const db = firebase.firestore();

const Search: NextPage = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [inputParam, setInputParam] = useState<String>("");
  const [searchedApps, setSearchedApps] = useState<Object | null>([]);
  useEffect(() => {
    fetchApps();
  }, [inputParam]);
  const fetchApps = async () => {
    let searchParam = inputParam ? inputParam.toLowerCase().replace(/\s+/g, "") : -1;
    const appsName = await db
      .collection("applications")
      .orderBy("nameLowercase")
      .startAt(searchParam)
      .endAt(searchParam + "\uf8ff")
      .where("isPublic", "==", true)
      .get();
    const appsTag1 = await db
      .collection("applications")
      .orderBy("tag1Lowercase")
      .startAt(searchParam)
      .endAt(searchParam + "\uf8ff")
      .where("isPublic", "==", true)
      .get();
    const appsTag2 = await db
      .collection("applications")
      .orderBy("tag2Lowercase")
      .startAt(searchParam)
      .endAt(searchParam + "\uf8ff")
      .where("isPublic", "==", true)
      .get();
    const appsTag3 = await db
      .collection("applications")
      .orderBy("tag3Lowercase")
      .startAt(searchParam)
      .endAt(searchParam + "\uf8ff")
      .where("isPublic", "==", true)
      .get();
    let mergedApps = [];
    mergedApps.push(...appsName.docs, ...appsTag1.docs, ...appsTag2.docs, ...appsTag3.docs);
    const apps = mergedApps.map((doc) => ({
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
    const noDupApps = apps.filter(
      (element, index, self) => self.findIndex((e) => e.id === element.id) === index
    );
    setSearchedApps(noDupApps);
    setIsLoading(false);
  };
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
            onChange={(e) => {
              setInputParam(e.target.value);
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
