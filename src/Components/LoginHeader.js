import React from "react";
import { Link } from "react-router-dom";
import {motion} from "framer-motion"

const LoginHeader = () => {
  return (
    <motion.article className="  flex items-center justify-center flex-col p-2 ">
      <Link to="/" className=" text-5xl mb-3 ">
        <p > SYFP</p>
      </Link>
      <p className=" text-md sm:text-xl capitalize">
        Store your favorite photos for free
      </p>
    </motion.article>
  );
};

export default LoginHeader;