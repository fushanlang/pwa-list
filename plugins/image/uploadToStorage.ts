import firebase from "../firebase";

import "firebase/storage";

const storage = firebase.storage();

const uploadToStorage = async (folder: string, name: string, image: File, fileName: string): Promise<string> => {
  if (!image) return null;
  const extension = image.name.split(".").pop();
  await storage.ref(`${folder}/${name}/${fileName}.${extension}`).put(image);
  return await storage.ref(`${folder}`).child(`${name}/${fileName}.${extension}`).getDownloadURL();
};

export default uploadToStorage;
