import React from "react";
import IconHeartPulse from "../../../public/icons/heart-pulse.svg";
import IconUserAdd from "../../../public/icons/user-add.svg";
import IconEdit from "../../../public/icons/edit.svg";
import Link from "next/link";

export default function Profile({ imgSrc, username, lastConnection, createdDate }) {
  return (
    <div className="profile">
      <Link href={`/profile/edit/${username}`}>
        <a className="profile-edit">
          <IconEdit />
        </a>
      </Link>

      <div className="profile-user">
        <img src={`${process.env.BASE_URL_API}/uploads/${imgSrc}`} alt={`Avatar de ${username}`} className="profile-user-img" />
        <p className="profile-user-username">{username}</p>
      </div>

      <div className="profile-item-wrapper">
        <div className="profile-item">
          <div className="profile-item-icon">
            <IconHeartPulse />
          </div>
          <p className="profile-item-text">{lastConnection}</p>
        </div>

        <div className="profile-item">
          <div className="profile-item-icon">
            <IconUserAdd />
          </div>
          <p className="profile-item-text">{createdDate}</p>
        </div>
      </div>
    </div>
  );
}
