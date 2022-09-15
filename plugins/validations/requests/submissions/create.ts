import isNotNull from "../../isNotNull";
import isUrl from "../../isUrl";
import isAlphanum from "../../isAlphanum";
import isNotDuplicate from "../../isNotDuplicate";

const validateCreate = async (
  setErrors: any,
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
  let nameErrors = [];
  let linkErrors = [];
  let categoryErrors = [];
  let tag1Errors = [];
  let tag2Errors = [];
  let tag3Errors = [];
  let descriptionErrors = [];
  let iconErrors = [];
  let screenshotErrors = [];
  // required
  if (!isNotNull(name)) nameErrors.push("The Name field is required");
  if (!isNotNull(link)) linkErrors.push("The Link field is required");
  if (!isNotNull(category)) categoryErrors.push("The Category field is required");
  if (!isNotNull(tag1)) tag1Errors.push("The Tag field is required");
  if (!isNotNull(description)) descriptionErrors.push("The About this app field is required");
  if (!isNotNull(icon)) iconErrors.push("The Icon is required");
  // custom
  if (!linkErrors.length && !isUrl(link)) linkErrors.push("Please enter the correct Link");
  if (!isAlphanum(name)) nameErrors.push("Please enter the name in single-byte alphanumeric characters");
  if (!isAlphanum(tag1)) tag1Errors.push("Please enter the tag1 in single-byte alphanumeric characters");
  if (!isAlphanum(tag2)) tag2Errors.push("Please enter the tag2 in single-byte alphanumeric characters");
  if (!isAlphanum(tag3)) tag3Errors.push("Please enter the tag3 in single-byte alphanumeric characters");
  if (pcImages[0] === undefined && mobileImages[0] === undefined) {
    screenshotErrors.push("Please enter either mobile size or PC size screenshot");
  }
  if (!nameErrors.length && !(await isNotDuplicate(name, "nameLowercase"))) {
    nameErrors.push("The app name has already been registered");
  }
  if (
    nameErrors.length ||
    linkErrors.length ||
    categoryErrors.length ||
    tag1Errors.length ||
    tag2Errors.length ||
    tag3Errors.length ||
    descriptionErrors.length ||
    iconErrors.length ||
    screenshotErrors.length
  ) {
    setErrors({
      name: nameErrors,
      link: linkErrors,
      category: categoryErrors,
      tag1: tag1Errors,
      tag2: tag2Errors,
      tag3: tag3Errors,
      description: descriptionErrors,
      icon: iconErrors,
      screenshot: screenshotErrors,
    });
    return false;
  }
  return true;
};

export default validateCreate;
