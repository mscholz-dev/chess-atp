import React from "react";
import Head from "next/head";
import Header from "./Header";
import Toast from "../components/Toast";

export default function Page({ title, children, toast, handleToastClick, auth, locale, language }) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" />
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {toast && <Toast display={toast.display} event={toast.event} title={toast.title} text={toast.text} handleClick={handleToastClick} />}
      <Header auth={auth} locale={locale} language={language} />
      <main className="main-wrapper">{children}</main>
    </>
  );
}
