import Router from "next/router";

import firebase from "../../plugins/firebase";
import LoginButton from "./LoginButton";

const Auth: React.FC = () => {
  const googleProvider = new firebase.auth.GoogleAuthProvider();
  const twitterProvider = new firebase.auth.TwitterAuthProvider();
  const facebookProvider = new firebase.auth.FacebookAuthProvider();

  const handleGoogleSignIn = () => {
    firebase.auth().signInWithRedirect(googleProvider);
    Router.push("/sign-up/loading");
  };
  const handleTwitterSignIn = () => {
    firebase.auth().signInWithRedirect(twitterProvider);
    Router.push("/sign-up/loading");
  };
  const handleFacebookSignIn = () => {
    firebase.auth().signInWithRedirect(facebookProvider);
    Router.push("/sign-up/loading");
  };
  return (
    <div className="flex justify-center flex-wrap">
      <LoginButton label="Sign in with Google" imagePath="/logo/Google.png" handleLogin={handleGoogleSignIn} />
      <LoginButton label="Sign in with Twitter" imagePath="/logo/Twitter.png" handleLogin={handleTwitterSignIn} />
      <LoginButton label="Sign in with Facebook" imagePath="/logo/FaceBook.png" handleLogin={handleFacebookSignIn} />
    </div>
  );
};
export default Auth;
