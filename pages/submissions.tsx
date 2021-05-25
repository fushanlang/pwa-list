import { FC, useState, useEffect, useContext } from "react";
import firebase from "../plugins/firebase";
import "firebase/firestore";
import { AuthContext } from "../contexts/Auth";
import Layout from "../components/Layout";
import Router from "next/router";
const db = firebase.firestore();

const submissions = () => {
  const [apps, setApps] = useState<any>([]);
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    currentUser === null && Router.push("sign-up");
  }, [currentUser]);
  useEffect(() => {
    console.log(currentUser);
    const fetchNewAppData = async () => {
      const apps = await db
        .collection("applications")
        .where("userId", "==", currentUser.uid)
        .orderBy("updatedAt", "desc")
        .get();
      setApps(
        apps.docs.map((doc) => ({
          id: doc.id,
          name: doc.data().name,
          nameLowercase: doc.data().nameLowercase,
          icon: doc.data().icon,
          link: doc.data().link,
          isPublic: doc.data().isPublic,
        }))
      );
    };
    fetchNewAppData();
  }, []);

  const logout = async () => {
    firebase.auth().signOut();
  };
  return (
    <Layout title="Submissions">
      {currentUser && (
        <div>
          <div className="bg-white rounded-lg px-4 py-4">
            <h1 className="text-2xl font-bold mb-1">submissions</h1>
            <table className="text-base border-collapse border">
              <thead>
                <tr className="border h-10">
                  <th className="px-3">Name</th>
                  <th className="px-4">Status</th>
                  <th className="px-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {apps.map((app, index) => (
                  <tr key={index} className="border">
                    <td className="flex items-center px-3 h-20">
                      <div className="mr-4 w-16">
                        <img
                          className="rounded-md"
                          src={app.icon || "/default-app-icon.png"}
                        />
                      </div>
                      {app.name}
                    </td>
                    <td className="px-4">
                      {app.isPublic && "Public"}
                      {!app.isPublic && "awaiting approval"}
                    </td>
                    <td className="px-3">
                      <a
                        className="h-10 px-2 py-1 mr-1 border rounded shadow-sm hover:shadow-none hover:bg-gray-100"
                        target="_blank"
                        href={`/app/${app.nameLowercase}`}
                      >
                        View
                      </a>
                      <a className="h-7 px-2 py-1 mr-1 border rounded shadow-sm hover:shadow-none hover:bg-gray-100 pointer-events-none">
                        Edit
                      </a>
                      <a className="h-7 px-2 py-1 border rounded shadow-sm hover:shadow-none hover:bg-gray-100 pointer-events-none">
                        Delete
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div>
              <button
                className="w-48 font-bold h-8 border rounded shadow-sm hover:shadow-none hover:bg-gray-100"
                onClick={logout}
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};
export default submissions;
