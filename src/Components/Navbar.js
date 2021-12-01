import React from "react";
import { Link } from "react-router-dom";
import GlobalContext from "../Context";
import { signOut } from "firebase/auth";

const Navbar = () => {
  const { currentUser, auth, setUserUrls } = GlobalContext();

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        setUserUrls([]);
      })
      .catch((error) => {
        // An error happened.
        console.log(error);
      });
  };
  return (
    <nav className="flex justify-between  flex-col sm:flex-row sm:px-4 items-center px-4 py-2 bg-blue-primary">
      <Link
        to="/dashboard"
        className="text-4xl lg:text-4xl mb-3 sm:mb-0 text-blue-third tracking-widest"
      >
        SYFP
      </Link>
      <div className="user-details flex justify-end text-md sm:text-md md:text-xl lg:text-xl items-center w-full font-semibold tracking-wider sm:w-auto">
        <p className="text-white">{currentUser && currentUser.email}</p>
        <button
          className=" px-4 py-1 text-blue-secondary border-4 border-blue-third  hover:text-blue-fourth rounded-lg hover:bg-blue-secondary bg-blue-fourth font-bold ml-4"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
