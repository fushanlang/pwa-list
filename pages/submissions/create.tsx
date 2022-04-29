import { useState, useEffect, useContext } from "react";
import { NextPage } from "next";
import Router from "next/router";
import { AuthContext } from "../../contexts/Auth";
import categories from "../../consts/categories";
import Layout from "../../components/Layout/Layout";
import CompletedModal from "../../components/Submissions/CompletedModal";
import ErrorMessage from "../../components/Common/ErrorMessage";
import ImagePreview from "../../components/Common/ImagePreview";
import createValidate from "../../plugins/submissions/createValidate";
import uploadToStorage from "../../plugins/image/uploadToStorage";
import firebase from "../../plugins/firebase";
import "firebase/firestore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinusCircle } from "@fortawesome/free-solid-svg-icons";

const db = firebase.firestore();
const Create: NextPage = () => {
  const { currentUser } = useContext(AuthContext);
  useEffect(() => {
    currentUser === null && Router.push("/sign-up");
  }, [currentUser]);

  const [modalsOpen, setModalsOpen] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const [link, setLink] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [tag1, setTag1] = useState<string>("");
  const [tag2, setTag2] = useState<string>("");
  const [tag3, setTag3] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [icon, setIcon] = useState<File | null>(null);
  const [iconUrl, setIconUrl] = useState<string>("");
  const [pcImages, setPcImages] = useState<Array<File>>([]);
  const [pcImageUrlList, setPcImageUrlList] = useState<Array<string>>([]);
  const [mobileImages, setMobileImages] = useState<Array<File>>([]);
  const [mobileImageUrlList, setMobileImageUrlList] = useState<Array<string>>([]);
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
  const imagesFolder = "application-images";
  const iconsFolder = "application-icons";
  const MAX_PC_IMAGE_NUM = 3;
  const MAX_MOBILE_IMAGE_NUM = 3;

  const onChangeIconHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    setIconUrl(window.URL.createObjectURL(files[0]));
    setIcon(files[0]);
  };

  const onChangePcImageHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    const filesArr = Object.entries(files).map(([key, value]) => value);
    filesArr.splice(MAX_PC_IMAGE_NUM);
    filesArr.map((value) => {
      setPcImageUrlList((urls) => [...urls, window.URL.createObjectURL(value)]);
      setPcImages((images) => [...images, value]);
    });
  };

  const onChangeMobileImageHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    const filesArr = Object.entries(files).map(([key, value]) => value);
    filesArr.splice(MAX_MOBILE_IMAGE_NUM);
    filesArr.map((value) => {
      setMobileImageUrlList((urls) => [...urls, window.URL.createObjectURL(value)]);
      setMobileImages((images) => [...images, value]);
    });
  };
  const handleDeleteIcon = async () => {
    setIcon(null);
    setIconUrl("");
  };

  const handleDeletePcImage = async (e: React.FormEvent<HTMLFormElement>, index: number) => {
    e.preventDefault();
    setPcImageUrlList(pcImageUrlList.filter((_, i) => i !== index));
    setPcImages(pcImages.filter((_, i) => i !== index));
  };

  const handleDeleteMobileImage = async (e: React.FormEvent<HTMLFormElement>, index: number) => {
    e.preventDefault();
    setMobileImageUrlList(mobileImageUrlList.filter((_, i) => i !== index));
    setMobileImages(mobileImages.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    if (!(await createValidate(setErrors, name, link, category, tag1, tag2, tag3, description, icon, pcImages, mobileImages))) {
      setIsSubmitting(false);
      return;
    }
    setModalsOpen(true);
    const nameLowercase = name.toLowerCase().replace(/\s+/g, "");
    const tag1Lowercase = tag1 ? tag1.toLowerCase().replace(/\s+/g, "") : null;
    const tag2Lowercase = tag2 ? tag2.toLowerCase().replace(/\s+/g, "") : null;
    const tag3Lowercase = tag3 ? tag3.toLowerCase().replace(/\s+/g, "") : null;
    const storageIconUrl = icon ? await uploadToStorage(iconsFolder, nameLowercase, icon, "icon") : null;
    const storagePc1Url = pcImages[0] ? await uploadToStorage(imagesFolder, nameLowercase, pcImages[0], "pc1") : null;
    const storagePc2Url = pcImages[1] ? await uploadToStorage(imagesFolder, nameLowercase, pcImages[1], "pc2") : null;
    const storagePc3Url = pcImages[2] ? await uploadToStorage(imagesFolder, nameLowercase, pcImages[2], "pc3") : null;
    const storageMobile1Url = mobileImages[0]
      ? await uploadToStorage(imagesFolder, nameLowercase, mobileImages[0], "mobile1")
      : null;
    const storageMobile2Url = mobileImages[1]
      ? await uploadToStorage(imagesFolder, nameLowercase, mobileImages[1], "mobile2")
      : null;
    const storageMobile3Url = mobileImages[2]
      ? await uploadToStorage(imagesFolder, nameLowercase, mobileImages[2], "mobile3")
      : null;
    db.collection("applications").add({
      userId: currentUser.uid,
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
      icon: storageIconUrl,
      imagePc1: storagePc1Url,
      imagePc2: storagePc2Url,
      imagePc3: storagePc3Url,
      imageMobile1: storageMobile1Url,
      imageMobile2: storageMobile2Url,
      imageMobile3: storageMobile3Url,
      isPublic: false,
      isFeatured: false,
      isNewApp: false,
      newAppOrder: "",
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setIsSubmitting(false);
  };

  return (
    <Layout title="Submit">
      {currentUser && (
        <>
          <form onSubmit={handleSubmit} className="xl:px-28 pt-6">
            <div className="ml-1 mt-1 mb-9">
              <div className="mb-4">
                <label className="block font-bold mb-1">
                  Name<span className="text-red-400 ml-2">*</span>
                </label>
                <input
                  className="ring-2 ring-gray-300 rounded w-full py-2 px-3 leading-tight focus:outline-none focus:ring focus:ring-green-400"
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
                  className="ring-2 ring-gray-300 rounded w-full py-2 px-3 leading-tight focus:outline-none focus:ring focus:ring-green-400"
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
                  className="ring-2 ring-gray-300 w-44 py-2 px-3 rounded leading-tight focus:outline-none focus:ring focus:ring-green-400"
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
                  <span className="text-xs text-red-400 ml-2">1 or more required</span>
                </label>
                <input
                  className="ring-2 ring-gray-300 rounded w-28 py-2 px-3 mr-4 leading-tight focus:outline-none focus:ring focus:ring-green-400"
                  type="text"
                  maxLength={10}
                  placeholder="ToDo"
                  onChange={(e) => {
                    setTag1(e.target.value);
                    setErrors({ ...errors, tag1: [] });
                  }}
                />
                <input
                  className="ring-2 ring-gray-300 rounded w-28 py-2 px-3 mr-4 leading-tight focus:outline-none focus:ring focus:ring-green-400"
                  type="text"
                  maxLength={10}
                  placeholder="Timer"
                  onChange={(e) => {
                    setTag2(e.target.value);
                    setErrors({ ...errors, tag2: [] });
                  }}
                />
                <input
                  className="ring-2 ring-gray-300 rounded w-28 py-2 px-3 mr-4 leading-tight focus:outline-none focus:ring focus:ring-green-400"
                  type="text"
                  maxLength={10}
                  placeholder="Management"
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
                  className="ring-2 ring-gray-300 form-textarea mt-1 block w-full rounded w-full py-2 px-3 leading-tight focus:outline-none focus:ring focus:ring-green-400"
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
              <p className="text-base font-bold mb-2">
                screenshots
                <span className="text-red-400 ml-2">*</span>
                <span className="text-xs text-red-400 ml-2">Either mobile or PC screenshot is required.</span>
              </p>
              <label className="block font-bold mb-2">Mobile size screenshots (Up to 3 Images)</label>
              <div className="flex overflow-scroll">
                {mobileImageUrlList.map((mobileImageUrl, index) => (
                  <ImagePreview
                    key={index}
                    imageUrl={mobileImageUrl}
                    handleDeleteImage={(event: React.FormEvent<HTMLFormElement>) => handleDeleteMobileImage(event, index)}
                    isLast={mobileImageUrlList.length - 1 === index}
                    isBtnLastOnlyDisplay={false}
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
                    onChange={(e) => {
                      onChangeMobileImageHandler(e);
                      setErrors({ ...errors, screenshot: [] });
                    }}
                  />
                </label>
              </div>
              <label className="block font-bold mb-2">PC size screenshots (Up to 3 Images)</label>
              <div className="flex overflow-scroll">
                {pcImageUrlList.map((pcImageUrl, index) => (
                  <ImagePreview
                    key={index}
                    imageUrl={pcImageUrl}
                    handleDeleteImage={(event: React.FormEvent<HTMLFormElement>) => handleDeletePcImage(event, index)}
                    isLast={pcImageUrlList.length - 1 === index}
                    isBtnLastOnlyDisplay={false}
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
                    onChange={(e) => {
                      onChangePcImageHandler(e);
                      setErrors({ ...errors, screenshot: [] });
                    }}
                  />
                </label>
              </div>
              <ErrorMessage errors={errors.screenshot}></ErrorMessage>
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
      )}
    </Layout>
  );
};

export default Create;
