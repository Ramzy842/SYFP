import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import syfp from "../assets/logos/syfp_mobile_1.svg";
import syfp_rounded from "../assets/logos/syfp_mobile_2.svg";
import Navbar from "../Components/Navbar";
import GlobalContext from "../Context";
import AOS from 'aos';
import 'aos/dist/aos.css';
import 'animate.css';

const MainLayout = ({ children }) => {
  useEffect(() => {
    AOS.init();
  }, [])
  const { loadingHero, isDashboard, fullPicture } = GlobalContext();
  return (
    <div className={`bg-gradient-to-br ${fullPicture ? "from-dark1 to-dark2" : "from-blue1 to-blue2"}  ${loadingHero &&  "from-dark1 to-dark2"} min-h-screen z-50`}>
      <div className="flex items-center justify-between lg:justify-start z-50 transition">
        <Link to="/">
          <img
            src={loadingHero ? syfp : syfp_rounded}
            alt="syfp_logo"
            className="p-2 outline-none lg:hidden transition z-50  "
          />
        </Link>
        <Link to="/">
          <img
            src={syfp}
            alt="syfp_logo"
            className=" outline-none hidden lg:flex transition z-50"
          />
        </Link>
        {isDashboard && <Navbar />}
      </div>

      
      {children}
    </div>
  );
};

export default MainLayout;
