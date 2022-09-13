import Router from "next/router";

import firebase from "../../plugins/firebase";
import SignInWithOtherService from "./LoginWithOtherService";

const Auth: React.FC = () => {
  const googleProvider = new firebase.auth.GoogleAuthProvider();
  const twitterProvider = new firebase.auth.TwitterAuthProvider();
  const facebookProvider = new firebase.auth.FacebookAuthProvider();

  const handleGoogleSignIn = () => {
    firebase.auth().signInWithPopup(googleProvider);
  };
  const handleTwitterSignIn = () => {
    firebase.auth().signInWithPopup(twitterProvider);
  };
  const handleFacebookSignIn = () => {
    firebase.auth().signInWithPopup(facebookProvider);
  };
  return (
    <div className="flex justify-center flex-wrap">
      <SignInWithOtherService label="Sign in with Google" imagePath="/icons/Google.png" handleSignIn={handleGoogleSignIn} />
      <SignInWithOtherService label="Sign in with Twitter" imagePath="/icons/Twitter.png" handleSignIn={handleTwitterSignIn} />
      <SignInWithOtherService label="Sign in with Facebook" imagePath="/icons/FaceBook.png" handleSignIn={handleFacebookSignIn} />
    </div>
  );
};
export default Auth;
