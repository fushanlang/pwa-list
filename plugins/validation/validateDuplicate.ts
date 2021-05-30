import firebase from "../firebase";
import "firebase/firestore";
const db = firebase.firestore();
const validateDuplicate = async (
  property: string,
  field: string
): Promise<boolean> => {
  if (property === "" || property === null) return false;
  var lowercaseProperty = property.toLowerCase().replace(/\s+/g, "");
  const result = await db
    .collection("applications")
    .where(field, "==", lowercaseProperty)
    .get();
  if (result.empty) {
    return false;
  }
  return true;
};

export default validateDuplicate;
