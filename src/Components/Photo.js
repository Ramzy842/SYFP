import React from "react";
import { AiFillDelete } from "react-icons/ai";
import { doc, deleteDoc } from "firebase/firestore";
import { firestore } from "../firebase.config";
import GlobalContext from "../Context";
import { storage } from "../firebase.config";
import { ref, deleteObject } from "firebase/storage";

const Photo = ({ id, data, name }) => {
  const { currentUser, userUrls, setUserUrls } = GlobalContext();

  const deleteImgHandler = async (uid, id, name) => {
    let newUrls = userUrls.filter((image) => image.id !== id);
    await deleteDoc(doc(firestore, `users/user_${uid}/images/`, id));
    const imageRef = ref(storage, `users/user_${uid}/images/${name}`);
    deleteObject(imageRef)
      .then(() => {
        // File deleted successfully
        console.log("file deleted");
      })
      .catch((error) => {
        // Uh-oh, an error occurred!
        console.log(error);
      });

    setUserUrls(newUrls);
  };

  return (
    <div className="border-4 border-blue-secondary flex flex-col pb-2">
      <img
        src={data.downloadURL}
        className="h-36 w-36 sm:h-44 sm:w-44 md:h-52 md:w-52 lg:h-72 lg:w-72"
        alt={data.name}
      />
      <AiFillDelete
        onClick={() => deleteImgHandler(currentUser.uid, id, data.name)}
        className="bg-blue-primary text-blue-third self-end mt-2 w-6 h-6 mr-2 cursor-pointer hover:bg-blue-secondary hover:text-blue-primary"
      />
    </div>
  );
};

export default Photo;
