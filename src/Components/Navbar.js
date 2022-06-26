import React, { useState } from "react";

import GlobalContext from "../Context";
import { signOut } from "firebase/auth";
import user from "../assets/icons/user.svg";
import logout from "../assets/icons/log-out.svg";
import logout2 from "../assets/icons/logout2.svg";

import lostPart from "../assets/misc/lostPart.svg";

const Navbar = () => {
  const { currentUser, auth, setUserUrls, setIsDashboard, setFullPicture } = GlobalContext();
  const [showSignOutBtn, setShowSignOutBtn] = useState(false);
  const handleLogout = () => {
    setFullPicture(false)
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        setUserUrls([]);
        setIsDashboard(false);
      })
      .catch((error) => {
        // An error happened.
        
      });
  };
  return (
    <nav className="  flex flex-col lg:flex-row  lg:justify-between lg:items-center items-end w-full  overflow-hidden ">
      <div
        data-aos="fade-left"
        className="overflow-hidden flex bg-main lg:bg-transparent rounded-2xl pl-4 pr-2 py-1 justify-evenly rounded-r-none items-center cursor-pointer lg:cursor-default	"
        onClick={() => setShowSignOutBtn(!showSignOutBtn)}
      >
        <img src={user} alt="user" className="h-7 w-7 order-2 lg:order-none"  />
        <p className="text-white mr-2 lg:ml-3 font-semibold lg:font-bold  lg:text-lg lg:tracking-wider " >
          {currentUser && currentUser.email}
        </p>
        
      </div>

      {showSignOutBtn && (
        <button
          className="bg-white  items-center px-4 py-1  flex justify-end log-out relative lg:hidden"
          onClick={handleLogout}
        >
          <img src={lostPart} alt="lostpart" className=" absolute left-0 bottom-0 top-0 outline-none h-full" />
          Sign Out <img src={logout} className="ml-2" alt="logout" />
        </button>
      )}
      <button
          className=" text-white font-medium font-poppins items-center px-4 py-2 rounded-md  justify-end log-out relative hidden lg:flex mr-16  transition hover:bg-main border hover:border-transparent	text-base	"
          onClick={handleLogout}
        >
          
          Sign Out <img src={logout2} className="ml-2  " alt="logout" />
        </button>
      

    </nav>
  );
};

export default Navbar;
