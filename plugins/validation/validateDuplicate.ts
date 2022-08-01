import firebase from "../firebase";

import "firebase/firestore";

const db = firebase.firestore();

const validateDuplicate = async (char: string, field: string): Promise<boolean> => {
  if (char === "" || char === null) return false;

  const lowercaseProperty = char.toLowerCase().replace(/\s|-|\./g, "");
  const result = await db.collection("applications").where(field, "==", lowercaseProperty).get();
  if (result.empty) {
    return false;
  }
  return true;
};

export default validateDuplicate;
