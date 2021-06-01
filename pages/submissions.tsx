import { FC, useState, useEffect, useContext } from "react";
import Link from "next/link";
import firebase from "../plugins/firebase";
import "firebase/firestore";
import { AuthContext } from "../contexts/Auth";
import Layout from "../components/Layout";
import Apps from "../components/Submissions/Apps";
import fetchUserApps from "../plugins/fetchUserApps";
import Router from "next/router";

const submissions = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [apps, setApps] = useState<any>([]);
  const { currentUser } = useContext(AuthContext);
  const fetchApps = () => {
    fetchUserApps(setApps, setIsLoading, currentUser.uid);
  };
  useEffect(() => {
    currentUser === null && Router.push("sign-up");
    if (currentUser) {
      fetchApps();
    }
  }, [currentUser]);

  const signOut = async () => {
    firebase.auth().signOut();
  };
  return (
    <Layout title="Submissions">
      {currentUser && (
        <>
          {isLoading ? (
            <div className="text-center mt-52">
              <div className="loader" />
            </div>
          ) : (
            <div className="bg-white rounded-lg px-5 py-5">
              <h1 className="text-2xl mb-4">submissions</h1>
              <div className="overflow-scroll">
                <table className="text-base border">
                  <thead>
                    <tr className="text-gray-500 border flex items-center h-9">
                      <th className="w-64">Name</th>
                      <th className="w-32">Status</th>
                      <th className="w-64">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.keys(apps).length ? (
                      <Apps apps={apps} fetchApps={fetchApps} />
                    ) : (
                      <tr className="text-center">
                        <td colSpan={3} className="bg-gray-50 py-10">
                          <p className="text-gray-500 mb-2">
                            Create your first submission
                          </p>
                          <Link href="/add" as="/add">
                            <button className="text-sm text-white px-3 py-1 border rounded bg-green-400">
                              New Submission
                            </button>
                          </Link>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
              <div className="mt-5">
                <Link href="/add" as="/add">
                  <button className="px-5 mr-1 font-bold h-9 border rounded shadow-sm hover:shadow-none hover:bg-gray-100">
                    New Submission
                  </button>
                </Link>
                <button
                  className="px-5 font-bold h-9 border rounded shadow-sm hover:shadow-none hover:bg-gray-100"
                  onClick={signOut}
                >
                  Sign Out
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </Layout>
  );
};
export default submissions;
