import React from "react";

const useReactSelectOptions = () => {
  const createOptions = (listItems) => {
    const options = [];
    listItems.map((item) => {
      options.push({
        value: item,
        label: item,
      });
    });
    return options;
  };

  return { createOptions };
};

export default useReactSelectOptions;
