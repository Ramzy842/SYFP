import React from "react";

import GlobalContext from "../Context";

import Photo from "./Photo";

const Photos = () => {
  const { userUrls, notice } = GlobalContext();

  if (userUrls.length === 0 && !notice) {
    return <h1 className="text-center text-xl">You Have No Uploaded Photos</h1>;
  }

  return (
    <div className="grid grid-cols-2 p-4 gap-2 md:gap-0 md:gap-y-4 sm:grid-cols-3 sm:w-11/12 justify-items-center mx-auto ">
      {userUrls.map((image, index) => {
        return <Photo key={index} {...image} />;
      })}
    </div>
  );
};

export default Photos;
