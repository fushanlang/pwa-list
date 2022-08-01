import { createContext, useContext, useEffect, useState } from "react";

import firebase from "../plugins/firebase";

const AuthContext = createContext(null);

type Props = { children: React.ReactNode };

export const AuthProvider: React.FC<Props> = ({ children }) => {
  const [loginUser, setLoginUser] = useState<firebase.User | null>();

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      setLoginUser(user);
    });
  }, []);

  return <AuthContext.Provider value={loginUser}>{children}</AuthContext.Provider>;
};

export const useLoginUser = () => useContext(AuthContext);
