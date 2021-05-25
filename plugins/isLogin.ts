import { useContext } from "react";
import { AuthContext } from "../contexts/Auth";
const isLogin = () => {
  const { currentUser } = useContext(AuthContext);
  console.log("ログインしてないよ");
  if (currentUser) {
    console.log("ログイン中");
    return true;
  }
  console.log("ログインしてないよ");
  return false;
};

export default isLogin;
