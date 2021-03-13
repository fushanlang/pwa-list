const fileLoad = (
  file: File,
  i: number,
  fileLengh: number,
  setImageUrlList: any,
  setImages: any,
  tmpImageUrlList: any[],
  tmpImages: any[]
) => {
  return new Promise((resolve, reject) => {
    var end = fileLengh - 1;
    var reader = new FileReader();
    tmpImages.push(file);
    reader.onload = (e) => {
      tmpImageUrlList.push(e.target.result);
      if (i == end) {
        setImageUrlList(tmpImageUrlList);
        setImages(tmpImages);
      }
      resolve("success");
    };
    reader.readAsDataURL(file);
  });
};

export default fileLoad;
