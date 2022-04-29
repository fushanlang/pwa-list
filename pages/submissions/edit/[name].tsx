import { useState, useEffect, useContext } from "react";
import { NextPage } from "next";
import Router from "next/router";
import { AuthContext } from "../../../contexts/Auth";
import categories from "../../../consts/categories";
import editValidate from "../../../plugins/submissions/editValidate";
import updateImage from "../../../plugins/submissions/updateImage";
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
    app.imageMobile1 && setMobileImageUrlList((images) => [...images, app.imageMobile1]);
    app.imageMobile2 && setMobileImageUrlList((images) => [...images, app.imageMobile2]);
    app.imageMobile3 && setMobileImageUrlList((images) => [...images, app.imageMobile3]);
    app.imagePc1 && setMobileImageUrlList((images) => [...images, app.imagePc1]);
    app.imagePc2 && setMobileImageUrlList((images) => [...images, app.imagePc2]);
    app.imagePc3 && setMobileImageUrlList((images) => [...images, app.imagePc3]);
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
    let mobileImageNum = 0;
    let pcImageNum = 0;
    let nameLowercase = name.toLowerCase().replace(/\s+/g, "");
    let tag1Lowercase = tag1 ? tag1.toLowerCase().replace(/\s+/g, "") : null;
    let tag2Lowercase = tag2 ? tag2.toLowerCase().replace(/\s+/g, "") : null;
    let tag3Lowercase = tag3 ? tag3.toLowerCase().replace(/\s+/g, "") : null;
    let uploadedIconUrl = iconUrl;
    let uploadedImageMobile1Url = mobileImageUrlList[0] !== undefined ? mobileImageUrlList[0] : null;
    let uploadedImageMobile2Url = mobileImageUrlList[1] !== undefined ? mobileImageUrlList[1] : null;
    let uploadedImageMobile3Url = mobileImageUrlList[2] !== undefined ? mobileImageUrlList[2] : null;
    let uploadedImagePc1Url = pcImageUrlList[0] !== undefined ? pcImageUrlList[0] : null;
    let uploadedImagePc2Url = pcImageUrlList[1] !== undefined ? pcImageUrlList[1] : null;
    let uploadedImagePc3Url = pcImageUrlList[2] !== undefined ? pcImageUrlList[2] : null;

    if (icon !== null) {
      uploadedIconUrl = await uploadToStorage(iconsFolder, nameLowercase, icon, "icon");
    }
    mobileImageNum = await updateImage(
      imagesFolder,
      uploadedImageMobile1Url,
      mobileImages,
      nameLowercase,
      mobileImageNum,
      "mobile1"
    );
    mobileImageNum = await updateImage(
      imagesFolder,
      uploadedImageMobile2Url,
      mobileImages,
      nameLowercase,
      mobileImageNum,
      "mobile2"
    );
    mobileImageNum = await updateImage(
      imagesFolder,
      uploadedImageMobile3Url,
      mobileImages,
      nameLowercase,
      mobileImageNum,
      "mobile3"
    );
    pcImageNum = await updateImage(imagesFolder, uploadedImagePc1Url, pcImages, nameLowercase, pcImageNum, "pc1");
    pcImageNum = await updateImage(imagesFolder, uploadedImagePc2Url, pcImages, nameLowercase, pcImageNum, "pc2");
    pcImageNum = await updateImage(imagesFolder, uploadedImagePc3Url, pcImages, nameLowercase, pcImageNum, "pc3");
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
      icon: uploadedIconUrl,
      imageMobile1: uploadedImageMobile1Url,
      imageMobile2: uploadedImageMobile2Url,
      imageMobile3: uploadedImageMobile3Url,
      imagePc1: uploadedImagePc1Url,
      imagePc2: uploadedImagePc2Url,
      imagePc3: uploadedImagePc3Url,
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
                    <span className="text-xs text-red-400 ml-2">1 or more required</span>
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
                      handleDeleteImage={(event: React.ChangeEvent<HTMLInputElement>) => handleDeleteMobileImage(event, index)}
                      isLast={mobileImageUrlList.length - 1 === index}
                      isBtnLastOnlyDisplay={true}
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
                      handleDeleteImage={(event: React.ChangeEvent<HTMLInputElement>) => handleDeletePcImage(event, index)}
                      isLast={pcImageUrlList.length - 1 === index}
                      isBtnLastOnlyDisplay={true}
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
  const app = res.docs.map((res) => res.data());
  if (app.length == 0) {
    return {
      props: {
        app: {},
        isFound: false,
      },
    };
  }
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
