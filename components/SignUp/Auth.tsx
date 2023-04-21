import { auth, GoogleAuthProvider, TwitterAuthProvider, FacebookAuthProvider } from "../../plugins/firebase";
import SignInWithOtherService from "./LoginWithOtherService";

const Auth: React.FC = () => {
  const googleProvider = GoogleAuthProvider;
  const twitterProvider = TwitterAuthProvider;
  const facebookProvider = FacebookAuthProvider;

  const handleClickGoogleSignIn = () => {
    auth.signInWithPopup(googleProvider);
  };
  const handleClickTwitterSignIn = () => {
    auth.signInWithPopup(twitterProvider);
  };
  const handleClickFacebookSignIn = () => {
    auth.signInWithPopup(facebookProvider);
  };
  return (
    <div className="flex justify-center flex-wrap">
      <SignInWithOtherService label="Sign in with Google" imagePath="/icons/Google.png" handleClick={handleClickGoogleSignIn} />
    </div>
  );
};
export default Auth;
