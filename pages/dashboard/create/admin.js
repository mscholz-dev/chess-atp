import React, { useEffect, useState, useRef } from "react";
import Page from "../../../templates/layouts/Page";
import AuthApi from "../../api/auth";
import { useRouter } from "next/router";
import BlockIllu from "../../../templates/components/block/BlockIllu";
import Form from "../../../templates/layouts/Form";
import UploadImg from "../../../templates/components/input/UploadImg";
import TextInput from "../../../templates/components/input/TextInput";
import Button from "../../../templates/components/Button";
import IconUserAdd from "../../../public/icons/user-add.svg";
import SuperAdminApi from "../../api/superadmin";
import useTranslation from "next-translate/useTranslation";
import ToggleInput from "../../../templates/components/input/ToggleInput";
import setLanguage from "next-translate/setLanguage";

export default function DashboardCreateAdmin({ auth, locale, language }) {
  const { t } = useTranslation(["dashboardAdminCreate", "common"]);

  const router = useRouter();

  const usernameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const [toast, setToast] = useState({
    display: false,
    event: null,
    title: null,
    text: null,
  });

  const [image, setImage] = useState({ url: null, file: null });
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleToastClick = () => setToast({ ...toast, display: !toast.display });

  useEffect(() => {
    if (!auth) router.push("/");
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // create a formData
    const formData = new FormData();
    formData.append("language", toogleChecked ? "en" : "fr");
    formData.append("username", username);
    formData.append("email", email);
    formData.append("password", password);

    // is the user choose a custom avatar
    if (image.file) {
      formData.append("avatar", image.file);
    } else {
      formData.append("avatar", "default.png");
    }

    // request to the api
    const res = await SuperAdminApi.adminCreate(formData);

    // is request valid
    if (res.state) {
      return router.push("/dashboard");

      // is username valid
    } else if (res.description === "invalid username") {
      setToast({
        display: true,
        event: "alert",
        title: t("common:toastTitleError"),
        text: t("common:toastTextErrorUsername"),
      });
      usernameRef.current.focus();

      // is email valid
    } else if (res.description === "invalid email") {
      setToast({
        display: true,
        event: "alert",
        title: t("common:toastTitleError"),
        text: t("common:toastTextErrorEmail"),
      });
      emailRef.current.focus();

      // is password valid
    } else if (res.description === "invalid password") {
      setToast({
        display: true,
        event: "alert",
        title: t("common:toastTitleError"),
        text: t("common:toastTextErrorPassword"),
      });
      passwordRef.current.focus();

      // is user already exist
    } else if (res.description === "user already exist") {
      setToast({
        display: true,
        event: "alert",
        title: t("common:toastTitleError"),
        text: t("common:toastTextErrorUserExisting"),
      });
      usernameRef.current.focus();

      // is avatar valid
    } else if (res.description === "invalid avatar") {
      setToast({
        display: true,
        event: "alert",
        title: t("common:toastTitleError"),
        text: t("common:toastTextErrorAvatar"),
      });
    }
  };

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
    <Page title={t("dashboardAdminCreate:metaTitle")} toast={toast} handleToastClick={handleToastClick} auth={auth} locale={locale} language={language}>
      <BlockIllu imgSrc="/img/chess-knight.jpg" imgAlt={t("dashboardAdminCreate:altIllu")} full tinyPadding>
        <Form onSubmit={handleSubmit}>
          <h2>{t("dashboardAdminCreate:title")}</h2>
          <UploadImg legend={t("common:avatarLegend")} image={image} setImage={setImage} />
          <ToggleInput text={t("common:toggleLangNotCheck")} textChecked={t("common:toggleLangCheck")} checked={toogleChecked} handleChange={handleToggleChange} />
          <TextInput label={t("common:usernameLabel")} type="text" condition={t("common:usernameCondition")} min={6} value={username} setValue={setUsername} myRef={usernameRef} />
          <TextInput label={t("common:emailLabel")} type="email" condition={t("common:emailCondition")} min={1} value={email} setValue={setEmail} myRef={emailRef} />
          <TextInput label={t("common:passwordLabel")} type="password" condition={t("common:passwordCondition")} min={12} value={password} setValue={setPassword} myRef={passwordRef} />
          <Button className="btn-primary btn-block">
            <div>
              <IconUserAdd />
            </div>
            <span>{t("dashboardAdminCreate:btnTitle")}</span>
          </Button>
        </Form>
      </BlockIllu>
    </Page>
  );
}

export async function getServerSideProps({ locale }) {
  const res = await AuthApi.superAdmin();

  // if not a super admin
  if (!res.state)
    return {
      props: {
        auth: false,
        locale,
        language: null,
      },
    };

  return {
    props: {
      auth: res.role,
      locale,
      language: res.language,
    },
  };
}
