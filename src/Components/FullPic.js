import React from "react";
import GlobalContext from "../Context";

const FullPic = () => {
  const { fullPicture, setFullPicture } = GlobalContext();
  const adjustBg = (e) => {
    if (e.target.classList.contains("fullPicture")) return;
    setFullPicture(null);
  };
  return (
    <div
      onClick={adjustBg}
      className="absolute inset-0 bg-gray-500 w-screen h-screen flex justify-center items-center overflow-hidden"
    >
      <img src={fullPicture} className="fullPicture" alt="" />
    </div>
  );
};

export default FullPic;
