/* eslint-disable default-case */
import React, { useState, useRef, useEffect } from "react";
import { storage, firestore } from "../firebase.config";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";
import { AiOutlineUpload } from "react-icons/ai";
import GlobalContext from "../Context";

const UploadForm = () => {
  const [progress, setProgress] = useState(0);
  let _isMounted = useRef(true);
  const { getUrls, currentUser } = GlobalContext();
  const [flag, setFlag] = useState("");
  const fileUploadRef = useRef(null);

  useEffect(() => {
    return () => {
      _isMounted.current = false;
    };
  }, []);

  // 'file' comes from the Blob or File API
  const handleChange = (e) => {
    if (e.target.files[0]) {
      if (
        e.target.files[0].type === "image/jpeg" ||
        e.target.files[0].type === "image/png"
      ) {
        console.log(e.target.files[0]);
        setFlag('Uploading...')
        uploadFile(e.target.files[0]);
        
      } else {
        setFlag("The file you're trying to upload is not an image")
        setTimeout(() => {
          setFlag('')
        }, 3000)
      }
    }
  };

  const uploadUrl = async (url) => {
    // Add a new document with a generated id.
    if (_isMounted.current) {
      const docRef = await addDoc(
        collection(firestore, `users/user_${currentUser.uid}/images`),
        {
          downloadURL: url,
        }
      );
      console.log("Document written with ID: ", docRef.id);
    }
  };

  const uploadFile = (file) => {
    if (_isMounted.current) {
      const imagesRef = ref(
        storage,
        `users/user_${currentUser.uid}/images/${file.name}`
      );
      const uploadTask = uploadBytesResumable(imagesRef, file);

      // Register three observers:
      // 1. 'state_changed' observer, called any time the state changes
      // 2. Error observer, called on failure
      // 3. Completion observer, called on successful completion
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Observe state change events such as progress, pause, and resume
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setProgress(progress);
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
          }
        },
        (error) => {
          // Handle unsuccessful uploads
        },
        () => {
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            if (_isMounted.current) {
              setProgress(0);
              console.log("File available at", downloadURL);
              uploadUrl(downloadURL);
              getUrls(currentUser.uid);
              setFlag("")
            }
          });
        }
      );
    }
  };


  return (
    <form className="photos flex max-w-full flex-col items-center my-6">
      <input
        style={{ display: "none" }}
        type="file"
        onChange={handleChange}
        ref={fileUploadRef}
        className="rounded-full w-12 h-12 bg-blue-primary flex items-center mb-2"
      />
      <button
        className="p-2 text-2xl lg:text-4xl hover:bg-blue-primary hover:text-blue-third"
        onClick={(e) => {
          e.preventDefault();
          fileUploadRef.current.click();
        }}
        style={{ border: "2px solid" }}
      >
        <AiOutlineUpload />
      </button>
      <h1 className="text-center mt-4">{flag}</h1>
      <div
        className="progress h-1 bg-blue-primary"
        style={{ width: `${progress}%`, maxWidth: "80%"}}
      ></div>
    </form>
  );
};

export default UploadForm;
