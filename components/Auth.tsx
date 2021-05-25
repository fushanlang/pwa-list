import { FC } from "react";
import firebase from "../plugins/firebase";

const Auth: FC = () => {
  const login = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithRedirect(provider);
  };
  return (
    <div>
      <div>
        <div className="flex justify-center">
          <button
            className="flex items-center justify-center w-56 font-bold h-10 border rounded shadow-sm hover:shadow-none hover:bg-gray-100"
            onClick={login}
          >
            <div className="mr-3 w-6">
              <img src={"/logo/Google.png"} />
            </div>
            Sign in with Google
          </button>
        </div>
      </div>
    </div>
  );
};
export default Auth;
