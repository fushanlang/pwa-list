import { FC, useEffect, useContext } from "react";
// import { AuthContext } from "../contexts/Auth";
import Layout from "../components/Layout";
import Auth from "../components/Auth";
import isLogin from "../plugins/isLogin";
import Router from "next/router";
const signUp = () => {
  // const { currentUser } = useContext(AuthContext);
  // useEffect(() => {
  //   currentUser && Router.push("/");
  // }, [currentUser]);
  useEffect(() => {
    isLogin && Router.push("/");
  }, [isLogin]);
  return (
    <Layout title="Sign-Up">
      {!isLogin && (
        <div className="text-center mt-3 py-5 bg-white rounded-lg">
          <h1 className="text-2xl font-bold mb-1">Sign up on PWA List</h1>
          <p className="text-lg mb-5">
            In order to add and manage your apps, please sign up for an account.
          </p>
          <Auth></Auth>
        </div>
      )}
    </Layout>
  );
};
export default signUp;
