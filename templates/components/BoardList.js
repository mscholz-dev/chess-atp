import React from "react";
import Button from "./Button";
import IconUserDelete from "../../public/icons/user-delete.svg";
import useTranslation from "next-translate/useTranslation";

export default function BoardList({ items, handleDelete }) {
  const { t } = useTranslation("common");

  return (
    <>
      {items.map(({ id, avatar, username }) => (
        <div key={id} className="board-list-item">
          <div className="board-list-item-data">
            <img src={`${process.env.BASE_URL_API}/uploads/${avatar}`} alt={`${t("common:altAvatarStart")} ${username}`} className="board-list-item-img" />
            <p className="board-list-item-title">{username}</p>
          </div>
          <div className="board-list-item-btn">
            <Button className="btn btn-primary btn-small" onClick={() => handleDelete(username)}>
              <div>
                <IconUserDelete />
              </div>
              <span className="board-list-item-btn-title">{t("common:dashboardBtnTitleDelete")}</span>
            </Button>
          </div>
        </div>
      ))}
    </>
  );
}
