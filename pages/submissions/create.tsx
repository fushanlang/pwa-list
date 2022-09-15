import { useState, useEffect, useCallback } from "react";
import { NextPage } from "next";
import Router from "next/router";
import { useSelector } from "react-redux";
import "firebase/firestore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinusCircle } from "@fortawesome/free-solid-svg-icons";

import { selectUser } from "../../store/modules/user";
import categories from "../../consts/categories";
import Layout from "../../components/Layout/Layout";
import CompletedModal from "../../components/Submissions/CompletedModal";
import ImagePreview from "../../components/Submissions/ImagePreview";
import Input from "../../components/Common/Form/Input";
import InputFile from "../../components/Common/Form/InputFile";
import Select from "../../components/Common/Form/Select";
import Textarea from "../../components/Common/Form/Textarea";
import ErrorMessage from "../../components/Common/Form/ErrorMessage";
import validateCreate from "../../plugins/validations/requests/submissions/create";
import uploadToStorage from "../../plugins/image/uploadToStorage";
import firebase from "../../plugins/firebase";

const db = firebase.firestore();
const Create: NextPage = () => {
  const user = useSelector(selectUser);
  useEffect(() => {
    user.uid === "" && Router.push("/sign-up");
  }, [user]);

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
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
  const [mobileImages, setMobileImages] = useState<File[]>([]);
  const [mobileImageUrlList, setMobileImageUrlList] = useState<string[]>([]);
  const [pcImages, setPcImages] = useState<File[]>([]);
  const [pcImageUrlList, setPcImageUrlList] = useState<string[]>([]);
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

  const onChangePcImageHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    const filesArr = Object.entries(files).map(([key, value]) => value);
    filesArr.splice(MAX_PC_IMAGE_NUM);
    filesArr.map((value) => {
      setPcImageUrlList((urls) => [...urls, window.URL.createObjectURL(value)]);
      setPcImages((images) => [...images, value]);
    });
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
  const handleDeleteIcon = () => {
    setIcon(null);
    setIconUrl("");
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
    if (!(await validateCreate(setErrors, name, link, category, tag1, tag2, tag3, description, icon, pcImages, mobileImages))) {
      setIsSubmitting(false);
      return;
    }
    setIsModalOpen(true);
    const nameLowercase = name.toLowerCase().replace(/\s|-|\./g, "");
    const tag1Lowercase = tag1 ? tag1.toLowerCase().replace(/\s|-|\./g, "") : null;
    const tag2Lowercase = tag2 ? tag2.toLowerCase().replace(/\s|-|\./g, "") : null;
    const tag3Lowercase = tag3 ? tag3.toLowerCase().replace(/\s|-|\./g, "") : null;
    const uploadResp = await Promise.all([
      uploadToStorage(iconsFolder, nameLowercase, icon, "icon"),
      uploadToStorage(imagesFolder, nameLowercase, pcImages[0], "pc1"),
      uploadToStorage(imagesFolder, nameLowercase, pcImages[1], "pc2"),
      uploadToStorage(imagesFolder, nameLowercase, pcImages[2], "pc3"),
      uploadToStorage(imagesFolder, nameLowercase, mobileImages[0], "mobile1"),
      uploadToStorage(imagesFolder, nameLowercase, mobileImages[1], "mobile2"),
      uploadToStorage(imagesFolder, nameLowercase, mobileImages[2], "mobile3"),
    ]);
    db.collection("applications").add({
      userId: user.uid,
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
      icon: uploadResp[0],
      imagePc1: uploadResp[1],
      imagePc2: uploadResp[2],
      imagePc3: uploadResp[3],
      imageMobile1: uploadResp[4],
      imageMobile2: uploadResp[5],
      imageMobile3: uploadResp[6],
      isPublic: false,
      isRejected: false,
      isFeatured: false,
      isNewApp: false,
      rejectionMessage: "",
      newAppOrder: "",
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setIsSubmitting(false);
  };
  return (
    <Layout title="Submit">
      {user.uid && (
        <div className="px-5 py-6">
          <form onSubmit={handleSubmit} className="xl:px-28 pt-6">
            <div className="mb-9">
              <div className="mb-6">
                <Input
                  id={"name"}
                  label={"Name"}
                  isRequired={true}
                  maxLength={28}
                  state={name}
                  errors={errors.name}
                  handleChange={useCallback((e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value), [])}
                />
              </div>

              <div className="mb-6">
                <Input
                  id={"link"}
                  label={"Link"}
                  isRequired={true}
                  maxLength={120}
                  placeholder="https://pwalist.app"
                  state={link}
                  errors={errors.link}
                  handleChange={useCallback((e: React.ChangeEvent<HTMLInputElement>) => setLink(e.target.value), [])}
                />
              </div>

              <div className="mb-6">
                <Select
                  id={"category"}
                  label={"Category"}
                  isRequired={true}
                  state={category}
                  list={categories}
                  errors={errors.link}
                  handleChange={useCallback((e: React.ChangeEvent<HTMLSelectElement>) => setCategory(e.target.value), [])}
                />
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
                  handleChange={useCallback((e: React.ChangeEvent<HTMLInputElement>) => setTag1(e.target.value), [])}
                />
                <Input
                  id={"tag"}
                  inputClass={"w-28 mr-4"}
                  maxLength={10}
                  placeholder="Timer"
                  state={tag2}
                  handleChange={useCallback((e: React.ChangeEvent<HTMLInputElement>) => setTag2(e.target.value), [])}
                />
                <Input
                  id={"tag"}
                  inputClass={"w-28"}
                  maxLength={10}
                  placeholder="Management"
                  state={tag3}
                  handleChange={useCallback((e: React.ChangeEvent<HTMLInputElement>) => setTag3(e.target.value), [])}
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
                  errors={errors.description}
                  handleChange={useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => setDescription(e.target.value), [])}
                />
              </div>

              <div className="mb-6">
                <InputFile
                  id={"icon"}
                  label={"Icon"}
                  isRequired={true}
                  handleChange={useCallback((e: React.ChangeEvent<HTMLInputElement>) => onChangeIconHandler(e), [])}
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
                  handleChange={useCallback((e: React.ChangeEvent<HTMLInputElement>) => onChangeMobileImageHandler(e), [])}
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
                  errors={errors.screenshot}
                  handleChange={useCallback((e: React.ChangeEvent<HTMLInputElement>) => onChangePcImageHandler(e), [])}
                >
                  <div className="flex overflow-scroll">
                    {pcImageUrlList.map((pcImageUrl, index) => (
                      <ImagePreview key={index} index={index} imageUrl={pcImageUrl} handleDeleteImage={handleDeletePcImage} />
                    ))}
                  </div>
                </InputFile>
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
      )}
    </Layout>
  );
};

export default Create;
