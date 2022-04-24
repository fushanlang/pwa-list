import uploadToStorage from "../image/uploadToStorage";
const updateImage = async (
  imagesFolder: any,
  imageUrl: string,
  images: any,
  name: string,
  num: number,
  fileName: string
) => {
  if (imageUrl !== null && !imageUrl.match(/https?/)) {
    imageUrl = await uploadToStorage(imagesFolder, name, images[num], fileName);
    return (num += 1);
  }
  return num;
};

export default updateImage;
