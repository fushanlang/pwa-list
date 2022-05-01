import { useState, useEffect, useContext } from "react";
import { NextPage } from "next";
import Router from "next/router";
import { AuthContext } from "../../../contexts/Auth";
import categories from "../../../consts/categories";
import editValidate from "../../../plugins/submissions/editValidate";
import firebase from "../../../plugins/firebase";
import uploadToStorage from "../../../plugins/image/uploadToStorage";
import "firebase/firestore";
import Layout from "../../../components/Layout/Layout";
import Forbidden from "../../../components/Common/Forbidden";
import ErrorMessage from "../../../components/Common/ErrorMessage";
import ImagePreview from "../../../components/Common/ImagePreview";
import CompletedModal from "../../../components/Submissions/CompletedModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinusCircle } from "@fortawesome/free-solid-svg-icons";
const db = firebase.firestore();

interface Props {
  app: any;
  isFound: boolean;
}

const Edit: NextPage<Props> = (props) => {
  const { app, isFound } = props;
  const { currentUser } = useContext(AuthContext);
  useEffect(() => {
    currentUser === null && Router.push("/sign-up");
  }, [currentUser]);

  const [modalsOpen, setModalsOpen] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [name, setName] = useState<string>(app.name);
  const [link, setLink] = useState<string>(app.link);
  const [category, setCategory] = useState<string>(app.category);
  const [tag1, setTag1] = useState<string>("");
  const [tag2, setTag2] = useState<string>("");
  const [tag3, setTag3] = useState<string>("");
  const [description, setDescription] = useState<string>(app.description);
  const [icon, setIcon] = useState<any | null>(null);
  const [iconUrl, setIconUrl] = useState<string>(app.icon);
  const [mobileImages, setMobileImages] = useState<Array<File>>([]);
  const [mobileImageUrlList, setMobileImageUrlList] = useState<Array<string>>([]);
  const [pcImages, setPcImages] = useState<Array<File>>([]);
  const [pcImageUrlList, setPcImageUrlList] = useState<Array<string>>([]);

  useEffect(() => {
    app.tag1 && setTag1(app.tag1);
    app.tag2 && setTag2(app.tag2);
    app.tag3 && setTag3(app.tag3);
    if (app.imageMobile1) {
      setMobileImages((images) => [...images, null]);
      setMobileImageUrlList((urls) => [...urls, app.imageMobile1]);
    }
    if (app.imageMobile2) {
      setMobileImages((images) => [...images, null]);
      setMobileImageUrlList((urls) => [...urls, app.imageMobile2]);
    }
    if (app.imageMobile3) {
      setMobileImages((images) => [...images, null]);
      setMobileImageUrlList((urls) => [...urls, app.imageMobile3]);
    }
    if (app.imagePc1) {
      setPcImages((images) => [...images, null]);
      setPcImageUrlList((urls) => [...urls, app.imagePc1]);
    }
    if (app.imagePc2) {
      setPcImages((images) => [...images, null]);
      setPcImageUrlList((urls) => [...urls, app.imagePc2]);
    }
    if (app.imagePc3) {
      setPcImages((images) => [...images, null]);
      setPcImageUrlList((urls) => [...urls, app.imagePc3]);
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
  const imagesFolder = "application-images";
  const iconsFolder = "application-icons";
  const MAX_PC_IMAGE_NUM = 3;
  const MAX_MOBILE_IMAGE_NUM = 3;

  const onChangeIconHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    setIconUrl(window.URL.createObjectURL(files[0]));
    setIcon(files[0]);
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

  const onChangePcImageHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    const filesArr = Object.entries(files).map(([key, value]) => value);
    filesArr.splice(MAX_PC_IMAGE_NUM);
    filesArr.map((value) => {
      setPcImageUrlList((urls) => [...urls, window.URL.createObjectURL(value)]);
      setPcImages((images) => [...images, value]);
    });
  };

  const handleDeleteIcon = async () => {
    setIcon(null);
    setIconUrl(null);
  };

  const handleDeleteMobileImage = async (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    e.preventDefault();
    setMobileImageUrlList(mobileImageUrlList.filter((_, i) => i !== index));
    setMobileImages(mobileImages.filter((_, i) => i !== index));
  };

  const handleDeletePcImage = async (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    e.preventDefault();
    setPcImageUrlList(pcImageUrlList.filter((_, i) => i !== index));
    setPcImages(pcImages.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    if (
      !(await editValidate(setErrors, link, category, tag1, tag2, tag3, description, iconUrl, pcImageUrlList, mobileImageUrlList))
    ) {
      setIsSubmitting(false);
      return;
    }
    setModalsOpen(true);
    const nameLowercase = name.toLowerCase().replace(/\s+/g, "");
    const tag1Lowercase = tag1 ? tag1.toLowerCase().replace(/\s+/g, "") : null;
    const tag2Lowercase = tag2 ? tag2.toLowerCase().replace(/\s+/g, "") : null;
    const tag3Lowercase = tag3 ? tag3.toLowerCase().replace(/\s+/g, "") : null;
    let storageIconUrl = iconUrl;
    let storageMobile1Url = mobileImageUrlList[0] ? mobileImageUrlList[0] : null;
    let storageMobile2Url = mobileImageUrlList[1] ? mobileImageUrlList[1] : null;
    let storageMobile3Url = mobileImageUrlList[2] ? mobileImageUrlList[2] : null;
    let storagePc1Url = pcImageUrlList[0] ? pcImageUrlList[0] : null;
    let storagePc2Url = pcImageUrlList[1] ? pcImageUrlList[1] : null;
    let storagePc3Url = pcImageUrlList[2] ? pcImageUrlList[2] : null;
    if (icon) storageIconUrl = await uploadToStorage(iconsFolder, nameLowercase, icon, "icon");
    if (mobileImages[0]) storageMobile1Url = await uploadToStorage(imagesFolder, nameLowercase, mobileImages[0], "mobile1");
    if (mobileImages[1]) storageMobile2Url = await uploadToStorage(imagesFolder, nameLowercase, mobileImages[1], "mobile2");
    if (mobileImages[2]) storageMobile3Url = await uploadToStorage(imagesFolder, nameLowercase, mobileImages[2], "mobile3");
    if (pcImages[0]) storagePc1Url = await uploadToStorage(imagesFolder, nameLowercase, pcImages[0], "pc1");
    if (pcImages[1]) storagePc2Url = await uploadToStorage(imagesFolder, nameLowercase, pcImages[1], "pc2");
    if (pcImages[2]) storagePc3Url = await uploadToStorage(imagesFolder, nameLowercase, pcImages[2], "pc3");

    const appRef = db.collection("applications").doc(app.id);
    await appRef.update({
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
      imageMobile1: storageMobile1Url,
      imageMobile2: storageMobile2Url,
      imageMobile3: storageMobile3Url,
      imagePc1: storagePc1Url,
      imagePc2: storagePc2Url,
      imagePc3: storagePc3Url,
      isPublic: false,
      updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setIsSubmitting(false);
  };
  return (
    <Layout title={`${app.name} - Edit`}>
      <>
        {currentUser && currentUser.uid === app.userId && isFound ? (
          <>
            <form onSubmit={handleSubmit} className="xl:px-28 pt-6">
              <div className="ml-1 mt-1 mb-9">
                <div className="mb-4">
                  <div className="block font-bold">Name</div>
                  <div className="text-xl font-bold">{name}</div>
                </div>
                <div className="mb-6">
                  <label className="block font-bold mb-2">
                    Link
                    <span className="text-red-400 ml-2">*</span>
                  </label>
                  <input
                    className="ring-2 ring-gray-300 rounded w-full py-2 px-3 leading-tight focus:outline-none focus:ring focus:ring-green-400"
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
                <div className="mb-6">
                  <label className="block font-bold mb-2">
                    Category<span className="text-red-400 ml-2">*</span>
                  </label>
                  <select
                    className="ring-2 ring-gray-300 w-44 py-2 px-3 rounded leading-tight focus:outline-none focus:ring focus:ring-green-400"
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
                <div className="mb-6">
                  <label className="block mb-2">
                    <span className="font-bold">Tags</span>
                    <span className="text-red-400 ml-2">*</span>
                    <span className="ml-2">1 or more required</span>
                  </label>
                  <input
                    className="ring-2 ring-gray-300 rounded w-28 py-2 px-3 mr-4 leading-tight focus:outline-none focus:ring focus:ring-green-400"
                    type="text"
                    maxLength={10}
                    value={tag1}
                    onChange={(e) => {
                      setTag1(e.target.value);
                      setErrors({ ...errors, tag1: [] });
                    }}
                  />
                  <input
                    className="ring-2 ring-gray-300 rounded w-28 py-2 px-3 mr-4 leading-tight focus:outline-none focus:ring focus:ring-green-400"
                    type="text"
                    maxLength={10}
                    value={tag2}
                    onChange={(e) => {
                      setTag2(e.target.value);
                      setErrors({ ...errors, tag2: [] });
                    }}
                  />
                  <input
                    className="ring-2 ring-gray-300 rounded w-28 py-2 px-3 mr-4 leading-tight focus:outline-none focus:ring focus:ring-green-400"
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
                <div className="mb-6">
                  <label className="block font-bold mb-2">
                    About this app
                    <span className="text-red-400 ml-2">*</span>
                  </label>
                  <textarea
                    className="ring-2 ring-gray-300 form-textarea mt-1 block w-full rounded w-full py-2 px-3 leading-tight focus:outline-none focus:ring focus:ring-green-400"
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
                  <label className="cursor-pointer py-1 px-5 inline-block tracking-wide border-2 border-green-400 text-green-500 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700">
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
                <p className="mb-2">
                  <span className="font-bold text-base">screenshots</span>
                  <span className="text-red-400 ml-2">*</span>
                  <span className="ml-2">Either mobile or PC screenshot is required.</span>
                </p>
                <label className="block font-bold mb-2">Mobile size screenshots (Up to 3 Images)</label>
                <div className="flex overflow-scroll">
                  {mobileImageUrlList.map((mobileImageUrl, index) => (
                    <ImagePreview
                      key={index}
                      imageUrl={mobileImageUrl}
                      handleDeleteImage={(event: React.ChangeEvent<HTMLInputElement>) => handleDeleteMobileImage(event, index)}
                      isLast={mobileImageUrlList.length - 1 === index}
                      isBtnLastOnlyDisplay={true}
                    />
                  ))}
                </div>
                <div className="mb-8">
                  <label className="cursor-pointer py-1 px-5 inline-block tracking-wide border-2 border-green-400 text-green-500 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700">
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
                      handleDeleteImage={(event: React.ChangeEvent<HTMLInputElement>) => handleDeletePcImage(event, index)}
                      isLast={pcImageUrlList.length - 1 === index}
                      isBtnLastOnlyDisplay={true}
                    />
                  ))}
                </div>
                <div className="mb-8">
                  <label className="cursor-pointer py-1 px-5 inline-block tracking-wide border-2 border-green-400 text-green-500 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700">
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
        ) : (
          <>
            <Forbidden />
          </>
        )}
      </>
    </Layout>
  );
};
export const getServerSideProps = async (context) => {
  const { name } = context.params;
  const res = await db.collection("applications").where("nameLowercase", "==", name).get();
  let app = res.docs.map((res) => res.data());

  if (app.length == 0) {
    return {
      props: {
        app: {},
        isFound: false,
      },
    };
  }
  app[0].id = res.docs[0].id;
  delete app[0]["createdAt"];
  delete app[0]["updatedAt"];
  return {
    props: {
      app: app[0],
      isFound: true,
    },
  };
};
export default Edit;
