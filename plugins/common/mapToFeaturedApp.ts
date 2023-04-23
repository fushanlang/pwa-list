import firebase from "firebase/app";
import "firebase/firestore";

import type { FeaturedApp } from "../../types/apps";

export default (doc: firebase.firestore.QueryDocumentSnapshot<firebase.firestore.DocumentData>): FeaturedApp => {
  return {
    id: doc.id,
    name: doc.data().name,
    nameLowercase: doc.data().nameLowercase,
    category: doc.data().category,
    promotionImage: doc.data().promotionImage,
  };
};
