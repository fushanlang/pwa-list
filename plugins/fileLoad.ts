const fileLoad = (file: File, setImageUrlList: any, setImages: any) => {
  return new Promise((resolve, reject) => {
    var reader = new FileReader();
    reader.onload = (e) => {
      setImageUrlList((array) => [...array, e.target.result]);
      setImages((array) => [...array, file]);
      resolve("success");
    };
    reader.readAsDataURL(file);
  });
};

export default fileLoad;
