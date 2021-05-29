import { FC } from "react";
import firebase from "../plugins/firebase";
import Router from "next/router";

const Auth: FC = () => {
  const googleProvider = new firebase.auth.GoogleAuthProvider();
  const twitterProvider = new firebase.auth.TwitterAuthProvider();
  const facebookProvider = new firebase.auth.FacebookAuthProvider();
  const handleTwitterSignUp = () =>
    firebase.auth().signInWithRedirect(twitterProvider);
  const handleGoogleSignUp = () =>
    firebase.auth().signInWithRedirect(googleProvider);
  const handleFacebookSignIn = () =>
    firebase.auth().signInWithRedirect(facebookProvider);
  return (
    <div>
      <div>
        <div className="flex justify-center flex-wrap">
          <button
            className="flex items-center justify-center mx-2 my-2 w-56 h-10 font-bold border rounded shadow-sm hover:shadow-none hover:bg-gray-100"
            onClick={handleGoogleSignUp}
          >
            <div className="mr-3 w-6">
              <img src={"/logo/Google.png"} />
            </div>
            Sign in with Google
          </button>
          <button
            className="flex items-center justify-center mx-2 my-2 w-56 h-10 font-bold border rounded shadow-sm hover:shadow-none hover:bg-gray-100"
            onClick={handleTwitterSignUp}
          >
            <div className="mr-3 w-7">
              <img src={"/logo/Twitter.png"} />
            </div>
            Sign in with Twitter
          </button>
          <button
            className="flex items-center justify-center mx-2 my-2 w-56 h-10 font-bold border rounded shadow-sm hover:shadow-none hover:bg-gray-100"
            onClick={handleFacebookSignIn}
          >
            <div className="mr-3 w-5">
              <img src={"/logo/FaceBook.png"} />
            </div>
            Sign in with Facebook
          </button>
        </div>
      </div>
    </div>
  );
};
export default Auth;
