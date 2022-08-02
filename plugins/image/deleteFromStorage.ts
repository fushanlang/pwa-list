import firebase from "../firebase";

import "firebase/storage";

const storage = firebase.storage();

const deleteFromStorage = (folder: string, name: string, fileName: string): void => {
  storage.ref(`${folder}/${name}/${fileName}.png`).delete();
};

export default deleteFromStorage;
