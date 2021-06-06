import { useEffect, useContext } from "react";
import { NextPage } from "next";
import { AuthContext } from "../../contexts/Auth";
import Layout from "../../components/Layout";
import Auth from "../../components/SignUp/Auth";
import Router from "next/router";
const SignUp: NextPage = () => {
  const { currentUser } = useContext(AuthContext);
  useEffect(() => {
    currentUser && Router.push("/submissions");
  }, [currentUser]);
  return (
    <Layout title="Sign-Up">
      {!currentUser && (
        <div className="text-center mt-3 pt-10 pb-7 bg-white rounded-lg">
          <img className="w-36 inline-block mb-3" src="/icon-for-sign-up.png" />
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
export default SignUp;
