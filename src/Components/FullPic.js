import React from "react";

import GlobalContext from "../Context";
import x from "../assets/icons/x-circle.svg"

const FullPic = () => {
  const { fullPicture, setFullPicture } = GlobalContext();

  const adjustBg = (e) => {
    if (e.target.classList.contains("fullPicture")) return;
    setFullPicture(null);
  };

  return (
    <div
      onClick={adjustBg}
      className=" backdrop-filter backdrop-blur-lg fixed bottom-0 top-0 right-0 left-0 flex justify-center mx-auto items-center p-12 w-full h-full "
    >
      <div className="justify-center items-center relative h-auto sm:h-96 w-auto lg:h-500 " data-aos='fade-in'>
        <img
          src={fullPicture}
          className="  shadow-lg w-auto sm:h-96 h-auto lg:h-500 "
          alt=""
        />
        <img src={x} alt="exit" className="absolute top-2 right-2 cursor-pointer w-6 h-6"   />
      </div>
    </div>
  );
};

export default FullPic;
