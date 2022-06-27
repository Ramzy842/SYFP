import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

import { signInWithEmailAndPassword } from "firebase/auth";
import GlobalContext from "../Context";

import github from "../assets/icons/github.svg";
import signin from "../assets/icons/signin.svg";
import demo from "../assets/icons/demo_acc.svg";

const Login = () => {
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [emailErr, setEmailErr] = useState("");
  const [pwErr, setPwErr] = useState("");
  const [loading, setLoading] = useState(false);

  const { auth, setUserUrls, loadingHero, setLoadingHero } = GlobalContext();

  const _ismounted = useRef(true);
  const [error, setError] = useState("");

  useEffect(() => {
    document.title = "SYFP";
  }, []);

  useEffect(() => {
    return () => {
      _ismounted.current = false;
    };
  }, []);

  const demoAccHandler = async () => {
    setLoading(true);
    await signInWithEmailAndPassword(
      auth,
      process.env.REACT_APP_DEMO_ACC_EMAIL,
      process.env.REACT_APP_DEMO_ACC_PASSWORD
    )
      .then(() => {
        if (_ismounted.current) {
          try {
            // Signed in
            setLoading(false);
            setEmail("");
            setPw("");
          } catch (error) {}
        }
      })
      .catch(() => {})
      .finally(() => {
        if (_ismounted.current) {
          setLoading(false);
        }
      });
  };

  useEffect(() => {
    setUserUrls([]);
  }, [setUserUrls]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (email.length === 0) {
      setPwErr("")
      setEmailErr("Please Enter an Email");
      setTimeout(() => {
        setEmailErr("");
      }, 4000);
    } else if (pw.length === 0) {
      setEmailErr("")
      setPwErr("Please Enter a Password");
      setTimeout(() => {
        setPwErr("");
      }, 4000);
    } else {
      await signInWithEmailAndPassword(auth, email, pw)
        .then(() => {
          if (_ismounted.current) {
            try {
              // Signed in

              setEmail("");
              setPw("");
            } catch (error) {}
          }
        })
        .catch(() => {
          if (_ismounted.current) {
            setEmailErr("")
            setPwErr("")
            setError(
              "A user with this email does not exist or your password might be wrong"
            );
            setTimeout(() => {
              setError("");
            }, 5000);
          }
        })
        .finally(() => {
          if (_ismounted.current) {
            setLoading(false);
          }
        });
    }
  };
  useEffect(() => {
    setTimeout(() => {
      setLoadingHero(false);
    }, 2000);
  });

  return (
    <>
      <a
        href="https://github.com/Ramzy842/SYFP"
        className="group absolute top-4 right-4 lg:right-12 bg-gradient-to-br from-github1 to-github2 p-2 lg:p-3 rounded-full"
      >
        <img src={github} alt="github" />
      </a>
      {loadingHero ? (
        <div className="flex flex-col h-screen absolute top-0 bottom-0 w-full z-20">
          <div className=" w-full h-full flex items-center justify-center  z-20 ">
            <h1
              className="font-semibold text-center text-2xl lg:text-4xl text-white font-default mx-4 z-20 "
              data-aos="fade-up"
            >
              Store Your Favorite Photos For Free
            </h1>
          </div>
        </div>
      ) : (
        <div className=" lg:flex lg:flex-col   justify-center items-center ">
          {error && (
                <p className="text-red-600 text-center px-8 max-w-4xl mb-4 mx-auto ">
                  {error}
                </p>
              )}
          <form
            action=""
            className="container sm:w-1/2 lg:w-1/3 max-w-4xl mx-auto px-4"
            data-aos="fade-in"
          >
            <div id="email">
              <input
                type="text"
                placeholder="Email"
                className="bg-input h-12 rounded-md pl-4 w-full mb-4 placeholder:text-main placeholder:font-extralight shadow-md outline-focus"
                required
                onChange={(e) => setEmail(e.target.value)}
              />
              {emailErr && (
                <p className="text-red-600  max-w-4xl mb-4 mx-auto ">
                  {emailErr}
                </p>
              )}
            </div>
            <div>
              <input
                type="password"
                placeholder="Password"
                className="bg-input h-12 rounded-md pl-4 w-full mb-4 placeholder:text-main placeholder:font-extralight shadow-md outline-focus"
                required
                onChange={(e) => setPw(e.target.value)}
              />
              {pwErr && (
                <p className="text-red-600  max-w-4xl mb-4 mx-auto ">
                  {pwErr}
                </p>
              )}
            </div>

            <div className="flex justify-between mt-5">
              <p className="w-40 text-white text-sm">
                Don’t have an account?{" "}
                <Link to="/signup" className="underline">
                  Sign up
                </Link>
              </p>

              <button
                type="submit"
                className=" flex items-center bg-form-btn rounded-md p-2 shadow-md text-base font-semibold text-white "
                onClick={handleSubmit}
              >
                Sign In <img src={signin} className="w-6 h-6" alt="signin" />
              </button>
            </div>
            <div className="w-full h-1 bg-input mt-6"></div>
            <p className="text-base font-medium my-5 text-white text-center">
              Wanna try without signin in?
            </p>
            <button
              type="button"
              onClick={demoAccHandler}
              className=" flex items-center bg-form-btn rounded-md p-2 shadow-md text-base font-semibold text-white mx-auto "
            >
              Demo Account{" "}
              <img src={demo} className="w-6 h-6 ml-2" alt="signin" />
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default Login;
