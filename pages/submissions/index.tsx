import { FC, useState, useEffect, useContext } from "react";
import Link from "next/link";
import firebase from "../../plugins/firebase";
import "firebase/firestore";
import { AuthContext } from "../../contexts/Auth";
import Layout from "../../components/Layout";
import Apps from "../../components/Submissions/Apps";
import Loading from "../../components/Common/Loading";
import fetchUserApps from "../../plugins/fetchUserApps";
import Router from "next/router";

const Submissions = () => {
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
            <Loading />
          ) : (
            <div className="bg-white rounded-lg px-5 py-5">
              <h1 className="text-2xl mb-4">submissions</h1>
              <div className="">
                <p className="text-yellow-500 text-lg">
                  The edit function is currently under construction. Please wait
                  for a while.
                </p>
                <p className="text-yellow-500 text-lg">
                  If you want to edit submissions, please contact us at the
                  following email address!
                </p>
                <a
                  className="text-yellow-500 text-lg"
                  href="mailto:hello.pwalist@gmail.com"
                >
                  hello.pwalist@gmail.com
                </a>
              </div>
              <div className="overflow-scroll mt-5">
                <table className="text-base border">
                  <thead>
                    <tr className="text-gray-500 border flex items-center h-9">
                      <th className="w-64">Name</th>
                      <th className="w-32">Status</th>
                      <th className="w-64">Actions</th>
                    </tr>
                  </thead>
                  {Object.keys(apps).length ? (
                    <Apps apps={apps} fetchApps={fetchApps} />
                  ) : (
                    <tbody>
                      <tr className="text-center">
                        <td colSpan={3} className="bg-gray-50 py-10">
                          <p className="text-gray-500 mb-2">
                            Create your first submission
                          </p>
                          <Link
                            href="/submissions/create"
                            as="/submissions/create"
                          >
                            <button className="text-sm text-white px-3 py-1 border rounded bg-green-400">
                              New Submission
                            </button>
                          </Link>
                        </td>
                      </tr>
                    </tbody>
                  )}
                </table>
              </div>
              <div className="mt-5">
                <Link href="/submissions/create" as="/submissions/create">
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
export default Submissions;
