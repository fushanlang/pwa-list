import validate from "../../validate";
import setErrors from "../../setErrors";
import isNotNull from "../../types/isNotNull";
import isUrl from "../../types/isUrl";
import isAlphanum from "../../types/isAlphanum";
const validateEdit = (
  set: React.Dispatch<any>,
  link: string,
  category: string,
  tag1: string,
  tag2: string,
  tag3: string,
  description: string,
  iconUrl: string,
  pcImageUrlList: string[],
  mobileImageUrlList: string[]
): boolean => {
  let errors: any = { link: [], category: [], tag1: [], tag2: [], tag3: [], description: [], iconUrl: [], screenshot: [] };
  // required
  validate(isNotNull, link, "link", "Please input the link", errors);
  validate(isNotNull, category, "category", "Please select the category", errors);
  validate(isNotNull, tag1, "tag1", "Please input the tag", errors);
  validate(isNotNull, description, "description", "Please input the  description", errors);
  validate(isNotNull, iconUrl, "icon", "Please select the icon", errors);
  // custom
  errors.link.length || validate(isUrl, link, "link", "Please input the correct Link", errors);
  validate(isAlphanum, tag1, "tag1", "Please input the tag1 in single-byte alphanumeric character", errors);
  validate(isAlphanum, tag2, "tag2", "Please input the tag2 in single-byte alphanumeric character", errors);
  validate(isAlphanum, tag3, "tag3", "Please input the tag3 in single-byte alphanumeric character", errors);
  if (pcImageUrlList[0] === undefined && mobileImageUrlList[0] === undefined) {
    errors.screenshot.push("Please select mobile size or PC size screenshot");
  }
  return setErrors(set, errors);
};

export default validateEdit;
