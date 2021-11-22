import React, { useEffect } from "react";
import Navbar from "../Components/Navbar";
import Photos from "../Components/Photos";
import UploadForm from "../Components/UploadForm";
import GlobalContext from "../Context";

const Dashboard = () => {
  const { getUrls, currentUser } = GlobalContext();

  useEffect(() => {
    
    getUrls(currentUser.uid);
    
  }, [getUrls, currentUser]);

  return (
    <div className="dashboard bg-blue-fourth min-h-screen">
      <Navbar />
      <UploadForm />
      <Photos />
    </div>
  );
};

export default Dashboard;
