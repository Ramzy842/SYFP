import React, { useEffect, useState } from "react";
import FullPic from "../Components/FullPic";

import Photos from "../Components/Photos";
import UploadForm from "../Components/UploadForm";
import GlobalContext from "../Context";

const Dashboard = () => {
  const {
    getUrls,
    currentUser,
    fullPicture,
    notice,
    setLoadingHero,
    setIsDashboard,
  } = GlobalContext();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = "SYFP | DASHBOARD";
  }, []);

  useEffect(() => {
    const asyncGetUrls = async () => {
      setLoading(true);
      await getUrls(currentUser.uid);
      setLoading(false);
    };

    asyncGetUrls();
  }, [getUrls, currentUser]);
  useEffect(() => {
    setLoadingHero(false);
    setIsDashboard(true);
  }, [setLoadingHero, setIsDashboard]);

  return <div
      className={`bg-blue-fourth 
      relative`}
    >
      <UploadForm />
      {notice && (
        <h2
          key={notice.color}
          className="bg-green-500 text-black inline-block p-2 mb-4 relative left-1/2 transform -translate-x-1/2 text-sm font- rounded-md shadow-md"
        >
          {notice.note}
        </h2>
      )}
      {loading ? (
        <h1 className="text-center text-2xl">Loading...</h1>
      ) : (
        <>
          <Photos />
          {fullPicture && (<FullPic />)}
        </>
      )}
    </div>
  
};

export default Dashboard;
