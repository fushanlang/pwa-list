import firebase from "../firebase";
import "firebase/storage";
const storage = firebase.storage();
const deleteFromStorage = async (
  folder: string,
  name: string,
  fileName: string
) => {
  let res = storage.ref(`${folder}/${name}/${fileName}.png`).delete();
  return res;
};

export default deleteFromStorage;