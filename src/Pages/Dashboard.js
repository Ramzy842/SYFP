import React, { useEffect, useState } from "react";
import FullPic from "../Components/FullPic";
import Navbar from "../Components/Navbar";
import Photos from "../Components/Photos";
import UploadForm from "../Components/UploadForm";
import GlobalContext from "../Context";

const Dashboard = () => {
  const { getUrls, currentUser, fullPicture } = GlobalContext();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const asyncGetUrls = async () => {
      setLoading(true);
      await getUrls(currentUser.uid);
      setLoading(false);
    };

    asyncGetUrls();
  }, [getUrls, currentUser]);

  return (
    <div className="bg-blue-fourth min-h-screen relative">
      <Navbar />
      <UploadForm />
      {loading ? (
        <h1 className="text-center text-2xl">Loading...</h1>
      ) : (
        <Photos />
      )}
      {fullPicture && <FullPic />}
    </div>
  );
};

export default Dashboard;
