import React from "react";
import { Link } from "react-router-dom";

const LoginHeader = () => {
  return (
    <article className="  flex items-center justify-center flex-col p-2 ">
      <p>
        <Link to="/" className=" text-5xl mb-3 ">
          SYFP
        </Link>
      </p>

      <p className=" text-md sm:text-xl capitalize">
        Store your favorite photos for free
      </p>
    </article>
  );
};

export default LoginHeader;
