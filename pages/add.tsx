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
  const [imagePc1, setImagePc1] = useState<File | null>(null);
  const [imagePc2, setImagePc2] = useState<File | null>(null);
  const [imagePc3, setImagePc3] = useState<File | null>(null);
  const [imagePc1Url, setImagePc1Url] = useState<any | null>(null);
  const [imagePc2Url, setImagePc2Url] = useState<any | null>(null);
  const [imagePc3Url, setImagePc3Url] = useState<any | null>(null);
  const [imageMobile1, setImageMobile1] = useState<File | null>(null);
  const [imageMobile2, setImageMobile2] = useState<File | null>(null);
  const [imageMobile3, setImageMobile3] = useState<File | null>(null);
  const [imageMobile1Url, setImageMobile1Url] = useState<any | null>(null);
  const [imageMobile2Url, setImageMobile2Url] = useState<any | null>(null);
  const [imageMobile3Url, setImageMobile3Url] = useState<any | null>(null);
  function setImagePc(num, file) {
    var functions = [setImagePc1, setImagePc2, setImagePc3];
    if (typeof functions[num] !== "undefined") {
      functions[num](file);
    }
  }
  function setImageMobile(num, file) {
    var functions = [setImageMobile1, setImageMobile2, setImageMobile3];
    if (typeof functions[num] !== "undefined") {
      functions[num](file);
    }
  }
  function setImagePcUrl(num, result) {
    var functions = [setImagePc1Url, setImagePc2Url, setImagePc3Url];
    if (typeof functions[num] !== "undefined") {
      functions[num](result);
    }
  }
  function setImageMobileUrl(num, result) {
    var functions = [
      setImageMobile1Url,
      setImageMobile2Url,
      setImageMobile3Url,
    ];
    if (typeof functions[num] !== "undefined") {
      functions[num](result);
    }
  }
  function fileSet(files, setImage, setImageUrl, i, checkData, checkImage) {
    var file = files[i];
    var reader = new FileReader();
    var j = 0;
    for (let k = 0; k < 2; k++) {
      if (checkData[k] != null || checkImage[k] != null) {
        j += 1;
      }
    }
    console.log(j);
    checkData[j] = true;
    setImage(j, file);
    reader.onload = (e) => {
      setImageUrl(j, e.target.result);
    };
    reader.readAsDataURL(file);
    return checkData;
  }
  const onChangePcImageHandler = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    var checkDataPc = [];
    var checkImagePc = [imagePc1Url, imagePc2Url, imagePc3Url];
    var files = e.target.files;
    for (let i = 0; i < files.length; i++) {
      checkDataPc = fileSet(
        files,
        setImagePc,
        setImagePcUrl,
        i,
        checkDataPc,
        checkImagePc
      );
    }
  };
  const onChangeMobileImageHandler = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    var checkDataMobile = [];
    var checkImageMobile = [imageMobile1Url, imageMobile2Url, imageMobile3Url];
    var files = e.target.files;
    for (let i = 0; i < files.length; i++) {
      checkDataMobile = fileSet(
        files,
        setImageMobile,
        setImageMobileUrl,
        i,
        checkDataMobile,
        checkImageMobile
      );
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
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    var imagePc1DlUrl = await uploadToStorage(imagePc1, "pc1");
    var imagePc2DlUrl = await uploadToStorage(imagePc2, "pc2");
    var imagePc3DlUrl = await uploadToStorage(imagePc3, "pc3");
    var imageMobile1DlUrl = await uploadToStorage(imageMobile1, "mobile1");
    var imageMobile2DlUrl = await uploadToStorage(imageMobile2, "mobile2");
    var imageMobile3DlUrl = await uploadToStorage(imageMobile3, "mobile3");
    db.collection("applications").add({
      name: name,
      link: link,
      overview: overview,
      description: description,
      image_pc1: imagePc1DlUrl,
      image_pc2: imagePc2DlUrl,
      image_pc3: imagePc3DlUrl,
      image_mobile1: imageMobile1DlUrl,
      image_mobile2: imageMobile2DlUrl,
      image_mobile3: imageMobile3DlUrl,
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
            <ImagePreview
              imageUrl={imagePc1Url}
              setImage={setImagePc1}
              setImageUrl={setImagePc1Url}
            />
            <ImagePreview
              imageUrl={imagePc2Url}
              setImage={setImagePc2}
              setImageUrl={setImagePc2Url}
            />
            <ImagePreview
              imageUrl={imagePc3Url}
              setImage={setImagePc3}
              setImageUrl={setImagePc3Url}
            />
          </div>
          <label className="block font-bold mb-2">Mobile Image</label>
          <div className="mb-4 text-center">
            <div>
              <img className="rounded max-h-96 mx-2" src={imageMobile1Url} />
            </div>
            <div>
              <img className="rounded max-h-96 mx-2" src={imageMobile2Url} />
            </div>
            <div>
              <img className="rounded max-h-96 mx-2" src={imageMobile3Url} />
            </div>
            <label className="bg-gray-700 text-white p-2 rounded-lg cursor-pointer hover:bg-gray-900">
              Choose Mobile Image
              <input
                type="file"
                className="hidden"
                accept="image/*"
                multiple
                onChange={onChangeMobileImageHandler}
              />
            </label>
          </div>
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
