import validateNotNull from "../validation/validateNotNull";
import validateUrl from "../validation/validateUrl";
import validateAlphanum from "../validation/validateAlphanum";
import validateNotDuplicate from "../validation/validateNotDuplicate";

const createValidate = async (
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
  if (!validateNotNull(name)) nameErrors.push("The Name field is required");
  if (!validateNotNull(link)) linkErrors.push("The Link field is required");
  if (!validateNotNull(category)) categoryErrors.push("The Category field is required");
  if (!validateNotNull(tag1)) tag1Errors.push("The Tag field is required");
  if (!validateNotNull(description)) descriptionErrors.push("The About this app field is required");
  if (!validateNotNull(icon)) iconErrors.push("The Icon is required");
  // custom
  if (!linkErrors.length && !validateUrl(link)) linkErrors.push("Please enter the correct Link");
  if (!validateAlphanum(name)) nameErrors.push("Please enter the name in single-byte alphanumeric characters");
  if (!validateAlphanum(tag1)) tag1Errors.push("Please enter the tag1 in single-byte alphanumeric characters");
  if (!validateAlphanum(tag2)) tag2Errors.push("Please enter the tag2 in single-byte alphanumeric characters");
  if (!validateAlphanum(tag3)) tag3Errors.push("Please enter the tag3 in single-byte alphanumeric characters");
  if (pcImages[0] === undefined && mobileImages[0] === undefined) {
    screenshotErrors.push("Please enter either mobile size or PC size screenshot");
  }
  if (!nameErrors.length && !(await validateNotDuplicate(name, "nameLowercase"))) {
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

export default createValidate;
