import React from "react";
import IconImage from "../../../public/icons/image.svg";
import useTranslation from "next-translate/useTranslation";

export default function UploadImg({ legend, image, setImage, label }) {
  const { t } = useTranslation("common");

  const handleFile = (e) => {
    const file = e.target.files[0];

    const reader = new FileReader();

    reader.onload = (e) => {
      setImage({
        url: e.target.result,
        file: file,
      });
    };

    reader.readAsDataURL(file);
  };

  const empty = image.url === "" || image.url === null || image.url === undefined;

  return (
    <div className="upload-img">
      <span className="upload-img-title">{label}</span>
      <label className="upload-img-content">
        <input type="file" accept=".jpg, .jpeg, .png" className="upload-img-input" onChange={handleFile} />
        {empty ? (
          <div className="upload-img-content-icon">
            <IconImage />
          </div>
        ) : (
          <img src={image.url} alt={t("common:altAvatar")} className="upload-img-content-img" />
        )}
      </label>
      {legend && <span className="upload-img-legend">{legend}</span>}
    </div>
  );
}
