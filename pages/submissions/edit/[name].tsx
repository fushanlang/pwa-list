import { useState, useEffect, useCallback } from "react";
import { NextPage } from "next";
import Router from "next/router";
import "firebase/firestore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinusCircle } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";

import { selectUser } from "../../../store/modules/user";
import categories from "../../../consts/categories";
import editValidate from "../../../plugins/submissions/editValidate";
import firebase from "../../../plugins/firebase";
import uploadToStorage from "../../../plugins/image/uploadToStorage";
import Layout from "../../../components/Layout/Layout";
import Forbidden from "../../../components/Common/Forbidden";
import Input from "../../../components/Common/Form/Input";
import InputFile from "../../../components/Common/Form/InputFile";
import Select from "../../../components/Common/Form/Select";
import Textarea from "../../../components/Common/Form/Textarea";
import ErrorMessage from "../../../components/Common/Form/ErrorMessage";
import ImagePreview from "../../../components/Submissions/ImagePreview";
import CompletedModal from "../../../components/Submissions/CompletedModal";
import { App } from "../../../types/app";

const db = firebase.firestore();

type Props = { app: App; isFound: boolean };

const Edit: NextPage<Props> = (props) => {
  const { app, isFound } = props;
  const user = useSelector(selectUser);
  useEffect(() => {
    user.uid === "" && Router.push("/sign-up");
  }, [user]);

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [name, setName] = useState<string>(app.name);
  const [link, setLink] = useState<string>(app.link);
  const [category, setCategory] = useState<string>(app.category);
  const [tag1, setTag1] = useState<string>("");
  const [tag2, setTag2] = useState<string>("");
  const [tag3, setTag3] = useState<string>("");
  const [description, setDescription] = useState<string>(app.description);
  const [icon, setIcon] = useState<File>(null);
  const [iconUrl, setIconUrl] = useState<string>(app.icon);
  const [mobileImages, setMobileImages] = useState<File[]>([]);
  const [mobileImageUrlList, setMobileImageUrlList] = useState<string[]>([]);
  const [pcImages, setPcImages] = useState<File[]>([]);
  const [pcImageUrlList, setPcImageUrlList] = useState<string[]>([]);

  useEffect(() => {
    app.tag1 && setTag1(app.tag1);
    app.tag2 && setTag2(app.tag2);
    app.tag3 && setTag3(app.tag3);
    app.imageMobile1 && setMobileImageUrlList((prev) => [...prev, app.imageMobile1]);
    app.imageMobile2 && setMobileImageUrlList((prev) => [...prev, app.imageMobile2]);
    app.imageMobile3 && setMobileImageUrlList((prev) => [...prev, app.imageMobile3]);
    app.imagePc1 && setPcImageUrlList((prev) => [...prev, app.imagePc1]);
    app.imagePc2 && setPcImageUrlList((prev) => [...prev, app.imagePc2]);
    app.imagePc3 && setPcImageUrlList((prev) => [...prev, app.imagePc3]);
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

  const onChangeIconHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    setIconUrl(window.URL.createObjectURL(files[0]));
    setIcon(files[0]);
  };

  const onChangeMobileImageHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    const filesArr = Object.entries(files).map(([key, value]) => value);
    filesArr.splice(MAX_MOBILE_IMAGE_NUM);
    filesArr.map((value) => {
      setMobileImageUrlList((urls) => [...urls, window.URL.createObjectURL(value)]);
      setMobileImages((images) => [...images, value]);
    });
  };

  const onChangePcImageHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    const filesArr = Object.entries(files).map(([key, value]) => value);
    filesArr.splice(MAX_PC_IMAGE_NUM);
    filesArr.map((value) => {
      setPcImageUrlList((urls) => [...urls, window.URL.createObjectURL(value)]);
      setPcImages((images) => [...images, value]);
    });
  };

  const handleDeleteIcon = () => {
    setIcon(null);
    setIconUrl(null);
  };

  const handleDeletePcImage = useCallback((index: number) => {
    setPcImageUrlList((prev) => prev.filter((_, i) => i !== index));
    setPcImages((prev) => prev.filter((_, i) => i !== index));
  }, []);

  const handleDeleteMobileImage = useCallback((index: number) => {
    setMobileImageUrlList((prev) => prev.filter((_, i) => i !== index));
    setMobileImages((prev) => prev.filter((_, i) => i !== index));
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    if (!(await editValidate(setErrors, link, category, tag1, tag2, tag3, description, iconUrl, pcImageUrlList, mobileImageUrlList))) {
      setIsSubmitting(false);
      return;
    }
    setIsModalOpen(true);
    const nameLowercase = name.toLowerCase().replace(/\s|-|\./g, "");
    const tag1Lowercase = tag1 ? tag1.toLowerCase().replace(/\s|-|\./g, "") : null;
    const tag2Lowercase = tag2 ? tag2.toLowerCase().replace(/\s|-|\./g, "") : null;
    const tag3Lowercase = tag3 ? tag3.toLowerCase().replace(/\s|-|\./g, "") : null;
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

    await db.collection("applications").doc(app.id).update({
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
      isRejected: false,
      updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setIsSubmitting(false);
  };
  return (
    <Layout title={`${app.name} - Edit`}>
      <>
        {user.uid === app.userId && isFound ? (
          <div className="px-5 py-6">
            <form onSubmit={handleSubmit} className="xl:px-28 pt-6">
              <div className="mb-9">
                <div className="mb-4">
                  <div className="block font-bold">Name</div>
                  <div className="text-xl font-bold">{name}</div>
                </div>
                <div className="mb-6">
                  <Input
                    id={"link"}
                    label={"Link"}
                    isRequired={true}
                    maxLength={120}
                    placeholder="https://pwalist.app"
                    state={link}
                    handleChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      setLink(e.target.value);
                      setErrors({ ...errors, link: [] });
                    }}
                  />
                  <ErrorMessage errors={errors.link}></ErrorMessage>
                </div>

                <div className="mb-6">
                  <Select
                    id={"category"}
                    label={"Category"}
                    isRequired={true}
                    state={category}
                    list={categories}
                    handleChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      setCategory(e.target.value);
                      setErrors({ ...errors, category: [] });
                    }}
                  />
                  <ErrorMessage errors={errors.category}></ErrorMessage>
                </div>

                <div className="mb-6">
                  <Input
                    id={"tag"}
                    label={"Tags"}
                    labelMessage={"1 or more required"}
                    isRequired={true}
                    inputClass={"w-28 mr-4"}
                    maxLength={10}
                    placeholder="ToDo"
                    state={tag1}
                    handleChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      setTag1(e.target.value);
                      setErrors({ ...errors, tag1: [] });
                    }}
                  />
                  <Input
                    id={"tag"}
                    inputClass={"w-28 mr-4"}
                    maxLength={10}
                    placeholder="Timer"
                    state={tag2}
                    handleChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      setTag2(e.target.value);
                      setErrors({ ...errors, tag2: [] });
                    }}
                  />
                  <Input
                    id={"tag"}
                    inputClass={"w-28"}
                    maxLength={10}
                    placeholder="Management"
                    state={tag3}
                    handleChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      setTag3(e.target.value);
                      setErrors({ ...errors, tag3: [] });
                    }}
                  />
                  <ErrorMessage errors={errors.tag1}></ErrorMessage>
                  <ErrorMessage errors={errors.tag2}></ErrorMessage>
                  <ErrorMessage errors={errors.tag3}></ErrorMessage>
                </div>

                <div className="mb-6">
                  <Textarea
                    id={"about"}
                    label={"About this app"}
                    isRequired={true}
                    maxLength={2000}
                    state={description}
                    handleChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                      setDescription(e.target.value);
                      setErrors({ ...errors, description: [] });
                    }}
                  />
                  <ErrorMessage errors={errors.description}></ErrorMessage>
                </div>

                <div className="mb-6">
                  <InputFile
                    id={"icon"}
                    label={"Icon"}
                    isRequired={true}
                    handleChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      onChangeIconHandler(e);
                      setErrors({ ...errors, icon: [] });
                    }}
                  >
                    {iconUrl && (
                      <div className="flex mb-4">
                        <div className="relative">
                          <img className="border rounded max-h-20" alt="icon" src={iconUrl} />
                          <button className="text-red-500 hover:text-red-700 absolute top-0 right-0 mt-1 mr-1" onClick={handleDeleteIcon}>
                            <FontAwesomeIcon icon={faMinusCircle} size="lg" />
                          </button>
                        </div>
                      </div>
                    )}
                  </InputFile>
                  <ErrorMessage errors={errors.icon}></ErrorMessage>
                </div>

                <p className="mb-3">
                  <span className="font-bold text-base">Screenshots</span>
                  <span className="ml-2">Either mobile or PC screenshot is required.</span>
                </p>
                <div className="mb-6">
                  <InputFile
                    id={"mobileImage"}
                    label={"Mobile size (Up to 3 Images)"}
                    isRequired={false}
                    handleChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      onChangeMobileImageHandler(e);
                      setErrors({ ...errors, screenshot: [] });
                    }}
                  >
                    <div className="flex overflow-scroll">
                      {mobileImageUrlList.map((mobileImageUrl, index) => (
                        <ImagePreview key={index} index={index} imageUrl={mobileImageUrl} handleDeleteImage={handleDeleteMobileImage} />
                      ))}
                    </div>
                  </InputFile>
                </div>

                <div>
                  <InputFile
                    id={"pcImage"}
                    label={"PC size (Up to 3 Images)"}
                    labelMessage={"only show PC size display."}
                    isRequired={false}
                    handleChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      onChangePcImageHandler(e);
                      setErrors({ ...errors, screenshot: [] });
                    }}
                  >
                    <div className="flex overflow-scroll">
                      {pcImageUrlList.map((pcImageUrl, index) => (
                        <ImagePreview key={index} index={index} imageUrl={pcImageUrl} handleDeleteImage={handleDeletePcImage} />
                      ))}
                    </div>
                  </InputFile>
                  <ErrorMessage errors={errors.screenshot}></ErrorMessage>
                </div>
              </div>
              <div className="mt-10 mb-12">
                <button
                  className="w-48 bg-green-400 hover:bg-green-500 text-white font-bold py-2 px-4 rounded focus:outline-none"
                  type="submit"
                >
                  Submit
                </button>
              </div>
            </form>
            <CompletedModal isModalOpen={isModalOpen} isSubmitting={isSubmitting} />
          </div>
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
