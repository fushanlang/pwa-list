import React, { useState } from "react";
import Layout from "../components/Layout";
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
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [name, setName] = useState<string | null>(null);
  const [link, setLink] = useState<string | null>(null);
  const [overview, setOverview] = useState<string | null>(null);
  const [description, setDescription] = useState<string | null>(null);
  const [icon, setIcon] = useState<File | null>(null);
  const [iconUrl, setIconUrl] = useState<any | null>(null);
  const [pcImages, setPcImages] = useState<any[]>([]);
  const [pcImageUrlList, setPcImageUrlList] = useState<any[]>([]);
  const [mobileImages, setMobileImages] = useState<any[]>([]);
  const [mobileImageUrlList, setMobileImageUrlList] = useState<any[]>([]);
  const [errors, setErrors] = useState<any | null>({
    name: [],
    link: [],
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
      console.log(e.target.result);
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    var nameErrors = validateRequired(name, "Please put your app name");
    var linkErrors = validateRequired(link, "Please put your app link");
    var overviewErrors = validateRequired(
      overview,
      "Please put your app overview"
    );
    var descriptionErrors = validateRequired(
      description,
      "Please put your app description"
    );
    var iconErrors = validateRequired(icon, "Please put your app icon");
    if (
      nameErrors ||
      linkErrors ||
      overviewErrors ||
      descriptionErrors ||
      iconErrors
    ) {
      setErrors({
        name: nameErrors,
        link: linkErrors,
        overview: overviewErrors,
        description: descriptionErrors,
        icon: iconErrors,
      });
      setIsSubmitting(false);
      return;
    }
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
    setIsSubmitting(false);
  };

  return (
    <div>
      <Layout>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block font-bold mb-2">
              Name<span className="text-red-400 ml-2">*</span>
            </label>
            <input
              className="shadow border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:ring focus:ring-green-400"
              type="text"
              onChange={(e) => setName(e.target.value)}
            />
            <ErrorMessage errors={errors.name}></ErrorMessage>
          </div>
          <div className="mb-4">
            <label className="block font-bold mb-2">
              Link
              <span className="text-red-400 ml-2">*</span>
            </label>
            <input
              className="shadow border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:ring focus:ring-green-400"
              placeholder="https://"
              onChange={(e) => setLink(e.target.value)}
            />
            <ErrorMessage errors={errors.link}></ErrorMessage>
          </div>
          <div className="mb-4">
            <label className="block font-bold mb-2">
              Overview<span className="text-red-400 ml-2">*</span>
            </label>
            <input
              className="shadow border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:ring focus:ring-green-400"
              type="text"
              placeholder="Video Upload Site"
              onChange={(e) => setOverview(e.target.value)}
            />
            <ErrorMessage errors={errors.overview}></ErrorMessage>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              About this app
              <span className="text-red-400 ml-2">*</span>
            </label>
            <textarea
              className="shadow form-textarea mt-1 block w-full border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:ring focus:ring-green-400"
              rows={5}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
            <ErrorMessage errors={errors.description}></ErrorMessage>
          </div>
          <label className="block font-bold mb-4">
            Icon<span className="text-red-400 ml-2">*</span>
          </label>
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
            PC Image (Up to 3 Images)
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
            Mobile Image (Up to 3 Images)
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
      </Layout>
    </div>
  );
};

export default add;
