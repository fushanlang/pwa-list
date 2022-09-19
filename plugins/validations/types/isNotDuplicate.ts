import { db } from "../../firebase";

const isNotDuplicate = async (char: string, field: string): Promise<boolean> => {
  const lowercaseProperty = char.toLowerCase().replace(/\s|-|\./g, "");
  const result = await db.collection("applications").where(field, "==", lowercaseProperty).get();
  if (result.empty) {
    return true;
  }
  return false;
};

export default isNotDuplicate;
