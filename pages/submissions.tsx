import { FC, useEffect, useContext } from "react";
import { AuthContext } from "../contexts/Auth";
import Layout from "../components/Layout";
import firebase from "../plugins/firebase";
import Router from "next/router";
const submissions = () => {
  const logout = async () => {
    firebase.auth().signOut();
  };
  const { currentUser } = useContext(AuthContext);
  useEffect(() => {
    !currentUser && Router.push("sign-up");
  }, [currentUser]);
  return (
    <Layout title="Submissions">
      {currentUser && (
        <div>
          <div className="text-center mt-3 py-5 bg-white rounded-lg">
            <h1 className="text-2xl font-bold mb-1">submissions</h1>
          </div>
          <div>
            <button onClick={logout}>ログアウト</button>
          </div>
        </div>
      )}
    </Layout>
  );
};
export default submissions;
