import React from "react";
import IconChevron from "../../public/icons/chevron.svg";
import { paging } from "../../utils/paging";
import useTranslation from "next-translate/useTranslation";

export default function Paging({ current, max, setCurrent }) {
  const { t } = useTranslation("common");

  const scrollTop = () =>
    window.scrollTo({
      top: 400,
      behavior: "smooth",
    });

  const handlePrevArrow = () => {
    if (1 === current) return;
    setCurrent(current - 1);
    scrollTop();
  };

  const handleNextArrow = () => {
    if (max === current) return;
    setCurrent(current + 1);
    scrollTop();
  };

  const handleNumber = (number) => {
    setCurrent(number);
    scrollTop();
  };

  return (
    <>
      {max > 1 && (
        <div className="paging-wrapper">
          <div className="paging">
            <div className={`paging-arrow${current === 1 ? " paging-disabled" : ""}`} tabIndex={0} onClick={handlePrevArrow}>
              <p className="paging-text paging-text-left">{t("common:pagingPrev")}</p>
              <div className="paging-arrow-circle">
                <div className="paging-arrow-icon">
                  <IconChevron />
                </div>
              </div>
            </div>

            <div className="paging-content">
              {paging(max, current).map(({ id, number, current }) => (
                <p tabIndex={0} key={id} className={`paging-number paging-text${current ? " paging-current" : ""}`} onClick={() => handleNumber(number)}>
                  {number}
                </p>
              ))}
            </div>

            <div className={`paging-arrow${current === max ? " paging-disabled" : ""}`} tabIndex={0} onClick={handleNextArrow}>
              <div className="paging-arrow-circle paging-arrow-reverse">
                <div className="paging-arrow-icon">
                  <IconChevron />
                </div>
              </div>
              <p className="paging-text paging-text-right">{t("common:pagingNext")}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
