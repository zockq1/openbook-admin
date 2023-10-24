import React from "react";

const formatSearchResult = (text: string, searchKeyword: string) => {
  const regex = new RegExp(`(${searchKeyword})`, "gi");
  return text
    .split(regex)
    .map((chunk, index) =>
      regex.test(chunk) ? <strong key={index}>{chunk}</strong> : chunk
    );
};

export default formatSearchResult;
