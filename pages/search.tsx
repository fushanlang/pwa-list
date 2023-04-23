import { NextPage } from "next";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

import { db } from "../plugins/firebase";
import mapToCardApp from "../plugins/common/mapToCardApp";
import Layout from "../components/Layout/Layout";
import Card from "../components/App/Card";
import Loading from "../components/Common/Loading";
import type { CardApp } from "../types/apps";

const Search: NextPage = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [inputParam, setInputParam] = useState<string>("");
  const [searchedApps, setSearchedApps] = useState<CardApp[]>([]);

  useEffect(() => {
    localStorage.inputSearchParam && setInputParam(localStorage.inputSearchParam);
  }, []);

  const searchQuery = async (field: string, param: string) => {
    return await db
      .collection("applications")
      .orderBy(field)
      .startAt(param)
      .endAt(param + "\uf8ff")
      .where("isPublic", "==", true)
      .get();
  };

  const search = async () => {
    if (!inputParam.replace(/\s|-|\./g, "")) {
      setSearchedApps([]);
      return;
    }

    setIsLoading(true);
    const searchParam = inputParam
      .toLowerCase()
      .replace(/\s|-|\./g, "")
      .trim();
    localStorage.inputSearchParam = inputParam;

    const searchResults = await Promise.all([
      searchQuery("nameLowercase", searchParam),
      searchQuery("tag1Lowercase", searchParam),
      searchQuery("tag2Lowercase", searchParam),
      searchQuery("tag3Lowercase", searchParam),
    ]);

    const mergedResults = searchResults.flatMap((result) => result.docs);
    const apps = mergedResults.map((doc) => mapToCardApp(doc));
    const noDupApps = apps.filter((element, index, self) => self.findIndex((e) => e.id === element.id) === index);

    setSearchedApps(noDupApps);
    setIsLoading(false);
  };
  useEffect(() => {
    search();
  }, [inputParam]);

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
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
              {searchedApps.map((app) => (
                <Card app={app} key={app.id} />
              ))}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};
export default Search;
