import { NextPage } from "next";
import firebase from "../../plugins/firebase";
import Layout from "../../components/Layout/Layout";
import Router from "next/router";
const SignUpLoading: NextPage = () => {
  firebase.auth().onAuthStateChanged((user) => {
    user && Router.push("/submissions");
  });
  return (
    <Layout title="Sign-Up-Loading">
      <div className="text-center mt-52">
        <div className="loader" />
        <div className="text-xl mt-10">Signing up now...</div>
      </div>
    </Layout>
  );
};
export default SignUpLoading;
