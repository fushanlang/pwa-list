import React, { useState, useEffect } from "react";
import categories from "../../../consts/categories";
import fileLoad from "../../../plugins/fileLoad";
import editValidate from "../../../plugins/submissions/editValidate";
import firebase from "../../../plugins/firebase";
import uploadToStorage from "../../../plugins/uploadToStorage";
import "firebase/firestore";
import Layout from "../../../components/Layout";
import NotFound from "../../../components/Common/NotFound";
import ErrorMessage from "../../../components/Common/ErrorMessage";
import ImagePreview from "../../../components/Common/ImagePreview";
import CompletedModal from "../../../components/Submissions/create/CompletedModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinusCircle } from "@fortawesome/free-solid-svg-icons";
const db = firebase.firestore();

const Edit = (appData) => {
  const app = appData.appData;
  const [modalsOpen, setModalsOpen] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [name, setName] = useState<string>(app.name);
  const [link, setLink] = useState<string>(app.link);
  const [category, setCategory] = useState<string>(app.category);
  const [tag1, setTag1] = useState<string>("");
  const [tag2, setTag2] = useState<string>("");
  const [tag3, setTag3] = useState<string>("");
  const [description, setDescription] = useState<string>(app.description);
  useEffect(() => {
    if (app.tag1 !== null) {
      setTag1(app.tag1);
    }
    if (app.tag2 !== null) {
      setTag2(app.tag2);
    }
    if (app.tag3 !== null) {
      setTag3(app.tag3);
    }
  }, []);
  const [errors, setErrors] = useState<any>({
    name: [],
    link: [],
    category: [],
    tag1: [],
    tag2: [],
    tag3: [],
    description: [],
    icon: [],
    screenshot: [],
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    if (false) {
      setIsSubmitting(false);
      return;
    }
    setModalsOpen(true);
    var nameLowercase = name.toLowerCase().replace(/\s+/g, "");
    var tag1Lowercase = tag1 ? tag1.toLowerCase().replace(/\s+/g, "") : null;
    var tag2Lowercase = tag2 ? tag2.toLowerCase().replace(/\s+/g, "") : null;
    var tag3Lowercase = tag3 ? tag3.toLowerCase().replace(/\s+/g, "") : null;

    const appRef = db.collection("applications").doc(app.id);
    await appRef.update({
      name: name,
      nameLowercase: nameLowercase,
      link: link,
      category: category,
      tag1: tag1,
      tag2: tag2,
      tag3: tag3,
      tag1Lowercase: tag1Lowercase,
      tag2Lowercase: tag2Lowercase,
      tag3Lowercase: tag3Lowercase,
      description: description,
      updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setIsSubmitting(false);
  };
  return (
    <Layout title={`${app.name} - Edit`}>
      <>
        <form onSubmit={handleSubmit} className="xl:px-28 pt-6">
          <div className="ml-1 mt-1 mb-9">
            <div className="mb-4">
              <div className="block font-bold">Name</div>
              <div className="text-xl font-bold ml-1">{name}</div>
            </div>
            <div className="mb-4">
              <label className="block font-bold mb-1">
                Link
                <span className="text-red-400 ml-2">*</span>
              </label>
              <input
                className="shadow border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:ring focus:ring-green-400"
                type="text"
                maxLength={120}
                placeholder="https://pwalist.app"
                value={link}
                onChange={(e) => {
                  setLink(e.target.value);
                  setErrors({ ...errors, link: [] });
                }}
              />
              <ErrorMessage errors={errors.link}></ErrorMessage>
            </div>
            <div className="mb-4">
              <label className="block font-bold mb-1">
                Category<span className="text-red-400 ml-2">*</span>
              </label>
              <select
                className="shadow w-44 border py-2 px-3 rounded leading-tight focus:outline-none focus:ring focus:ring-green-400"
                value={category}
                onChange={(e) => {
                  setCategory(e.target.value);
                  setErrors({ ...errors, category: [] });
                }}
              >
                <option value="">-</option>
                {categories.map((category, index) => (
                  <option key={index} value={category.value}>
                    {category.label}
                  </option>
                ))}
              </select>
              <ErrorMessage errors={errors.category}></ErrorMessage>
            </div>
            <div className="mb-4">
              <label className="block font-bold mb-1">
                Tags
                <span className="text-red-400 ml-2">*</span>
                <span className="text-xs text-red-400 ml-2">
                  1 or more required
                </span>
              </label>
              <input
                className="shadow border rounded w-28 py-2 px-3 mr-4 leading-tight focus:outline-none focus:ring focus:ring-green-400"
                type="text"
                maxLength={10}
                value={tag1}
                onChange={(e) => {
                  setTag1(e.target.value);
                  setErrors({ ...errors, tag1: [] });
                }}
              />
              <input
                className="shadow border rounded w-28 py-2 px-3 mr-4 leading-tight focus:outline-none focus:ring focus:ring-green-400"
                type="text"
                maxLength={10}
                value={tag2}
                onChange={(e) => {
                  setTag2(e.target.value);
                  setErrors({ ...errors, tag2: [] });
                }}
              />
              <input
                className="shadow border rounded w-28 py-2 px-3 mr-4 leading-tight focus:outline-none focus:ring focus:ring-green-400"
                type="text"
                maxLength={10}
                value={tag3}
                onChange={(e) => {
                  setTag3(e.target.value);
                  setErrors({ ...errors, tag3: [] });
                }}
              />
              <ErrorMessage errors={errors.tag1}></ErrorMessage>
              <ErrorMessage errors={errors.tag2}></ErrorMessage>
              <ErrorMessage errors={errors.tag3}></ErrorMessage>
            </div>
            <div className="mb-4">
              <label className="block font-bold mb-1">
                About this app
                <span className="text-red-400 ml-2">*</span>
              </label>
              <textarea
                className="shadow form-textarea mt-1 block w-full border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:ring focus:ring-green-400"
                rows={10}
                maxLength={2000}
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                  setErrors({ ...errors, description: [] });
                }}
              ></textarea>
              <ErrorMessage errors={errors.description}></ErrorMessage>
            </div>
          </div>
          <div className="ml-1 mt-10 mb-12">
            <button
              className="w-48 bg-green-400 hover:bg-green-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Submit
            </button>
          </div>
        </form>
        <CompletedModal modalsOpen={modalsOpen} isSubmitting={isSubmitting} />
      </>
    </Layout>
  );
};

Edit.getInitialProps = async ({ query }) => {
  const { name } = query;
  const getAppData = await db
    .collection("applications")
    .where("nameLowercase", "==", name)
    .get();
  if (getAppData.empty) {
    return {
      appData: [],
    };
  }
  const app = getAppData.docs[0].data();
  const returnApp = {
    id: getAppData.docs[0].id,
    name: app.name,
    icon: app.icon,
    tag1: app.tag1,
    tag2: app.tag2,
    tag3: app.tag3,
    category: app.category,
    link: app.link,
    description: app.description,
    imagePc1: app.imagePc1,
    imagePc2: app.imagePc2,
    imagePc3: app.imagePc3,
    imageMobile1: app.imageMobile1,
    imageMobile2: app.imageMobile2,
    imageMobile3: app.imageMobile3,
  };
  return {
    appData: returnApp,
  };
};
export default Edit;
