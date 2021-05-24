import { useContext } from "react";
import { AuthContext } from "../contexts/Auth";
const isLogin = () => {
  const { currentUser } = useContext(AuthContext);
  if (currentUser) {
    return true;
  }
  return false;
};

export default isLogin;
