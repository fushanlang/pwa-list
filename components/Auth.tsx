import { FC } from "react";
import firebase from "../plugins/firebase";
import Router from "next/router";

const Auth: FC = () => {
  const googleProvider = new firebase.auth.GoogleAuthProvider();
  const twitterProvider = new firebase.auth.TwitterAuthProvider();
  const handleTwitterSignUp = () =>
    firebase.auth().signInWithRedirect(twitterProvider);
  const handleGoogleSignUp = () =>
    firebase.auth().signInWithRedirect(googleProvider);
  return (
    <div>
      <div>
        <div className="flex justify-center">
          <button
            className="flex items-center justify-center w-56 font-bold h-10 border rounded shadow-sm hover:shadow-none hover:bg-gray-100"
            onClick={handleGoogleSignUp}
          >
            <div className="mr-3 w-6">
              <img src={"/logo/Google.png"} />
            </div>
            Sign in with Google
          </button>
          <button
            className="flex items-center justify-center w-56 font-bold h-10 border rounded shadow-sm hover:shadow-none hover:bg-gray-100"
            onClick={handleTwitterSignUp}
          >
            <div className="mr-3 w-7">
              <img src={"/logo/Twitter.png"} />
            </div>
            Sign in with Twitter
          </button>
        </div>
      </div>
    </div>
  );
};
export default Auth;
