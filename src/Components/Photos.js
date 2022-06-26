import React from "react";

import GlobalContext from "../Context";


import Photo from "./Photo";

const Photos = () => {
  const { userUrls, notice } = GlobalContext();

  if (userUrls.length === 0 && !notice) {
    return <h1 className="text-center text-xl">You Have No Uploaded Photos</h1>;
  }

  return (
    <div className={` grid grid-cols-3 px-2 gap-2 md:gap-4 sm:px-12 sm:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 justify-center justify-items-center container mx-auto overflow-hidden `}  >
      {userUrls.map((image, index) => {
        return <Photo key={index} {...image} />;
      })}
    </div>
  );
};

export default Photos;
