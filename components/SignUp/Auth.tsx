import Router from "next/router";

import firebase from "../../plugins/firebase";
import SignInWithOtherService from "./LoginWithOtherService";

const Auth: React.FC = () => {
  const googleProvider = new firebase.auth.GoogleAuthProvider();
  const twitterProvider = new firebase.auth.TwitterAuthProvider();
  const facebookProvider = new firebase.auth.FacebookAuthProvider();

  const handleClickGoogleSignIn = () => {
    firebase.auth().signInWithPopup(googleProvider);
  };
  const handleClickTwitterSignIn = () => {
    firebase.auth().signInWithPopup(twitterProvider);
  };
  const handleClickFacebookSignIn = () => {
    firebase.auth().signInWithPopup(facebookProvider);
  };
  return (
    <div className="flex justify-center flex-wrap">
      <SignInWithOtherService label="Sign in with Google" imagePath="/icons/Google.png" handleClick={handleClickGoogleSignIn} />
      <SignInWithOtherService label="Sign in with Twitter" imagePath="/icons/Twitter.png" handleClick={handleClickTwitterSignIn} />
      <SignInWithOtherService label="Sign in with Facebook" imagePath="/icons/FaceBook.png" handleClick={handleClickFacebookSignIn} />
    </div>
  );
};
export default Auth;
