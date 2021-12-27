import { motion, AnimatePresence } from "framer-motion";
import React from "react";

import GlobalContext from "../Context";

let soloPictureVariant = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      when: "beforeChildren",
    },
  },
  exit: {
    transition: {
      when: "afterChildren",
    },
  },
};

const FullPic = () => {
  const { fullPicture, setFullPicture } = GlobalContext();

  const adjustBg = (e) => {
    if (e.target.classList.contains("fullPicture")) return;
    setFullPicture(null);
  };

  return (
    <AnimatePresence>
      <motion.div
        variants={soloPictureVariant}
        onClick={adjustBg}
        className="absolute inset-0 bg-gray-500 w-screen h-screen flex justify-center  items-center overflow-hidden"
      >
        <motion.img
          initial={{ scale: 0 }}
          animate={{ scale: 1, transition: { duration: 0.3 } }}
          exit={{ scale: 0 }}
          src={fullPicture}
          className="fullPicture w-4/5 h-4/5 "
          alt=""
        />
      </motion.div>
    </AnimatePresence>
  );
};

export default FullPic;
