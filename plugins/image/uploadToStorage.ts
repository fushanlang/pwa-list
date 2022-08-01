import firebase from "../firebase";

import "firebase/storage";

const storage = firebase.storage();

const uploadToStorage = async (folder: string, name: string, image: File, fileName: string) => {
  await storage.ref(`${folder}/${name}/${fileName}.png`).put(image);
  const res = await storage.ref(`${folder}`).child(`${name}/${fileName}.png`).getDownloadURL();
  return res;
};

export default uploadToStorage;
