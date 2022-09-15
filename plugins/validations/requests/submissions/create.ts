import validate from "../../validate";
import setErrors from "../../setErrors";
import isNotEmpty from "../../types/isNotEmpty";
import isNotNull from "../../types/isNotNull";
import isUrl from "../../types/isUrl";
import isAlphanum from "../../types/isAlphanum";
import isNotDuplicate from "../../types/isNotDuplicate";

const validateCreate = async (
  set: React.Dispatch<any>,
  name: string,
  link: string,
  category: string,
  tag1: string,
  tag2: string,
  tag3: string,
  description: string,
  icon: File,
  pcImages: File[],
  mobileImages: File[]
): Promise<boolean> => {
  let errors: any = { name: [], link: [], category: [], tag1: [], tag2: [], tag3: [], description: [], icon: [], screenshot: [] };
  // required
  validate(isNotEmpty, name, "name", "Please input the app name", errors);
  validate(isNotEmpty, link, "link", "Please input the link", errors);
  validate(isNotEmpty, category, "category", "Please select the category", errors);
  validate(isNotEmpty, tag1, "tag1", "Please input the tag", errors);
  validate(isNotEmpty, description, "description", "Please input the  description", errors);
  validate(isNotNull, icon, "icon", "Please select the icon", errors);
  // custom
  errors.link.length || validate(isUrl, link, "link", "Please input the correct Link", errors);
  validate(isAlphanum, name, "name", "Please input the app name in single-byte alphanumeric character", errors);
  validate(isAlphanum, tag1, "tag1", "Please input the tag1 in single-byte alphanumeric character", errors);
  validate(isAlphanum, tag2, "tag2", "Please input the tag2 in single-byte alphanumeric character", errors);
  validate(isAlphanum, tag3, "tag3", "Please input the tag3 in single-byte alphanumeric character", errors);
  if (pcImages[0] === undefined && mobileImages[0] === undefined) {
    errors.screenshot.push("Please select mobile size or PC size screenshot");
  }
  if (!errors.name.length && !(await isNotDuplicate(name, "nameLowercase"))) {
    errors.name.push("The app name has already been registered");
  }
  return setErrors(set, errors);
};

export default validateCreate;
