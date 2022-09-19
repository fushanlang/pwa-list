import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { auth } from "../../plugins/firebase";
import { login, logout } from "../../store/modules/user";

const Auth: React.FC = ({ children }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    const unSub = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch(login({ uid: authUser.uid }));
      } else {
        dispatch(logout());
      }
    });
    return () => {
      unSub();
    };
  }, [dispatch]);
  return <>{children}</>;
};

export default Auth;
