import React, { useEffect, useRef } from "react";
import SearchInput from "./input/SearchInput";
import useTranslation from "next-translate/useTranslation";
import Link from "next/link";

export default function SearchHeader({ label, search, setSearch, handleSearch, placeholder, max, data }) {
  const { t } = useTranslation("common");

  const floatRef = useRef(null);

  useEffect(() => {
    if (!data) return (floatRef.current.style.height = "0px");
    floatRef.current.style.height = `${data.length * 52}px`;
  }, [data]);

  return (
    <div className={`search-header${max ? " search-header-max" : ""}`}>
      <h2 className="search-header-title">{label}</h2>
      <SearchInput value={search} setValue={setSearch} placeholder={placeholder} handleSearch={handleSearch} handleKeySearch={handleSearch} />
      <div ref={floatRef} className="search-header-float" id="searchHeaderRes">
        {data.map(({ id, avatar, username }) => (
          <Link key={id} href={`/profile/${username}`}>
            <a className="search-header-float-wrapper">
              <img src={`${process.env.BASE_URL_API}/uploads/${avatar}`} alt={`${t("common:altAvatarStart")} ${username}`} className="search-header-float-img" />
              <p className="search-header-float-title">{username}</p>
            </a>
          </Link>
        ))}
      </div>
    </div>
  );
}
