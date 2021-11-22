import React from "react";
import { Link, useHistory } from "react-router-dom";
import GlobalContext from "../Context";
import { signOut } from "firebase/auth";

const Navbar = () => {
  const { currentUser, auth, setUserUrls } = GlobalContext();
  const history = useHistory();
  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        setUserUrls([]);
        history.push("/");
      })
      .catch((error) => {
        // An error happened.
        console.log(error);
      });
  };
  return (
    <nav className="flex justify-between flex-col sm:flex-row items-center px-4 py-2 bg-blue-primary">
      <Link to="/dashboard" className="text-4xl lg:text-5xl mb-3 text-blue-third">
        SYFP
      </Link>
      <div className="user-details flex justify-end text-md sm:text-md md:text-xl lg:text-2xl items-center w-full font-semibold tracking-wider sm:w-auto">
        
        <p className="" style={{ color: "#fff" }}>
          {currentUser && currentUser.email}
        </p>
        <button
          className=" px-4 py-1 text-blue-secondary border-2 bg-blue-fourth font-bold ml-4"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
