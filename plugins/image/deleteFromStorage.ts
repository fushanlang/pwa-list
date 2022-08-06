import firebase from "../firebase";

import "firebase/storage";

const deleteFromStorage = (...path: string[]): void => {
  const storageRef = firebase.storage().ref(path.join("/"));
  storageRef.listAll().then((listResults) => {
    const promises = listResults.items.map((item) => {
      return item.delete();
    });
    Promise.all(promises);
  });
};

export default deleteFromStorage;
