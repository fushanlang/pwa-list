import React, { useState } from "react";
import categories from "../consts/categories";
import Layout from "../components/Layout";
import AddCompletedModal from "../components/AddCompletedModal";
import ErrorMessage from "../components/ErrorMessage";
import ImagePreview from "../components/ImagePreview";
import firebase from "../plugins/firebase";
import fileLoad from "../plugins/fileLoad";
import validateRequired from "../plugins/validateRequired";
import validateUrl from "../plugins/validateUrl";
import uploadToStorage from "../plugins/uploadToStorage";
import "firebase/firestore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinusCircle } from "@fortawesome/free-solid-svg-icons";

const db = firebase.firestore();

const add = () => {
  const [modalsOpen, setModalsOpen] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [email, setEmail] = useState<string | null>(null);
  const [name, setName] = useState<string | null>(null);
  const [link, setLink] = useState<string | null>(null);
  const [category, setCategory] = useState<string | null>(null);
  const [overview, setOverview] = useState<string | null>(null);
  const [description, setDescription] = useState<string | null>(null);
  const [icon, setIcon] = useState<File | null>(null);
  const [iconUrl, setIconUrl] = useState<any | null>(null);
  const [pcImages, setPcImages] = useState<any[]>([]);
  const [pcImageUrlList, setPcImageUrlList] = useState<any[]>([]);
  const [mobileImages, setMobileImages] = useState<any[]>([]);
  const [mobileImageUrlList, setMobileImageUrlList] = useState<any[]>([]);
  const [errors, setErrors] = useState<any | null>({
    email: [],
    name: [],
    link: [],
    category: [],
    overview: [],
    description: [],
    icon: [],
  });
  const imagesFolder = "application-images";
  const iconsFolder = "application-icons";
  var tmpPcImages = [];
  var tmpPcImageUrlList = [];
  var tmpMobileImages = [];
  var tmpMobileImageUrlList = [];
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
      if (tmpPcImages[2]) {
        break;
      }
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
      if (tmpMobileImages[2]) {
        break;
      }
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

  const validate = () => {
    var emailErrors = [];
    var nameErrors = [];
    var linkErrors = [];
    var categoryErrors = [];
    var overviewErrors = [];
    var descriptionErrors = [];
    var iconErrors = [];
    // required
    if (validateRequired(email)) emailErrors.push("Please put your email");
    if (validateRequired(name)) nameErrors.push("Please put the App name");
    if (validateRequired(link)) linkErrors.push("Please put the App link");
    if (validateRequired(category))
      categoryErrors.push("Please put the App category");
    if (validateRequired(overview))
      overviewErrors.push("Please put the App overview");
    if (validateRequired(description))
      descriptionErrors.push("Please put the App description");
    if (validateRequired(icon)) iconErrors.push("Please put the App icon");
    // custom
    if (validateUrl(link)) linkErrors.push("Please put the App Correct link");
    if (
      emailErrors.length ||
      nameErrors.length ||
      linkErrors.length ||
      categoryErrors.length ||
      overviewErrors.length ||
      descriptionErrors.length ||
      iconErrors.length
    ) {
      setErrors({
        email: emailErrors,
        name: nameErrors,
        link: linkErrors,
        category: categoryErrors,
        overview: overviewErrors,
        description: descriptionErrors,
        icon: iconErrors,
      });
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    if (!validate()) {
      setIsSubmitting(false);
      return;
    }
    var name_lowercase = name.toLowerCase().replace(/\s+/g, "");
    var icon_url = icon
      ? await uploadToStorage(iconsFolder, name, icon, "icon")
      : null;
    var image_pc1_url = pcImages[0]
      ? await uploadToStorage(imagesFolder, name, pcImages[0], "pc1")
      : null;
    var image_pc2_url = pcImages[1]
      ? await uploadToStorage(imagesFolder, name, pcImages[1], "pc2")
      : null;
    var image_pc3_url = pcImages[2]
      ? await uploadToStorage(imagesFolder, name, pcImages[2], "pc3")
      : null;
    var image_mobile1_url = mobileImages[0]
      ? await uploadToStorage(imagesFolder, name, mobileImages[0], "mobile1")
      : null;
    var image_mobile2_url = mobileImages[1]
      ? await uploadToStorage(imagesFolder, name, mobileImages[1], "mobile2")
      : null;
    var image_mobile3_url = mobileImages[2]
      ? await uploadToStorage(imagesFolder, name, mobileImages[2], "mobile3")
      : null;
    db.collection("applications").add({
      email: email,
      name: name,
      name_lowercase: name_lowercase,
      link: link,
      category: category,
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
    setIsSubmitting(false);
    setModalsOpen(true);
  };

  return (
    <div>
      <Layout>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block font-bold mb-2">
              Your Email
              <span className="text-red-400 ml-2">* </span>
              (not be published)
            </label>
            <input
              className="shadow border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:ring focus:ring-green-400"
              type="text"
              onChange={(e) => {
                setEmail(e.target.value);
                setErrors({ ...errors, email: [] });
              }}
            />
            <ErrorMessage errors={errors.name}></ErrorMessage>
          </div>
          <div className="mb-4">
            <label className="block font-bold mb-2">
              App Name<span className="text-red-400 ml-2">*</span>
            </label>
            <input
              className="shadow border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:ring focus:ring-green-400"
              type="text"
              onChange={(e) => {
                setName(e.target.value);
                setErrors({ ...errors, name: [] });
              }}
            />
            <ErrorMessage errors={errors.name}></ErrorMessage>
          </div>
          <div className="mb-4">
            <label className="block font-bold mb-2">
              App Link
              <span className="text-red-400 ml-2">*</span>
            </label>
            <input
              className="shadow border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:ring focus:ring-green-400"
              placeholder="https://"
              onChange={(e) => {
                setLink(e.target.value);
                setErrors({ ...errors, link: [] });
              }}
            />
            <ErrorMessage errors={errors.link}></ErrorMessage>
          </div>
          <div className="mb-4">
            <label className="block font-bold mb-2">
              App Category<span className="text-red-400 ml-2">*</span>
            </label>
            <select
              className="shadow w-full border py-2 px-3 rounded leading-tight focus:outline-none focus:ring focus:ring-green-400"
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
            <label className="block font-bold mb-2">
              App Overview<span className="text-red-400 ml-2">*</span>
            </label>
            <input
              className="shadow border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:ring focus:ring-green-400"
              type="text"
              placeholder="Video Upload Site"
              onChange={(e) => {
                setOverview(e.target.value);
                setErrors({ ...errors, overview: [] });
              }}
            />
            <ErrorMessage errors={errors.overview}></ErrorMessage>
          </div>
          <div className="mb-4">
            <label className="block font-bold mb-2">
              About this app
              <span className="text-red-400 ml-2">*</span>
            </label>
            <textarea
              className="shadow form-textarea mt-1 block w-full border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:ring focus:ring-green-400"
              rows={5}
              onChange={(e) => {
                setDescription(e.target.value);
                setErrors({ ...errors, description: [] });
              }}
            ></textarea>
            <ErrorMessage errors={errors.description}></ErrorMessage>
          </div>
          <label className="block font-bold mb-4">
            App Icon<span className="text-red-400 ml-2">*</span>
          </label>
          <div className="mb-4 text-center">
            <label className="bg-gray-700 text-white p-2 rounded-lg cursor-pointer hover:bg-gray-900">
              Choose Icon
              <input
                type="file"
                className="hidden"
                accept="image/*"
                multiple
                onChange={(e) => {
                  onChangeIconHandler(e);
                  setErrors({ ...errors, icon: [] });
                }}
              />
            </label>
            <ErrorMessage errors={errors.icon}></ErrorMessage>
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
          <label className="block font-bold mb-4">
            App PC Image (Up to 3 Images)
          </label>
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
          <label className="block font-bold mb-2">
            App Mobile Image (Up to 3 Images)
          </label>
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
            {!isSubmitting && (
              <button
                className="w-52 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Submit
              </button>
            )}
            {isSubmitting && (
              <button
                disabled
                className="w-52 bg-green-200 text-white font-bold py-2 px-4 rounded pointer-events-none"
              >
                Submiting...
              </button>
            )}
          </div>
        </form>
        <AddCompletedModal
          modalsOpen={modalsOpen}
          setModalsOpen={setModalsOpen}
        />
      </Layout>
    </div>
  );
};

export default add;
