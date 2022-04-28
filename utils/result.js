export const resultWinner = (t) => {
  return {
    title: t("game:modalTitleWinner"),
    result: "winner",
  };
};

export const resultLooser = (t) => {
  return {
    title: t("game:modalTitleLooser"),
    result: "looser",
  };
};

export const resultEquality = (t) => {
  return {
    title: t("game:modalTitleEquality"),
    result: "equality",
  };
};
