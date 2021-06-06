import uploadToStorage from "../common/uploadToStorage";
const updateImage = async (
  imagesFolder,
  imageUrl,
  images,
  name,
  num,
  fileName
) => {
  if (imageUrl !== null && !imageUrl.match(/https?/)) {
    imageUrl = await uploadToStorage(imagesFolder, name, images[num], fileName);
    return (num += 1);
  }
  return num;
};

export default updateImage;
