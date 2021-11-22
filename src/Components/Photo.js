import React from "react";

const Photo = ({img}) => {
  return <img src={img} className="h-36 w-36 sm:h-44 sm:w-44 md:h-52 md:w-52 lg:h-72 lg:w-72" alt="" />
};

export default Photo;