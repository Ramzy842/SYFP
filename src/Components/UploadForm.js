/* eslint-disable default-case */
import React, { useState, useRef, useEffect } from "react";
import { storage, firestore } from "../firebase.config";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";

import GlobalContext from "../Context";
import { v4 as uuidv4 } from "uuid";

import uploadMobile from "../assets/icons/upload_mobile.svg";
const UploadForm = () => {
  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const _isMounted = useRef(true);
  const { getUrls, currentUser } = GlobalContext();
  const fileUploadRef = useRef();

  const [flag, setFlag] = useState("");

  useEffect(() => {
    return () => {
      _isMounted.current = false;
    };
  }, []);

  // 'file' comes from the Blob or File API
  const handleChange = (e) => {
    let selected = e.target.files[0];

    if (selected && _isMounted.current) {
      if (selected.type === "image/jpeg" || selected.type === "image/png") {
        setUploading(true);
        setFlag("Uploading...");

        uploadFile(selected);
      } else {
        setFlag("The file you're trying to upload is not an image");
        setTimeout(() => {
          if (_isMounted.current) {
            setFlag("");
          }
        }, 3000);
      }
    }
  };

  const uploadUrl = async (url, filename) => {
    // Add a new document with a generated id.
    if (_isMounted.current) {
      // eslint-disable-next-line no-unused-vars
      const docRef = await addDoc(
        collection(firestore, `users/user_${currentUser.uid}/images`),
        {
          downloadURL: url,
          name: filename,
        }
      );
    }
  };

  const uploadFile = async (file) => {
    const id = uuidv4();
    const imagesRef = ref(
      storage,
      `users/user_${currentUser.uid}/images/${file.name}_${id}`
    );
    if (!_isMounted.current) return;

    let uploadTask = uploadBytesResumable(imagesRef, file);

    // Register three observers:
    // 1. 'state_changed' observer, called any time the state changes
    // 2. Error observer, called on failure
    // 3. Completion observer, called on successful completion

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        if (_isMounted.current) {
          // Observe state change events such as progress, pause, and resume
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setProgress(progress);
        }
      },
      (error) => {
        // Handle unsuccessful uploads
        console.log(
          "Due to some error, we couldn't upload your image, please try again."
        );
      },
      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          if (_isMounted.current) {
            setProgress(0);

            uploadUrl(downloadURL, `${file.name}_${id}`);
            getUrls(currentUser.uid);
            setFlag("");
            setUploading(false);

            fileUploadRef.current.value = "";
          }
        });
      }
    );
  };

  return (
    <form className="photos flex max-w-full flex-col items-center ">
      <input
        style={{ display: "none" }}
        type="file"
        onChange={handleChange}
        ref={fileUploadRef}
        className="rounded-full w-12 h-12 bg-blue-primary flex items-center"
      />
      <button
        className="p-2 text-2xl lg:text-4xl hover:bg-blue-primary hover:text-blue-third"
        onClick={(e) => {
          e.preventDefault();
          fileUploadRef.current.click();
        }}
      >
        <img src={uploadMobile} alt="upload mobile" />
      </button>
      <h1 className={`text-center `}>{flag}</h1>

      <div
        className={` h-1 bg-gray-300 flex ${
          uploading && "w-4/5"
        } my-4 justify-start`}
      >
        <div className={`${progress <= 50 ? "w-1/2" : "w-full"}  h-1  bg-blue-600 transition`}></div>
      </div>
    </form>
  );
};

export default UploadForm;
