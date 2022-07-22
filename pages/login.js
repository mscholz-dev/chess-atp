import React, { useState, useRef } from "react";
import { useRouter } from "next/router";
import Page from "../templates/layouts/Page";
import BlockIllu from "../templates/components/block/BlockIllu.js";
import TextInput from "../templates/components/input/TextInput.js";
import Button from "../templates/components/Button.js";
import IconSignIn from "../public/icons/sign-in.svg";
import Form from "../templates/layouts/Form";
import LoginApi from "./api/login";
import AuthApi from "./api/auth";
import useTranslation from "next-translate/useTranslation";

export default function Login({ auth, locale, language }) {
  const { t } = useTranslation(["login", "common"]);

  const router = useRouter();

  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const [toast, setToast] = useState({
    display: false,
    event: null,
    title: null,
    text: null,
  });

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleToastClick = () => setToast({ ...toast, display: !toast.display });

  const handleSubmit = async (e) => {
    e.preventDefault();

    // request to the api
    const res = await LoginApi.index({
      email: email,
      password: password,
    });

    // is request valid
    if (res.state) {
      return router.push("/");

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
    } else if (res.description === "user not found") {
      setToast({
        display: true,
        event: "alert",
        title: t("common:toastTitleError"),
        text: t("login:toastTextErrorUserNotFound"),
      });
      emailRef.current.focus();
    }
  };

  return (
    <Page title={t("login:metaTitle")} toast={toast} handleToastClick={handleToastClick} auth={auth} locale={locale} language={language}>
      <BlockIllu imgSrc="/img/chess-break.jpg" imgAlt={t("login:illuAlt")} full>
        <Form onSubmit={handleSubmit}>
          <h2>{t("login:title")}</h2>
          <TextInput label={t("common:emailLabel")} type="email" condition={t("common:emailCondition")} min={1} value={email} setValue={setEmail} myRef={emailRef} />
          <TextInput label={t("common:passwordLabel")} type="password" condition={t("common:passwordCondition")} min={12} value={password} setValue={setPassword} myRef={passwordRef} />
          <Button className="btn-primary btn-block">
            <div>
              <IconSignIn />
            </div>
            <span>{t("login:btnTitle")}</span>
          </Button>
        </Form>
      </BlockIllu>
    </Page>
  );
}

export async function getServerSideProps({ locale }) {
  const res = await AuthApi.index();

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
