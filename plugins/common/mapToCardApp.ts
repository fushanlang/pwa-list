import firebase from "firebase/app";
import "firebase/firestore";

import type { CardApp } from "../../types/apps";

export default (doc: firebase.firestore.QueryDocumentSnapshot<firebase.firestore.DocumentData>): CardApp => {
  return {
    id: doc.id,
    name: doc.data().name,
    nameLowercase: doc.data().nameLowercase,
    icon: doc.data().icon,
    category: doc.data().category,
    tag1: doc.data().tag1,
    tag2: doc.data().tag2,
    tag3: doc.data().tag3,
    description: doc.data().description,
  };
};
