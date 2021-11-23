import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import Photos from "../Components/Photos";
import UploadForm from "../Components/UploadForm";
import GlobalContext from "../Context";

const Dashboard = () => {
  const { getUrls, currentUser } = GlobalContext();
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
    <div className="dashboard bg-blue-fourth min-h-screen">
      <Navbar />
      <UploadForm />
      {loading ? (
        <h1 className="text-center text-2xl">Loading...</h1>
      ) : (
        <Photos />
      )}
    </div>
  );
};

export default Dashboard;
