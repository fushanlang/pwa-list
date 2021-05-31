import firebase from "./firebase";
import "firebase/firestore";
const db = firebase.firestore();
const fetchUserAppData = async (setApps, setIsLoading, userId) => {
  const apps = await db
    .collection("applications")
    .where("userId", "==", userId)
    .orderBy("updatedAt", "desc")
    .get();
  setApps(
    apps.docs.map((doc) => ({
      id: doc.id,
      name: doc.data().name,
      nameLowercase: doc.data().nameLowercase,
      icon: doc.data().icon,
      link: doc.data().link,
      isPublic: doc.data().isPublic,
      imageMobile1: doc.data().imageMobile1,
      imageMobile2: doc.data().imageMobile2,
      imageMobile3: doc.data().imageMobile3,
      imagePc1: doc.data().imagePc1,
      imagePc2: doc.data().imagePc2,
      imagePc3: doc.data().imagePc3,
    }))
  );
  setIsLoading(false);
};

export default fetchUserAppData;
