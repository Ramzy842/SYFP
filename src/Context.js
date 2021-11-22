import React, { useCallback, useContext, useEffect, useState } from "react";
import { getDocs, collection } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { firestore } from "./firebase.config";

const AppContext = React.createContext();

export const AppProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState();
  const [userUrls, setUserUrls] = useState([]);
  const [loading, setLoading] = useState(true);
  const auth = getAuth();
  

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
  
        querySnapshot.forEach((doc) => {
          
          setUserUrls((userUrls) => [
            ...new Set([...userUrls, doc.data().downloadURL]),
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
