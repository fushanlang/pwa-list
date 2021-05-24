import { FC, useEffect, useContext } from "react";
import Layout from "../components/Layout";
import isLogin from "../plugins/isLogin";
import Router from "next/router";
const submissions = () => {
  // const { currentUser } = useContext(AuthContext);
  // useEffect(() => {
  //   currentUser && Router.push("/");
  // }, [currentUser]);
  //   useEffect(() => {
  //     isLogin && Router.push("/");
  //   }, [isLogin]);
  return (
    <Layout title="Submissions">
      <div className="text-center mt-3 py-5 bg-white rounded-lg">
        <h1 className="text-2xl font-bold mb-1">submissions</h1>
      </div>
    </Layout>
  );
};
export default submissions;
