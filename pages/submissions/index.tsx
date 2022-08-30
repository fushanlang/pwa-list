import { useState, useEffect } from "react";
import { NextPage } from "next";
import Link from "next/link";
import Router from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { set, selectUserApps } from "../../store/modules/userApps";
import "firebase/firestore";

import { selectUser } from "../../store/modules/user";
import firebase from "../../plugins/firebase";
import Layout from "../../components/Layout/Layout";
import Apps from "../../components/Submissions/Apps";
import Loading from "../../components/Common/Loading";

const Submissions: NextPage = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const user = useSelector(selectUser);
  const apps = useSelector(selectUserApps);
  const dispatch = useDispatch();

  const setApps = async (uid: string) => {
    setIsLoading(true);
    const db = firebase.firestore();
    const res = await db.collection("applications").where("userId", "==", uid).orderBy("updatedAt", "desc").get();
    dispatch(set(res));
    setIsLoading(false);
  };

  const signOut = async () => {
    firebase.auth().signOut();
  };

  useEffect(() => {
    if (user.uid === "") {
      Router.push("sign-up");
      return;
    }
    setApps(user.uid);
  }, [user]);

  return (
    <Layout title="Submissions">
      {user.uid && (
        <>
          {isLoading ? (
            <div className="mt-64">
              <Loading />
            </div>
          ) : (
            <div className="px-8 py-10">
              <h1 className="text-2xl font-semibold">Submissions</h1>
              <div className="overflow-scroll mt-3">
                <table className="text-base border">
                  <thead>
                    <tr className="border flex items-center h-9">
                      <th className="w-64">Name</th>
                      <th className="w-32">Status</th>
                      <th className="w-64">Actions</th>
                    </tr>
                  </thead>
                  {Object.keys(apps).length ? (
                    <Apps apps={apps} />
                  ) : (
                    <tbody>
                      <tr className="text-center">
                        <td colSpan={3} className="py-10">
                          <p className="mb-2">Create your first submission</p>
                          <Link href="/submissions/create" as="/submissions/create">
                            <button className="text-white px-3 py-1 rounded bg-green-400">New Submission</button>
                          </Link>
                        </td>
                      </tr>
                    </tbody>
                  )}
                </table>
              </div>
              <div className="mt-5">
                <Link href="/submissions/create" as="/submissions/create">
                  <button className="px-5 mr-1 font-bold h-9 border rounded hover:bg-gray-100 dark:hover:bg-gray-700">
                    New Submission
                  </button>
                </Link>
                <button className="px-5 font-bold h-9 border rounded hover:bg-gray-100 dark:hover:bg-gray-700" onClick={signOut}>
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
