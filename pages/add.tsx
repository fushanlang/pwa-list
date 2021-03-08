import React, { useState } from "react";
import Layout from "../components/Layout";
import ImagePreview from "../components/ImagePreview";
import firebase from "../plugins/firebase";
import "firebase/firestore";
import "firebase/storage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinusCircle } from "@fortawesome/free-solid-svg-icons";

const db = firebase.firestore();
const storage = firebase.storage();

const add = () => {
  const [name, setName] = useState<String | null>(null);
  const [link, setLink] = useState<String | null>(null);
  const [overview, setOverview] = useState<String | null>(null);
  const [description, setDescription] = useState<String | null>(null);
  const [icon, setIcon] = useState(null);
  const [iconUrl, setIconUrl] = useState(null);
  const [pcImages, setPcImages] = useState([]);
  const [pcImageUrlList, setPcImageUrlList] = useState([]);
  const [mobileImages, setMobileImages] = useState([]);
  const [mobileImageUrlList, setMobileImageUrlList] = useState([]);
  var tmpPcImages = [];
  var tmpPcImageUrlList = [];
  var tmpMobileImages = [];
  var tmpMobileImageUrlList = [];
  function fileLoad(
    file,
    i,
    fileLengh,
    setImageUrlList,
    setImages,
    tmpImageUrlList,
    tmpImages
  ) {
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
  }

  const onChangeIconHandler = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    var file = e.target.files[0];
    var reader = new FileReader();
    reader.onload = (e) => {
      setIconUrl(e.target.result);
      setIcon(file);
    };
    reader.readAsDataURL(file);
  };

  const onChangePcImageHandler = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    var files = e.target.files;
    tmpPcImageUrlList = [...pcImageUrlList];
    tmpPcImages = [...pcImages];
    for (let i = 0; i < files.length; i++) {
      var file = e.target.files[i];
      await fileLoad(
        file,
        i,
        files.length,
        setPcImageUrlList,
        setPcImages,
        tmpPcImageUrlList,
        tmpPcImages
      );
    }
  };

  const onChangeMobileImageHandler = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    var files = e.target.files;
    tmpMobileImageUrlList = [...mobileImageUrlList];
    tmpMobileImages = [...mobileImages];
    for (let i = 0; i < files.length; i++) {
      var file = e.target.files[i];
      await fileLoad(
        file,
        i,
        files.length,
        setMobileImageUrlList,
        setMobileImages,
        tmpMobileImageUrlList,
        tmpMobileImages
      );
    }
  };
  const handleDeleteIcon = async () => {
    setIcon(null);
    setIconUrl(null);
  };

  const handleDeletePcImage = async (index) => {
    tmpPcImageUrlList = [...pcImageUrlList];
    tmpPcImages = [...pcImages];
    tmpPcImages.splice(index, 1);
    tmpPcImageUrlList.splice(index, 1);
    setPcImages(tmpPcImages);
    setPcImageUrlList(tmpPcImageUrlList);
  };

  const handleDeleteMobileImage = async (index) => {
    tmpMobileImageUrlList = [...mobileImageUrlList];
    tmpMobileImages = [...mobileImages];
    tmpMobileImages.splice(index, 1);
    tmpMobileImageUrlList.splice(index, 1);
    setMobileImages(tmpMobileImages);
    setMobileImageUrlList(tmpMobileImageUrlList);
  };

  async function uploadToImagesStorage(image, fileName) {
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

  async function uploadToIconsStorage(icon) {
    await storage.ref(`application-icons/${name}`).put(icon);
    let res = await storage
      .ref("application-icons")
      .child(`${name}`)
      .getDownloadURL();
    return res;
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(icon);
    var icon_url = icon ? await uploadToIconsStorage(icon) : null;
    var image_pc1_url = pcImages[0]
      ? await uploadToImagesStorage(pcImages[0], "pc1")
      : null;
    var image_pc2_url = pcImages[1]
      ? await uploadToImagesStorage(pcImages[1], "pc2")
      : null;
    var image_pc3_url = pcImages[2]
      ? await uploadToImagesStorage(pcImages[2], "pc3")
      : null;
    var image_mobile1_url = mobileImages[0]
      ? await uploadToImagesStorage(mobileImages[0], "mobile1")
      : null;
    var image_mobile2_url = mobileImages[1]
      ? await uploadToImagesStorage(mobileImages[1], "mobile2")
      : null;
    var image_mobile3_url = mobileImages[2]
      ? await uploadToImagesStorage(mobileImages[2], "mobile3")
      : null;
    db.collection("applications").add({
      name: name,
      link: link,
      overview: overview,
      description: description,
      icon: icon_url,
      image_pc1: image_pc1_url,
      image_pc2: image_pc2_url,
      image_pc3: image_pc3_url,
      image_mobile1: image_mobile1_url,
      image_mobile2: image_mobile2_url,
      image_mobile3: image_mobile3_url,
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
          <label className="block font-bold mb-4">Icon</label>
          <div className="mb-4 text-center">
            <label className="bg-gray-700 text-white p-2 rounded-lg cursor-pointer hover:bg-gray-900">
              Choose Icon
              <input
                type="file"
                className="hidden"
                accept="image/*"
                multiple
                onChange={onChangeIconHandler}
              />
            </label>
          </div>
          <div className="mb-4 flex">
            <div className="relative">
              <img className="rounded max-h-20 mx-2" src={iconUrl} />
              {iconUrl && (
                <button
                  className="text-red-500 hover:text-red-700 absolute top-0 right-0 mt-1 mr-3"
                  onClick={handleDeleteIcon}
                >
                  <FontAwesomeIcon icon={faMinusCircle} size="lg" />
                </button>
              )}
            </div>
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
            {pcImageUrlList.map((pcImageUrl, index) => (
              <ImagePreview
                key={index}
                imageUrl={pcImageUrl}
                handleDeleteImage={() => handleDeletePcImage(index)}
              />
            ))}
          </div>
          <label className="block font-bold mb-2">Mobile Image</label>
          <div className="mb-4 text-center">
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
          <div className="mb-4 flex overflow-scroll">
            {mobileImageUrlList.map((mobileImageUrl, index) => (
              <ImagePreview
                key={index}
                imageUrl={mobileImageUrl}
                handleDeleteImage={() => handleDeleteMobileImage(index)}
              />
            ))}
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
