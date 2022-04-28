import React from "react";
import IconCross from "../../../public/icons/cross.svg";
import IconSearch from "../../../public/icons/search.svg";

export default function SearchInput({ value, setValue, placeholder, handleSearch, handleKeySearch }) {
  const hideData = () => {
    setValue("");
    const searchHeader = document.querySelector("#searchHeaderRes");
    if (searchHeader) searchHeader.style.height = "0px";
  };

  const handleDelete = () => hideData();

  const handleChange = (e) => setValue(e.target.value);

  const handleKeyDelete = (e) => e.key === "Enter" && hideData();

  return (
    <label className="search-input">
      <div className="search-input-cta" onClick={handleSearch} onKeyDown={handleKeySearch} tabIndex={0}>
        <IconSearch />
      </div>
      <input type="text" value={value} placeholder={placeholder} className="search-input-field" onChange={handleChange} onKeyDown={handleKeySearch} />
      <div className="search-input-delete" onClick={handleDelete} onKeyDown={handleKeyDelete} tabIndex={0}>
        <IconCross />
      </div>
    </label>
  );
}
