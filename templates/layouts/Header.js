import React, { useEffect, useState } from "react";
import IconLogo from "../../public/logo/chess-atp-icon.svg";
import IconHome from "../../public/icons/home.svg";
import IconPlay from "../../public/icons/play.svg";
import Button from "../components/Button";
import IconUserAdd from "../../public/icons/user-add.svg";
import IconSignIn from "../../public/icons/sign-in.svg";
import ToggleInput from "../components/input/ToggleInput.js";
import IconGear from "../../public/icons/gear.svg";
import IconUser from "../../public/icons/user.svg";
import ProfileApi from "../../pages/api/profile";
import IconChartLine from "../../public/icons/chart-line.svg";
import IconScaleBalance from "../../public/icons/scale-balance.svg";
import useTranslation from "next-translate/useTranslation";
import setLanguage from "next-translate/setLanguage";
import Link from "next/link";

export default function Header({ auth, locale, language }) {
  const { t } = useTranslation("common");

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => setOpen(!open);

  const handleKeyOpen = (e) => e.key === "Enter" && setOpen(!open);

  const [username, setUsername] = useState("");

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

    if (locale) return;

    // handle 404 translation
    switch (toogleChecked) {
      case false:
        setToggleChecked(true);
        await setLanguage("en");
        break;
      case true:
        setToggleChecked(false);
        await setLanguage("fr");
        break;
      default:
        break;
    }
  };

  useEffect(async () => {
    if (!language) return;

    switch (language) {
      case "fr":
        setToggleChecked(false);
        await setLanguage("fr");
        break;
      case "en":
        setToggleChecked(true);
        await setLanguage("en");
        break;
      default:
        break;
    }
  }, [language]);

  useEffect(() => {
    if (language) return;

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
  }, [locale, language]);

  useEffect(async () => {
    // const res = await ProfileApi.username();
    // if (res.state) setUsername(res.username);
  }, []);

  return (
    <header className={`header${open ? " header-open" : ""}`}>
      <div className="header-left" />
      <Link href="/">
        <a className="header-logo">
          <div className="header-logo-icon">
            <IconLogo />
          </div>
          <span className="header-logo-title link-hidden">Chess ATP</span>
        </a>
      </Link>
      <div className="header-burger" onClick={handleClickOpen} onKeyDown={handleKeyOpen} tabIndex={0}>
        <span className="header-burger-one" />
        <span className="header-burger-two" />
        <span className="header-burger-three" />
      </div>
      <div className="header-wrapper">
        <div className="header-wrapper-container">
          <Link href={`/`}>
            <a className="header-item">
              <div className="header-item-icon">
                <IconHome />
              </div>
              <span className="header-item-title">{t("headerHome")}</span>
            </a>
          </Link>

          {auth && (
            <>
              <Link href={`/game`}>
                <a className="header-item">
                  <div className="header-item-icon">
                    <IconPlay />
                  </div>
                  <span className="header-item-title">{t("headerGame")}</span>
                </a>
              </Link>
              <Link href={`/profile/${username}`}>
                <a className="header-item">
                  <div className="header-item-icon">
                    <IconUser />
                  </div>
                  <span className="header-item-title">{t("headerProfile")}</span>
                </a>
              </Link>

              {auth !== "client" && (
                <>
                  <Link href={`/dashboard`}>
                    <a className="header-item">
                      <div className="header-item-icon">
                        <IconGear />
                      </div>
                      <span className="header-item-title">{t("headerDashboard")}</span>
                    </a>
                  </Link>

                  {auth !== "admin" && (
                    <Link href={`/dashboard/statistics`}>
                      <a className="header-item">
                        <div className="header-item-icon">
                          <IconChartLine />
                        </div>
                        <span className="header-item-title">{t("headerStatistics")}</span>
                      </a>
                    </Link>
                  )}
                </>
              )}
            </>
          )}

          <Link href={`/legal-notice`}>
            <a className="header-item">
              <div className="header-item-icon">
                <IconScaleBalance />
              </div>
              <span className="header-item-title">{t("headerLegalNotice")}</span>
            </a>
          </Link>
        </div>

        {!auth && (
          <div className="header-btn-wrapper">
            <Button href="/register" className="btn-primary btn-large">
              <>
                <div>
                  <IconUserAdd />
                </div>
                <span>{t("headerRegister")}</span>
              </>
            </Button>
            <Button href="/login" className="btn-secondary btn-large">
              <>
                <div>
                  <IconSignIn />
                </div>
                <span>{t("headerLogin")}</span>
              </>
            </Button>
          </div>
        )}

        <div className="header-toggle">
          <ToggleInput text={t("common:toggleLangNotCheck")} textChecked={t("common:toggleLangCheck")} checked={toogleChecked} handleChange={handleToggleChange} />
        </div>
      </div>
    </header>
  );
}
