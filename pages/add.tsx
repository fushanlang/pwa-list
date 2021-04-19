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
import validateEmail from "../plugins/validateEmail";
import validateAlphanum from "../plugins/validateAlphanum";
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
  const [tag1, setTag1] = useState<string | null>(null);
  const [tag2, setTag2] = useState<string | null>(null);
  const [tag3, setTag3] = useState<string | null>(null);
  const [description, setDescription] = useState<string | null>(null);
  const [icon, setIcon] = useState<any | null>(null);
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
    tag1: [],
    tag2: [],
    tag3: [],
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
  const handleDeleteIcon = async (e) => {
    e.preventDefault();
    setIcon(null);
    setIconUrl(null);
  };

  const handleDeletePcImage = async (e, index) => {
    e.preventDefault();
    tmpPcImageUrlList = [...pcImageUrlList];
    tmpPcImages = [...pcImages];
    tmpPcImages.splice(index, 1);
    tmpPcImageUrlList.splice(index, 1);
    setPcImages(tmpPcImages);
    setPcImageUrlList(tmpPcImageUrlList);
  };

  const handleDeleteMobileImage = async (e, index) => {
    e.preventDefault();
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
    var tag1Errors = [];
    var tag2Errors = [];
    var tag3Errors = [];
    var descriptionErrors = [];
    var iconErrors = [];
    // required
    if (validateRequired(name)) nameErrors.push("The Name field is required");
    if (validateRequired(link)) linkErrors.push("The Link field is required");
    if (validateRequired(category))
      categoryErrors.push("The Category field is required");
    if (validateRequired(description))
      descriptionErrors.push("The About this app field is required");
    if (validateRequired(icon)) iconErrors.push("The Icon field is required");
    if (validateRequired(email))
      emailErrors.push("The Email field is required");
    // custom
    if (validateUrl(link)) linkErrors.push("Please enter the correct Link");
    if (validateEmail(email))
      emailErrors.push("Please enter the correct Email");
    if (validateAlphanum(name))
      nameErrors.push(
        "Please enter the name in single-byte alphanumeric characters"
      );
    if (
      emailErrors.length ||
      nameErrors.length ||
      linkErrors.length ||
      categoryErrors.length ||
      tag1Errors.length ||
      tag2Errors.length ||
      tag3Errors.length ||
      descriptionErrors.length ||
      iconErrors.length
    ) {
      setErrors({
        email: emailErrors,
        name: nameErrors,
        link: linkErrors,
        category: categoryErrors,
        tag1: tag1Errors,
        tag2: tag2Errors,
        tag3: tag3Errors,
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
    var nameLowercase = name.toLowerCase().replace(/\s+/g, "");
    var tag1Lowercase = tag1 ? tag1.toLowerCase().replace(/\s+/g, "") : null;
    var tag2Lowercase = tag2 ? tag2.toLowerCase().replace(/\s+/g, "") : null;
    var tag3Lowercase = tag3 ? tag3.toLowerCase().replace(/\s+/g, "") : null;
    var iconUrl = icon
      ? await uploadToStorage(iconsFolder, name, icon, "icon")
      : null;
    var imagePc1Url = pcImages[0]
      ? await uploadToStorage(imagesFolder, name, pcImages[0], "pc1")
      : null;
    var imagePc2Url = pcImages[1]
      ? await uploadToStorage(imagesFolder, name, pcImages[1], "pc2")
      : null;
    var imagePc3Url = pcImages[2]
      ? await uploadToStorage(imagesFolder, name, pcImages[2], "pc3")
      : null;
    var imageMobile1Url = mobileImages[0]
      ? await uploadToStorage(imagesFolder, name, mobileImages[0], "mobile1")
      : null;
    var imageMobile2Url = mobileImages[1]
      ? await uploadToStorage(imagesFolder, name, mobileImages[1], "mobile2")
      : null;
    var imageMobile3Url = mobileImages[2]
      ? await uploadToStorage(imagesFolder, name, mobileImages[2], "mobile3")
      : null;
    db.collection("applications").add({
      email: email,
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
      icon: iconUrl,
      imagePc1: imagePc1Url,
      imagePc2: imagePc2Url,
      imagePc3: imagePc3Url,
      imageMobile1: imageMobile1Url,
      imageMobile2: imageMobile2Url,
      imageMobile3: imageMobile3Url,
      isPublic: false,
      isFeatured: false,
      isNewApp: false,
      newAppOrder: "",
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setIsSubmitting(false);
    setModalsOpen(true);
  };

  return (
    <Layout>
      <form onSubmit={handleSubmit} className="xl:px-28 pt-6">
        <h2 className="text-lg font-bold">Application</h2>
        <div className="ml-1 mt-1 mb-9">
          <div className="mb-4">
            <label className="block font-bold mb-1">
              Name<span className="text-red-400 ml-2">*</span>
            </label>
            <input
              className="shadow border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:ring focus:ring-green-400"
              type="text"
              maxLength={28}
              onChange={(e) => {
                setName(e.target.value);
                setErrors({ ...errors, name: [] });
              }}
            />
            <ErrorMessage errors={errors.name}></ErrorMessage>
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
              Tags<span className="text-red-400 ml-2"></span>
            </label>
            <input
              className="shadow border rounded w-28 py-2 px-3 mr-4 leading-tight focus:outline-none focus:ring focus:ring-green-400"
              type="text"
              maxLength={10}
              placeholder="Memo"
              onChange={(e) => {
                setTag1(e.target.value);
                setErrors({ ...errors, tag1: [] });
              }}
            />
            <input
              className="shadow border rounded w-28 py-2 px-3 mr-4 leading-tight focus:outline-none focus:ring focus:ring-green-400"
              type="text"
              maxLength={10}
              placeholder="Map"
              onChange={(e) => {
                setTag2(e.target.value);
                setErrors({ ...errors, tag2: [] });
              }}
            />
            <input
              className="shadow border rounded w-28 py-2 px-3 mr-4 leading-tight focus:outline-none focus:ring focus:ring-green-400"
              type="text"
              maxLength={10}
              placeholder="IoT"
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
              onChange={(e) => {
                setDescription(e.target.value);
                setErrors({ ...errors, description: [] });
              }}
            ></textarea>
            <ErrorMessage errors={errors.description}></ErrorMessage>
          </div>
          <label className="block font-bold mb-2">
            Icon<span className="text-red-400 ml-2">*</span>
          </label>
          {iconUrl && (
            <div className="flex mb-4">
              <div className="relative">
                <img className="border rounded max-h-20" src={iconUrl} />
                <button
                  className="text-red-500 hover:text-red-700 absolute top-0 right-0 mt-1 mr-1"
                  onClick={handleDeleteIcon}
                >
                  <FontAwesomeIcon icon={faMinusCircle} size="lg" />
                </button>
              </div>
            </div>
          )}
          <div className="mb-8">
            <label className="cursor-pointer py-1 px-5 inline-block tracking-wide border-2 border-green-400 text-green-500 bg-white shadow-md rounded-md hover:bg-gray-200 hover:shadow-none transition ease-in-out">
              Choose
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
          <label className="block font-bold mb-2">
            Image for PC (Up to 3 Images)
          </label>
          <div className="flex overflow-scroll">
            {pcImageUrlList.map((pcImageUrl, index) => (
              <ImagePreview
                key={index}
                imageUrl={pcImageUrl}
                handleDeleteImage={(event) => handleDeletePcImage(event, index)}
              />
            ))}
          </div>
          <div className="mb-8">
            <label className="cursor-pointer py-1 px-5 inline-block tracking-wide border-2 border-green-400 text-green-500 bg-white shadow-md rounded-md hover:bg-gray-200 hover:shadow-none transition ease-in-out">
              Choose
              <input
                type="file"
                className="hidden"
                accept="image/*"
                multiple
                onChange={onChangePcImageHandler}
              />
            </label>
          </div>
          <label className="block font-bold mb-2">
            Image for Mobile (Up to 3 Images)
          </label>
          <div className="flex overflow-scroll">
            {mobileImageUrlList.map((mobileImageUrl, index) => (
              <ImagePreview
                key={index}
                imageUrl={mobileImageUrl}
                handleDeleteImage={(event) =>
                  handleDeleteMobileImage(event, index)
                }
              />
            ))}
          </div>
          <div className="mb-8">
            <label className="cursor-pointer py-1 px-5 inline-block tracking-wide border-2 border-green-400 text-green-500 bg-white shadow-md rounded-md hover:bg-gray-200 hover:shadow-none transition ease-in-out">
              Choose
              <input
                type="file"
                className="hidden"
                accept="image/*"
                multiple
                onChange={onChangeMobileImageHandler}
              />
            </label>
          </div>
        </div>
        <h2 className="text-lg font-bold">Personal</h2>
        <div className="ml-1 mt-1 mb-7">
          <label className="block font-bold mb-2">
            Your Email
            <span className="text-red-400 ml-2">* </span>
            (not be published)
          </label>
          <input
            className="shadow border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:ring focus:ring-green-400"
            type="text"
            maxLength={50}
            onChange={(e) => {
              setEmail(e.target.value);
              setErrors({ ...errors, email: [] });
            }}
          />
          <ErrorMessage errors={errors.email}></ErrorMessage>
        </div>
        <div className="ml-1 mt-10 mb-12">
          {!isSubmitting && (
            <button
              className="w-48 bg-green-400 hover:bg-green-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Submit
            </button>
          )}
          {isSubmitting && (
            <button
              disabled
              className="w-48 bg-green-200 text-white font-bold py-2 px-4 rounded pointer-events-none"
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
  );
};

export default add;
