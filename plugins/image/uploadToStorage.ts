import firebase from "../firebase";

import "firebase/storage";

const storage = firebase.storage();

const uploadToStorage = async (folder: string, name: string, image: File, fileName: string) => {
  if (!image) return null;

  await storage.ref(`${folder}/${name}/${fileName}.png`).put(image);
  return await storage.ref(`${folder}`).child(`${name}/${fileName}.png`).getDownloadURL();
};

export default uploadToStorage;
