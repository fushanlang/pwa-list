import { useEffect } from "react";
import { NextPage } from "next";
import Router from "next/router";
import { useSelector } from "react-redux";

import { selectUser } from "../../store/modules/user";
import Layout from "../../components/Layout/Layout";
import Auth from "../../components/SignUp/Auth";
const logo = {
  fontFamily: "'Nunito', sans-serif",
};

const SignUp: NextPage = () => {
  const user = useSelector(selectUser);
  useEffect(() => {
    user.uid && Router.push("/submissions");
  }, [user]);

  return (
    <Layout title="Sign-Up">
      <div className="text-center mt-16">
        <h1 className="text-3xl font-bold mb-7" style={logo}>
          P<span className="text-green-500">W</span>A LIST
        </h1>
        <h2 className="text-2xl font-bold mb-3">Sign up on PWA List</h2>
        <p className="text-lg mb-5">In order to add and manage your apps, please sign up for an account.</p>
        <Auth />
      </div>
    </Layout>
  );
};
export default SignUp;
