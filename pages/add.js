import { useState } from "react";
import Layout from "../components/Layout";
import firebase from "../plugins/firebase";
import "firebase/firestore";

const db = firebase.firestore();

const add = () => {
  const [name, setName] = useState("");
  const submitApp = () => {
    console.log(name);
    db.collection("applications").add({
      name: name,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
    });
  };
  return (
    <div>
      <Layout>
        <from onSubmit={submitApp}>
          <input onChange={(e) => setName(e.target.value)}></input>
          <button>submit</button>
        </from>
      </Layout>
    </div>
  );
};

export default add;
