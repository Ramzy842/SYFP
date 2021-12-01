import React from "react";
import { AiFillDelete } from "react-icons/ai";
import { doc, deleteDoc } from "firebase/firestore";
import { firestore } from "../firebase.config";
import GlobalContext from "../Context";
import { storage } from "../firebase.config";
import { ref, deleteObject } from "firebase/storage";
import { motion } from "framer-motion";

const Photo = ({ id, data }) => {
  const { currentUser, userUrls, setUserUrls, setFullPicture, setNotice } =
    GlobalContext();

  const deleteImgHandler = async (uid, id, name) => {
    const handleTimeout = () => setNotice("");
    let newUrls = userUrls.filter((image) => image.id !== id);
    await deleteDoc(doc(firestore, `users/user_${uid}/images/`, id));
    const imageRef = ref(storage, `users/user_${uid}/images/${name}`);
    deleteObject(imageRef)
      .then(() => {
        // File deleted successfully

        setNotice({ color: "#6EE7B7", note: "Image deleted successfully!" });
        setUserUrls(newUrls);
      })
      .catch((error) => {
        // Uh-oh, an error occurred!
        console.log(error);
        setNotice({
          color: "#EA3C53",
          note: "Couldn't delete Image. Please try again!",
        });
      })
      .finally(() => {
        clearTimeout(handleTimeout);
        setTimeout(handleTimeout, 3000);
      });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.5 } }}
      className="border-4 border-blue-secondary flex flex-col pb-2"
    >
      <img
        src={data.downloadURL}
        className=" cursor-pointer h-36 w-36 sm:h-44 sm:w-44 md:h-52 md:w-52 lg:h-72 lg:w-72"
        alt={data.name}
        onClick={() => setFullPicture(data.downloadURL)}
      />
      <AiFillDelete
        onClick={() => deleteImgHandler(currentUser.uid, id, data.name)}
        className="bg-blue-primary text-blue-third self-end mt-2 w-6 h-6 mr-2 cursor-pointer hover:bg-blue-secondary hover:text-blue-primary"
      />
    </motion.div>
  );
};

export default Photo;
