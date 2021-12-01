import { motion, AnimatePresence } from "framer-motion";
import React, { useEffect, useState } from "react";
import FullPic from "../Components/FullPic";
import Navbar from "../Components/Navbar";
import Photos from "../Components/Photos";
import UploadForm from "../Components/UploadForm";
import GlobalContext from "../Context";

const Dashboard = () => {
  const { getUrls, currentUser, fullPicture, notice } = GlobalContext();
  const [loading, setLoading] = useState(true);
  let variant = {
    init: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { y: 1000 },
  };

  useEffect(() => {
    document.title = "SYFP | DASHBOARD"
  }, []);

  useEffect(() => {
    const asyncGetUrls = async () => {
      setLoading(true);
      await getUrls(currentUser.uid);
      setLoading(false);
    };

    asyncGetUrls();
  }, [getUrls, currentUser]);

  return fullPicture ? (
    <FullPic />
  ) : (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={`bg-blue-fourth min-h-screen
      relative`}
    >
      <Navbar />
      <UploadForm />
      {notice && (
        <AnimatePresence>
          <motion.h2
            key={notice.color}
            style={{ backgroundColor: `${notice.color}` }}
            variants={variant}
            className="text-black inline-block p-2 mb-2 relative left-1/2 transform -translate-x-1/2 text-xl"
            initial="init"
            animate="visible"
          >
            {notice.note}
          </motion.h2>
        </AnimatePresence>
      )}
      {loading ? (
        <h1 className="text-center text-2xl">Loading...</h1>
      ) : (
        <Photos />
      )}
    </motion.div>
  );
};

export default Dashboard;
