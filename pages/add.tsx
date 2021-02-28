import { useState } from "react";
import Layout from "../components/Layout";
import firebase from "../plugins/firebase";
import "firebase/firestore";
import "firebase/storage";

const db = firebase.firestore();
const storage = firebase.storage();

const add = () => {
  const [name, setName] = useState<String | null>(null);
  const [imagePc1, setImagePc1] = useState<File | null>(null);

  const onChangeImageHandler = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.files[0]) {
      setImagePc1(e.target.files![0]);
      e.target.value = "";
    }
  };
  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    await storage.ref("application-images/aaa").put(imagePc1);
    let image_pc1_url = await storage
      .ref("application-images")
      .child("aaa")
      .getDownloadURL();
    console.log(image_pc1_url);
    db.collection("applications").add({
      name: name,
      image_pc1: image_pc1_url,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
    });
  };
  return (
    <div>
      <Layout>
        {/* <form> */}
        <input onChange={(e) => setName(e.target.value)}></input>
        <input type="file" onChange={onChangeImageHandler} />
        <button onClick={handleSubmit}>submit</button>
        {/* </form> */}
      </Layout>
    </div>
  );
};

export default add;
