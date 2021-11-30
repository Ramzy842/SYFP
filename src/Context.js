import React, { useCallback, useContext, useEffect, useState } from "react";
import { getDocs, collection } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { firestore } from "./firebase.config";

const AppContext = React.createContext();

export const AppProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState();
  const [userUrls, setUserUrls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fullPicture, setFullPicture] = useState(null);
  const auth = getAuth();
  const [isSmall, setIsSmall] = useState(
    window.innerWidth >= 640 ? true : false
  );


  let headerVariants = isSmall
    ? {
        hidden: {
          y: "100vh",
        },
        visible: {
          y: 0,
          transition: {
            duration: 1,
          },
        },
      }
    : {
        hidden: {
          x: "100vw",
        },
        visible: {
          x: 0,
          transition: {
            duration: 1,
          },
        },
      };
      let loginVariants = isSmall ? {
        hidden: {
          y : "-100vh"
        },
        visible :{
          y: 0,
          transition: {
            duration: 1
          }
        }
      } : {
        hidden: {
          x : "-100vw"
        },
        visible :{
          x: 0,
          transition: {
            duration: 1
          }
        }
      }
  

  useEffect(() => {
    let unsub = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsub;
  }, [auth]);

  const getUrls = useCallback(
    async (uid) => {
      const querySnapshot = await getDocs(
        collection(firestore, `users/user_${uid}/images`)
      );
      setUserUrls([]);
      querySnapshot.forEach((doc) => {
        setUserUrls((userUrls) => [
          ...new Set([...userUrls, { data: doc.data(), id: doc.id }]),
        ]);
      });
    },

    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentUser]
  );

  return (
    <AppContext.Provider
      value={{
        getUrls,
        auth,
        currentUser,
        setCurrentUser,
        userUrls,
        setUserUrls,
        loading,
        setLoading,
        fullPicture,
        setFullPicture,
        headerVariants,
        loginVariants
      }}
    >
      {!loading && children}
    </AppContext.Provider>
  );
};

const GlobalContext = () => {
  return useContext(AppContext);
};

export default GlobalContext;
