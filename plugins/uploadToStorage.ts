import firebase from "../plugins/firebase";
import "firebase/storage";
const storage = firebase.storage();
const uploadToImagesStorage = async (
  folder: string,
  name: string,
  image: File,
  fileName: string
) => {
  if (image == null) {
    return null;
  }
  await storage.ref(`${folder}/${name}_${fileName}`).put(image);
  let res = await storage
    .ref(`${folder}`)
    .child(`${name}_${fileName}`)
    .getDownloadURL();
  return res;
};

export default uploadToImagesStorage;
