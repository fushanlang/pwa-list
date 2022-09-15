import { useState, useEffect, useCallback } from "react";
import { NextPage } from "next";
import "firebase/firestore";
import { useSelector } from "react-redux";

import { selectUser } from "../../../store/modules/user";
import categories from "../../../consts/categories";
import validateEdit from "../../../plugins/validations/requests/submissions/edit";
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
  const [mobileImageUrls, setMobileImageUrls] = useState<string[]>([]);
  const [pcImages, setPcImages] = useState<File[]>([]);
  const [pcImageUrls, setPcImageUrls] = useState<string[]>([]);

  useEffect(() => {
    app.tag1 && setTag1(app.tag1);
    app.tag2 && setTag2(app.tag2);
    app.tag3 && setTag3(app.tag3);
    app.imageMobile1 && setMobileImageUrls((prev) => [...prev, app.imageMobile1]);
    app.imageMobile2 && setMobileImageUrls((prev) => [...prev, app.imageMobile2]);
    app.imageMobile3 && setMobileImageUrls((prev) => [...prev, app.imageMobile3]);
    app.imagePc1 && setPcImageUrls((prev) => [...prev, app.imagePc1]);
    app.imagePc2 && setPcImageUrls((prev) => [...prev, app.imagePc2]);
    app.imagePc3 && setPcImageUrls((prev) => [...prev, app.imagePc3]);
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
  const MAX_IMAGE_NUM = 3;

  const onChangeIconHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    setIconUrl(window.URL.createObjectURL(files[0]));
    setIcon(files[0]);
  };

  const onChangeImageHandler = (e: React.ChangeEvent<HTMLInputElement>, setImages: React.Dispatch<any>, setUrls: React.Dispatch<any>) => {
    const { files } = e.target;
    const filesArr = Object.entries(files).map(([key, value]) => value);
    filesArr.splice(MAX_IMAGE_NUM);
    filesArr.map((value) => {
      setUrls((urls: string[]) => [...urls, window.URL.createObjectURL(value)]);
      setImages((images: File[]) => [...images, value]);
    });
  };

  const handleClickDeleteIcon = () => {
    setIcon(null);
    setIconUrl("");
  };

  const handleClickDeleteImage = (index: number, setImages: React.Dispatch<any>, setUrls: React.Dispatch<any>) => {
    setUrls((prev: string[]) => prev.filter((_, i) => i !== index));
    setImages((prev: File[]) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    if (!validateEdit(setErrors, link, category, tag1, tag2, tag3, description, iconUrl, pcImageUrls, mobileImageUrls)) {
      setIsSubmitting(false);
      return;
    }
    setIsModalOpen(true);
    const nameLowercase = name.toLowerCase().replace(/\s|-|\./g, "");
    let storageIconUrl = iconUrl;
    let storageMobile1Url = mobileImageUrls[0] ? mobileImageUrls[0] : null;
    let storageMobile2Url = mobileImageUrls[1] ? mobileImageUrls[1] : null;
    let storageMobile3Url = mobileImageUrls[2] ? mobileImageUrls[2] : null;
    let storagePc1Url = pcImageUrls[0] ? pcImageUrls[0] : null;
    let storagePc2Url = pcImageUrls[1] ? pcImageUrls[1] : null;
    let storagePc3Url = pcImageUrls[2] ? pcImageUrls[2] : null;
    if (icon) storageIconUrl = await uploadToStorage(iconsFolder, nameLowercase, icon, "icon");
    if (mobileImages[0]) storageMobile1Url = await uploadToStorage(imagesFolder, nameLowercase, mobileImages[0], "mobile1");
    if (mobileImages[1]) storageMobile2Url = await uploadToStorage(imagesFolder, nameLowercase, mobileImages[1], "mobile2");
    if (mobileImages[2]) storageMobile3Url = await uploadToStorage(imagesFolder, nameLowercase, mobileImages[2], "mobile3");
    if (pcImages[0]) storagePc1Url = await uploadToStorage(imagesFolder, nameLowercase, pcImages[0], "pc1");
    if (pcImages[1]) storagePc2Url = await uploadToStorage(imagesFolder, nameLowercase, pcImages[1], "pc2");
    if (pcImages[2]) storagePc3Url = await uploadToStorage(imagesFolder, nameLowercase, pcImages[2], "pc3");

    await db
      .collection("applications")
      .doc(app.id)
      .update({
        nameLowercase: nameLowercase,
        link: link,
        category: category,
        tag1: tag1,
        tag2: tag2,
        tag3: tag3,
        tag1Lowercase: tag1 ? tag1.toLowerCase().replace(/\s|-|\./g, "") : null,
        tag2Lowercase: tag2 ? tag2.toLowerCase().replace(/\s|-|\./g, "") : null,
        tag3Lowercase: tag3 ? tag3.toLowerCase().replace(/\s|-|\./g, "") : null,
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
                    errors={errors.category}
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
                    errors={errors.icon}
                    handleChange={(e: React.ChangeEvent<HTMLInputElement>) => onChangeIconHandler(e)}
                  >
                    {iconUrl && <ImagePreview imageUrls={[iconUrl]} handleClickDelete={handleClickDeleteIcon} maxHeight="20" />}
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
                    handleChange={(e: React.ChangeEvent<HTMLInputElement>) => onChangeImageHandler(e, setMobileImages, setMobileImageUrls)}
                  >
                    {mobileImageUrls.length !== 0 && (
                      <ImagePreview
                        imageUrls={mobileImageUrls}
                        handleClickDelete={(index) => handleClickDeleteImage(index, setMobileImages, setMobileImageUrls)}
                        maxHeight="60"
                      />
                    )}
                  </InputFile>
                </div>
                <div>
                  <InputFile
                    id={"pcImage"}
                    label={"PC size (Up to 3 Images)"}
                    labelMessage={"only show PC size display."}
                    isRequired={false}
                    errors={errors.screenshot}
                    handleChange={(e: React.ChangeEvent<HTMLInputElement>) => onChangeImageHandler(e, setPcImages, setPcImageUrls)}
                  >
                    {pcImageUrls.length !== 0 && (
                      <ImagePreview
                        imageUrls={pcImageUrls}
                        handleClickDelete={(index) => handleClickDeleteImage(index, setPcImages, setPcImageUrls)}
                        maxHeight="60"
                      />
                    )}
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
