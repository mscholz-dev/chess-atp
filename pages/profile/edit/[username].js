import React, { useState, useEffect, useRef } from "react";
import Form from "../../../templates/layouts/Form";
import Page from "../../../templates/layouts/Page";
import UploadImg from "../../../templates/components/input/UploadImg";
import TextInput from "../../../templates/components/input/TextInput";
import Button from "../../../templates/components/Button";
import IconEdit from "../../../public/icons/edit.svg";
import ProfileApi from "../../api/profile";
import { useRouter } from "next/router";
import BlockIllu from "../../../templates/components/block/BlockIllu";
import AuthApi from "../../api/auth";
import useTranslation from "next-translate/useTranslation";
import ToggleInput from "../../../templates/components/input/ToggleInput.js";
import setLanguage from "next-translate/setLanguage";

export default function ProfileEdit({ data, auth, locale, language }) {
  const { t } = useTranslation(["profileEdit", "common"]);

  const router = useRouter();

  const [toast, setToast] = useState({
    display: false,
    event: null,
    title: null,
    text: null,
  });

  const [image, setImage] = useState({ url: null, file: null });
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  const usernameRef = useRef(null);
  const emailRef = useRef(null);

  useEffect(async () => {
    const res = await ProfileApi.data(data);
    if (!res.state) return router.push(`/profile/${data}`);
    setToggleChecked(res.data.language === "en");
    await setLanguage(res.data.language);
    setUsername(res.data.username);
    setEmail(res.data.email);

    setImage({
      url: `${process.env.BASE_URL_API}/uploads/${res.data.avatar}`,
      file: null,
    });
  }, []);

  // form submit event
  const handleSubmit = async (e) => {
    e.preventDefault();

    // create form data
    const formData = new FormData();
    formData.append("language", toogleChecked ? "en" : "fr");
    formData.append("username", username);
    formData.append("email", email);

    // is the user choose a custom avatar
    if (image.file) {
      formData.append("avatar", image.file);
    } else {
      formData.append("avatar", null);
    }

    const res = await ProfileApi.update(formData);

    // is correct
    if (res.state) {
      return router.push(`/profile/${username}`);
    } else if (res.description === "invalid username") {
      setToast({
        display: true,
        event: "alert",
        title: t("common:toastTitleError"),
        text: t("common:toastTextErrorUsername"),
      });
      usernameRef.current.focus();
    } else if (res.description === "invalid email") {
      setToast({
        display: true,
        event: "alert",
        title: t("common:toastTitleError"),
        text: t("common:toastTextErrorEmail"),
      });
      emailRef.current.focus();
    } else if (res.description === "invalid avatar") {
      setToast({
        display: true,
        event: "alert",
        title: t("common:toastTitleError"),
        text: t("common:toastTextErrorAvatar"),
      });
    } else if (res.description === "user already exist") {
      setToast({
        display: true,
        event: "alert",
        title: t("common:toastTitleError"),
        text: t("common:toastTextErrorUserExisting"),
      });
      usernameRef.current.focus();
    } else if (res.description === "false user") {
      return router.push("/");
    }
  };

  const handleToastClick = () => setToast({ ...toast, display: !toast.display });

  const [toogleChecked, setToggleChecked] = useState(false);

  const handleToggleChange = async () => {
    switch (locale) {
      case "fr":
        setToggleChecked(true);
        await setLanguage("en");
        break;
      case "en":
        setToggleChecked(false);
        await setLanguage("fr");
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    switch (locale) {
      case "fr":
        setToggleChecked(false);
        break;
      case "en":
        setToggleChecked(true);
        break;
      default:
        break;
    }
  }, [locale]);

  return (
    <Page title={t("profileEdit:metaTitle")} auth={auth} toast={toast} handleToastClick={handleToastClick} locale={locale} language={language}>
      <BlockIllu imgSrc="/img/chess-light.jpg" imgAlt={t("profileEdit:altIllu")} full>
        <Form onSubmit={handleSubmit}>
          <h2>{t("profileEdit:title")}</h2>
          <UploadImg legend={t("common:avatarLegend")} image={image} setImage={setImage} label={t("common:avatarLabel")} />
          <ToggleInput text={t("common:toggleLangNotCheck")} textChecked={t("common:toggleLangCheck")} checked={toogleChecked} handleChange={handleToggleChange} />
          <TextInput label={t("common:usernameLabel")} type="text" condition={t("common:usernameCondition")} min={6} value={username} setValue={setUsername} myRef={usernameRef} />
          <TextInput label={t("common:emailLabel")} type="email" condition={t("common:emailCondition")} min={1} value={email} setValue={setEmail} myRef={emailRef} />
          <Button className="btn-primary btn-block">
            <div>
              <IconEdit />
            </div>
            <span>{t("profileEdit:btnTitle")}</span>
          </Button>
        </Form>
      </BlockIllu>
    </Page>
  );
}

export async function getServerSideProps({ locale, query }) {
  const res = await AuthApi.index();

  if (!res.state)
    return {
      props: {
        auth: false,
        data: "",
        locale,
        language: null,
      },
    };

  return {
    props: {
      data: query.username,
      auth: res.role,
      locale,
      language: res.language,
    },
  };
}
