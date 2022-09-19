import validate from "../../validate";
import setErrors from "../../setErrors";
import isNotEmpty from "../../types/isNotEmpty";
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
  pcImageUrls: string[],
  mobileImageUrls: string[]
): boolean => {
  let errors: any = { link: [], category: [], tag1: [], tag2: [], tag3: [], description: [], icon: [], screenshot: [] };
  // required
  validate(isNotEmpty, link, "link", "Please input the link", errors);
  validate(isNotEmpty, category, "category", "Please select the category", errors);
  validate(isNotEmpty, tag1, "tag1", "Please input the tag", errors);
  validate(isNotEmpty, description, "description", "Please input the  description", errors);
  validate(isNotEmpty, iconUrl, "icon", "Please select the icon", errors);
  // custom
  errors.link.length || validate(isUrl, link, "link", "Please input the correct Link", errors);
  validate(isAlphanum, tag1, "tag1", "Please input the tag1 in single-byte alphanumeric character", errors);
  validate(isAlphanum, tag2, "tag2", "Please input the tag2 in single-byte alphanumeric character", errors);
  validate(isAlphanum, tag3, "tag3", "Please input the tag3 in single-byte alphanumeric character", errors);
  if (pcImageUrls[0] === undefined && mobileImageUrls[0] === undefined) {
    errors.screenshot.push("Please select mobile size or PC size screenshot");
  }
  return setErrors(set, errors);
};

export default validateEdit;
