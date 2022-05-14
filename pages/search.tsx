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
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [inputParam, setInputParam] = useState<string>("");
  const [searchedApps, setSearchedApps] = useState<Object | null>([]);
  useEffect(() => {
    localStorage.inputSearchParam && setInputParam(localStorage.inputSearchParam);
  }, []);

  useEffect(() => {
    fetchApps();
  }, [inputParam]);

  const fetchApps = async () => {
    // remove hyphen and space
    if (!inputParam.replace(/\s|-/g, "")) {
      setSearchedApps([]);
      return;
    }
    setIsLoading(true);
    let searchParam = inputParam.toLowerCase().replace(/\s|-/g, "").trim();
    localStorage.inputSearchParam = inputParam;
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
    const noDupApps = apps.filter((element, index, self) => self.findIndex((e) => e.id === element.id) === index);
    setSearchedApps(noDupApps);
    setIsLoading(false);
  };
  return (
    <Layout title="Search">
      <div className="p-6">
        <div className="flex w-4/5 m-auto mt-5 rounded-md h-11 ring-2 ring-gray-400 focus-within:ring focus-within:ring-green-400">
          <div className="m-auto ml-3">
            <FontAwesomeIcon icon={faSearch} size="lg" />
          </div>
          <input
            className="focus:outline-none ml-2 w-full pl-2 text-base rounded-md"
            type="text"
            placeholder="App name or Tag"
            defaultValue={inputParam}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                setInputParam((e.target as HTMLInputElement).value);
                e.currentTarget.blur();
              }
            }}
          />
        </div>
        {isLoading ? (
          <div className="mt-64">
            <Loading />
          </div>
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
