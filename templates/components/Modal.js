import React from "react";
import IconCross from "../../public/icons/cross.svg";
import IconBolt from "../../public/icons/bolt.svg";
import Button from "./Button";
import useTranslation from "next-translate/useTranslation";

export default function Modal({ title, playerOneAvatar, playerOneUsername, playerTwoAvatar, playerTwoUsername, result, display, setDisplay, inverse, boolean, handleEqualityAccepted, handleEqualityRefused }) {
  const { t } = useTranslation("game");

  const handleClose = () => setDisplay(false);

  return (
    <div className={`modal${display ? " modal-display" : ""}${inverse ? " modal-inverse" : ""}`}>
      {boolean ? (
        <>
          <h3 className="modal-subtitle">
            {playerTwoUsername} {t("game:modalBooleanTitleEnd")}
          </h3>
          <div className="modal-boolean-btn">
            <Button className="btn-tiny btn-secondary" onClick={handleEqualityAccepted}>
              <span>{t("game:modalBooleanBtnTitleValid")}</span>
            </Button>
            <Button className="btn-tiny btn-primary" onClick={handleEqualityRefused}>
              <span>{t("game:modalBooleanBtnTitleInvalid")}</span>
            </Button>
          </div>
        </>
      ) : (
        <>
          <div className="modal-close" onClick={handleClose}>
            <IconCross />
          </div>
          <h3 className="modal-title">{title}</h3>
          <div className="modal-body">
            <div className="modal-player">
              <img src={playerOneAvatar} alt={`${t("game:altAvatarStart")} ${playerOneUsername}`} className={`modal-avatar${result === "winner" ? " modal-avatar-winner" : result === "equality" ? " modal-avatar-equality" : ""}`} />
              <span className="modal-username">{playerOneUsername}</span>
            </div>
            <div className="modal-versus">
              <div className="modal-versus-icon">
                <IconBolt />
              </div>
              <span className="modal-versus-result">
                {result === "winner" && "1 - 0"}
                {result === "looser" && "0 - 1"}
                {result === "equality" && "0.5 - 0.5"}
              </span>
            </div>
            <div className="modal-player">
              <img src={playerTwoAvatar} alt={`${t("game:altAvatarStart")} ${playerTwoAvatar}`} className={`modal-avatar${result === "equality" ? " modal-avatar-equality" : result !== "winner" ? " modal-avatar-winner" : ""}`} />
              <span className="modal-username">{playerTwoUsername}</span>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
