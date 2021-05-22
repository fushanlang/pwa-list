import { FC, useEffect, useContext } from "react";
import Router from "next/router";
import firebase from "../plugins/firebase";
import { AuthContext } from "../contexts/Auth";

const Auth: FC = () => {
  const { currentUser } = useContext(AuthContext);

  //   useEffect(() => {
  //     currentUser && Router.push("/");
  //   }, [currentUser]);

  const login = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithRedirect(provider);
  };
  const logout = async () => {
    firebase.auth().signOut();
  };
  return (
    <div>
      <div className="container">
        <button onClick={login}>googleでログインする</button>
      </div>
      <div className="container">
        <button onClick={logout}>ログアウト</button>
      </div>
    </div>
  );
};
export default Auth;
