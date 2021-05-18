import firebase from "../plugins/firebase";
import "firebase/storage";
const storage = firebase.storage();
const uploadToStorage = async (
  folder: string,
  name: string,
  image: File,
  fileName: string
) => {
  if (image == null) {
    return null;
  }
  await storage.ref(`${folder}/${name}/${fileName}`).put(image);
  let res = await storage
    .ref(`${folder}`)
    .child(`${name}/${fileName}`)
    .getDownloadURL();
  return res;
};

export default uploadToStorage;
