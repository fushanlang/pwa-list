import validateRequired from "../validation/validateRequired";
import validateUrl from "../validation/validateUrl";
import validateAlphanum from "../validation/validateAlphanum";
const editValidate = (
  setErrors: any,
  link: string,
  category: string,
  tag1: string,
  tag2: string,
  tag3: string,
  description: string,
  iconUrl: string,
  pcImageUrlList: string[],
  mobileImageUrlList: string[]
) => {
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
  if (validateRequired(link)) linkErrors.push("The Link field is required");
  if (validateRequired(category)) categoryErrors.push("The Category field is required");
  if (validateRequired(tag1)) tag1Errors.push("The Tag field is required");
  if (validateRequired(description)) descriptionErrors.push("The About this app field is required");
  if (validateRequired(iconUrl)) iconErrors.push("The Icon is required");
  // custom
  if (validateUrl(link)) linkErrors.push("Please enter the correct Link");
  if (validateAlphanum(tag1)) tag1Errors.push("Please enter the tag1 in single-byte alphanumeric characters");
  if (validateAlphanum(tag2)) tag2Errors.push("Please enter the tag2 in single-byte alphanumeric characters");
  if (validateAlphanum(tag3)) tag3Errors.push("Please enter the tag3 in single-byte alphanumeric characters");
  if (pcImageUrlList[0] === undefined && mobileImageUrlList[0] === undefined)
    screenshotErrors.push("Please enter either mobile size or PC size screenshot");

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

export default editValidate;
