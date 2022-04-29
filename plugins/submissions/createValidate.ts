import validateRequired from "../validation/validateRequired";
import validateUrl from "../validation/validateUrl";
import validateAlphanum from "../validation/validateAlphanum";
import validateDuplicate from "../validation/validateDuplicate";
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
  pcImages: Array<File>,
  mobileImages: Array<File>
) => {
  var nameErrors = [];
  var linkErrors = [];
  var categoryErrors = [];
  var tag1Errors = [];
  var tag2Errors = [];
  var tag3Errors = [];
  var descriptionErrors = [];
  var iconErrors = [];
  var screenshotErrors = [];
  // required
  if (validateRequired(name)) nameErrors.push("The Name field is required");
  if (validateRequired(link)) linkErrors.push("The Link field is required");
  if (validateRequired(category)) categoryErrors.push("The Category field is required");
  if (validateRequired(tag1)) tag1Errors.push("The Tag field is required");
  if (validateRequired(description)) descriptionErrors.push("The About this app field is required");
  if (validateRequired(icon)) iconErrors.push("The Icon is required");
  // custom
  if (validateUrl(link)) linkErrors.push("Please enter the correct Link");
  if (validateAlphanum(name)) nameErrors.push("Please enter the name in single-byte alphanumeric characters");
  if (validateAlphanum(tag1)) tag1Errors.push("Please enter the tag1 in single-byte alphanumeric characters");
  if (validateAlphanum(tag2)) tag2Errors.push("Please enter the tag2 in single-byte alphanumeric characters");
  if (validateAlphanum(tag3)) tag3Errors.push("Please enter the tag3 in single-byte alphanumeric characters");
  if (pcImages[0] === undefined && mobileImages[0] === undefined)
    screenshotErrors.push("Please enter either mobile size or PC size screenshot");
  if (await validateDuplicate(name, "nameLowercase")) nameErrors.push("The app name has already been registered");

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
