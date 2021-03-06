import React, { useState } from "react";
import Layout from "../components/Layout";
import ImagePreview from "../components/ImagePreview";
import firebase from "../plugins/firebase";
import "firebase/firestore";
import "firebase/storage";

const db = firebase.firestore();
const storage = firebase.storage();

const add = () => {
  const [name, setName] = useState<String | null>(null);
  const [link, setLink] = useState<String | null>(null);
  const [overview, setOverview] = useState<String | null>(null);
  const [description, setDescription] = useState<String | null>(null);
  const [pcImages, setPcImages] = useState([]);
  const [pcImageUrlList, setPcImageUrlList] = useState([]);
  var tmpPcImages = [];
  var tmpPcImageUrlList = [];
  function fileLoad(file, tmpPcImageUrlList, tmpPcImages, i, fileLengh) {
    return new Promise((resolve, reject) => {
      var end = fileLengh - 1;
      var reader = new FileReader();
      tmpPcImages.push(file);
      reader.onload = (e) => {
        tmpPcImageUrlList.push(e.target.result);
        if (i == end) {
          setPcImageUrlList(tmpPcImageUrlList);
          setPcImages(tmpPcImages);
        }
        resolve("success");
      };
      reader.readAsDataURL(file);
    });
  }
  const onChangePcImageHandler = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    var files = e.target.files;
    tmpPcImageUrlList = [...pcImageUrlList];
    tmpPcImages = [...pcImages];
    for (let i = 0; i < files.length; i++) {
      var file = e.target.files[i];
      await fileLoad(file, tmpPcImageUrlList, tmpPcImages, i, files.length);
    }
  };

  async function uploadToStorage(image, fileName) {
    if (image == null) {
      return null;
    }
    await storage.ref(`application-images/${name}_${fileName}`).put(image);
    let res = await storage
      .ref("application-images")
      .child(`${name}_${fileName}`)
      .getDownloadURL();
    return res;
  }
  const handleDeleteImage = async () => {};
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    var image_pc1 = pcImages[0]
      ? await uploadToStorage(pcImages[0], "pc1")
      : null;
    var image_pc2 = pcImages[1]
      ? await uploadToStorage(pcImages[1], "pc2")
      : null;
    var image_pc3 = pcImages[2]
      ? await uploadToStorage(pcImages[2], "pc3")
      : null;
    // var imageMobile1DlUrl = await uploadToStorage(imageMobile1, "mobile1");
    // var imageMobile2DlUrl = await uploadToStorage(imageMobile2, "mobile2");
    // var imageMobile3DlUrl = await uploadToStorage(imageMobile3, "mobile3");
    db.collection("applications").add({
      name: name,
      link: link,
      overview: overview,
      description: description,
      image_pc1: image_pc1,
      image_pc2: image_pc2,
      image_pc3: image_pc3,
      // image_mobile1: imageMobile1DlUrl,
      // image_mobile2: imageMobile2DlUrl,
      // image_mobile3: imageMobile3DlUrl,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
    });
  };
  return (
    <div>
      <Layout>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block font-bold mb-2">Name</label>
            <input
              className="shadow border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:ring focus:ring-green-400"
              type="text"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block font-bold mb-2">Link</label>
            <input
              className="shadow border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:ring focus:ring-green-400"
              type="text"
              onChange={(e) => setLink(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block font-bold mb-2">Overview</label>
            <input
              className="shadow border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:ring focus:ring-green-400"
              type="text"
              onChange={(e) => setOverview(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              About this app
              <textarea
                className="shadow form-textarea mt-1 block w-full border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:ring focus:ring-green-400"
                rows={5}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </label>
          </div>
          <label className="block font-bold mb-4">PC Image</label>
          <div className="mb-4 text-center">
            <label className="bg-gray-700 text-white p-2 rounded-lg cursor-pointer hover:bg-gray-900">
              Choose PC Image
              <input
                type="file"
                className="hidden"
                accept="image/*"
                multiple
                onChange={onChangePcImageHandler}
              />
            </label>
          </div>
          <div className="mb-4 flex overflow-scroll">
            <div>
              {pcImageUrlList.map((pcImageUrl, index) => (
                <ImagePreview
                  key={index}
                  imageUrl={pcImageUrl}
                  handleDeleteImage={handleDeleteImage}
                />
              ))}
            </div>
          </div>
          <label className="block font-bold mb-2">Mobile Image</label>

          <div className="text-center">
            <button
              className="w-52 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Submit
            </button>
          </div>
        </form>
      </Layout>
    </div>
  );
};

export default add;
