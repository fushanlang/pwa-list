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
  const [imagePc1Url, setImagePc1Url] = useState<any | null>(null);
  const onChangeImageHandler = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.files[0]) {
      var file = e.target.files![0];
      var reader = new FileReader();
      setImagePc1(file);
      reader.onload = (e) => {
        setImagePc1Url(e.target.result);
      };
      reader.readAsDataURL(file);
      e.target.value = "";
    }
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await storage.ref("application-images/aaa").put(imagePc1);
    let image_pc1_url = await storage
      .ref("application-images")
      .child("aaa")
      .getDownloadURL();
    db.collection("applications").add({
      name: name,
      link: link,
      overview: overview,
      description: description,
      image_pc1: image_pc1_url,
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
