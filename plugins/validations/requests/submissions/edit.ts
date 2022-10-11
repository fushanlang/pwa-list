import setErrors from "../../setErrors";
import isNotEmpty from "../../types/isNotEmpty";
import isUrl from "../../types/isUrl";
import isAlphanum from "../../types/isAlphanum";
import isAllowedFileType from "../../types/isAllowedFileType";
import isAllowedFileSize from "../../types/isAllowedFileSize";

const validateEdit = (
  set: React.Dispatch<any>,
  link: string,
  category: string,
  tag1: string,
  tag2: string,
  tag3: string,
  description: string,
  icon: File,
  pcImages: File[],
  mobileImages: File[],
  iconUrl: string,
  pcImageUrls: string[],
  mobileImageUrls: string[]
): boolean => {
  let errors: any = { link: [], category: [], tag1: [], tag2: [], tag3: [], description: [], icon: [], screenshot: [] };
  // required
  isNotEmpty(link) || errors.link.push("Please input your app's link");
  isNotEmpty(category) || errors.category.push("Please select a category");
  isNotEmpty(tag1) || errors.tag1.push("Please input a tag");
  isNotEmpty(description) || errors.description.push("Please input your app's description");
  isNotEmpty(iconUrl) || errors.icon.push("Please select an icon");
  // custom
  errors.link.length || isUrl(link) || errors.link.push("Please input a correct link");
  isAlphanum(tag1) || errors.tag1.push("Please input a tag1 in single-byte alphanumeric character");
  isAlphanum(tag2) || errors.tag2.push("Please input a tag2 in single-byte alphanumeric character");
  isAlphanum(tag3) || errors.tag3.push("Please input a tag3 in single-byte alphanumeric character");
  errors.icon.length ||
    isAllowedFileType(icon.type, ["image/jpeg", "image/png"]) ||
    errors.icon.push("Please select png or jpg or jpeg file");
  errors.icon.length || isAllowedFileSize(icon.size, 1 * 1024 * 1024) || errors.icon.push("Please select a file no larger than 1MB");

  if (pcImageUrls[0] === undefined && mobileImageUrls[0] === undefined) {
    errors.screenshot.push("Please select mobile size or PC size screenshot");
  }
  const images = [...pcImages, ...mobileImages];
  images.every((image: File) => {
    const isAllowed = isAllowedFileType(image.type, ["image/jpeg", "image/png"]);
    isAllowed || errors.screenshot.push("Please select png or jpg or jpeg file");
    return isAllowed;
  });
  images.every((image: File) => {
    const isAllowed = isAllowedFileSize(image.size, 1 * 1024 * 1024);
    isAllowed || errors.screenshot.push("Please select a file no larger than 1MB");
    return isAllowed;
  });
  return setErrors(set, errors);
};

export default validateEdit;
