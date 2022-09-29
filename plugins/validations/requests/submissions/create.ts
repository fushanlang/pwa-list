import setErrors from "../../setErrors";
import isNotEmpty from "../../types/isNotEmpty";
import isNotNull from "../../types/isNotNull";
import isUrl from "../../types/isUrl";
import isAlphanum from "../../types/isAlphanum";
import isAllowedFileType from "../../types/isAllowedFileType";
import isAllowedFileSize from "../../types/isAllowedFileSize";
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
  isNotEmpty(name) || errors.name.push("Please input your app's name");
  isNotEmpty(link) || errors.link.push("Please input your app's link");
  isNotEmpty(category) || errors.category.push("Please select a category");
  isNotEmpty(tag1) || errors.tag1.push("Please input a tag");
  isNotEmpty(description) || errors.description.push("Please input your app's description");
  isNotNull(icon) || errors.icon.push("Please select an icon");
  // custom
  isAlphanum(name) || errors.name.push("Please input your app's name in single-byte alphanumeric character");
  isAlphanum(tag1) || errors.tag1.push("Please input a tag1 in single-byte alphanumeric character");
  isAlphanum(tag2) || errors.tag2.push("Please input a tag2 in single-byte alphanumeric character");
  isAlphanum(tag3) || errors.tag3.push("Please input a tag3 in single-byte alphanumeric character");
  errors.link.length || isUrl(link) || errors.link.push("Please input a correct link");
  errors.name.length ||
    (await isNotDuplicate(name, "nameLowercase")) ||
    errors.name.push("The entered app name has already been registered");
  errors.icon.length ||
    isAllowedFileType(icon.type, ["image/jpeg", "image/png"]) ||
    errors.icon.push("Please select png or jpg or jpeg for the icon");
  errors.icon.length || isAllowedFileSize(icon.size, 1000000) || errors.icon.push("Please select png or jpg or jpeg for the icon");

  if (pcImages[0] === undefined && mobileImages[0] === undefined) {
    errors.screenshot.push("Please select mobile size or PC size screenshot");
  }
  const images = [...pcImages, ...mobileImages];
  images.every((image: File) => {
    const isAllowed = isAllowedFileType(image.type, ["image/jpeg", "image/png"]);
    isAllowed || errors.screenshot.push("Please select png or jpg or jpeg for the screenshot");
    return isAllowed;
  });
  images.every((image: File) => {
    const isAllowed = isAllowedFileSize(image.size, 1000000);
    isAllowed || errors.screenshot.push("Please select the screenshot no larger than 1MB");
    return isAllowed;
  });

  return setErrors(set, errors);
};

export default validateCreate;
