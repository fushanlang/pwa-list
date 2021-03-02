import React, { useState } from "react";
import Layout from "../components/Layout";
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
  const onChangeImageHandler = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    function setImagePc(num, file) {
      var functions = [setImagePc1, setImagePc2, setImagePc3];
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
    var files = e.target.files;
    for (let i = 0; i < files.length; i++) {
      var file = e.target.files[i];
      var reader = new FileReader();
      setImagePc(i, file);
      reader.onload = (e) => {
        setImagePcUrl(i, e.target.result);
      };
      reader.readAsDataURL(file);
      // e.target.value = "";
    }
  };
  async function uploadToStorage(image) {
    if (image == null) {
      return null;
    }
    await storage.ref(`application-images/${name}_pc1`).put(image);
    let res = await storage
      .ref("application-images")
      .child(`${name}_pc1`)
      .getDownloadURL();
    return res;
  }
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    var imagePc1DlUrl = await uploadToStorage(imagePc1);
    var imagePc2DlUrl = await uploadToStorage(imagePc2);
    var imagePc3DlUrl = await uploadToStorage(imagePc3);
    console.log(imagePc1DlUrl);
    db.collection("applications").add({
      name: name,
      link: link,
      overview: overview,
      description: description,
      image_pc1: imagePc1DlUrl,
      image_pc2: imagePc2DlUrl,
      image_pc3: imagePc3DlUrl,
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
          <div className="mb-4">
            <label className="block font-bold mb-2">PC Image</label>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={onChangeImageHandler}
            />
            <div>
              <img className="rounded max-h-96 mx-2" src={imagePc1Url} />
            </div>
            <div>
              <img className="rounded max-h-96 mx-2" src={imagePc2Url} />
            </div>
            <div>
              <img className="rounded max-h-96 mx-2" src={imagePc3Url} />
            </div>
            <button
              type="button"
              onClick={() => {
                setImagePc1(null);
                setImagePc1Url(null);
              }}
            >
              del
            </button>
          </div>
          <div className="mb-4">
            <label className="block font-bold mb-2">Mobile Image</label>
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
