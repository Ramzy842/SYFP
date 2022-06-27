import React, { useRef, useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";

import { createUserWithEmailAndPassword } from "firebase/auth";
import GlobalContext from "../Context";

import signin from "../assets/icons/signin.svg";
import github from "../assets/icons/github.svg";

const SignUp = () => {
  
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [pwConfirm, setPwConfirm] = useState("");
  const [error, setError] = useState("");
  const [emailErr, setEmailErr] = useState("");
  const [pwErr, setPwErr] = useState("");
  const [pwConfErr, setPwConfErr] = useState("");
  const { auth, setLoadingHero } = GlobalContext();
  const history = useHistory();

  const _isMounted = useRef(true);

  useEffect(() => {
    document.title = "SYFP | SIGN UP";
  }, []);

  useEffect(() => {
    return () => {
      _isMounted.current = false;
    };
  }, []);
  useEffect(() => {
    setLoadingHero(false);
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (email.length === 0) {
      setPwErr("");
      setPwConfErr("");
      setEmailErr("Please Enter an Email");
      setTimeout(() => {
        setEmailErr("");
      }, 4000);
    } else if (pw.length === 0) {
      setEmailErr("");
      setPwConfErr("");
      setPwErr("Please Enter a Password");
      setTimeout(() => {
        setPwErr("");
      }, 4000);
    } 
    else if (pwConfirm.length === 0) {
      setEmailErr("");
      setPwErr("");
      setPwConfErr("Please Confirm Your Password");
      setTimeout(() => {
        setPwConfErr("");
      }, 4000);
    }
    else if (pw === pwConfirm && _isMounted.current) {
      setLoading(true);

      await createUserWithEmailAndPassword(auth, email, pw)
        .then((userCredential) => {
          if (_isMounted.current) {
            // Signed in
            setLoading(false);
            setEmail("");
            setPw("");
            setPwConfirm("");
            history.push("/dashboard");
          }
        })
        .catch(() => {
          if (_isMounted.current && pw.length < 6 && pwConfirm.length < 6) {
            setLoading(false);
            setEmailErr("");
            setPwConfErr("")
            setPwErr("Your password should be at least 6 characters long");
            setTimeout(() => {
              setPwErr("");
            }, 4000);
          } else if (_isMounted.current) {
            setLoading(false);
            
            setPwConfErr("")
            setPwErr("");
            setEmailErr("This email is either already in use or isn't valid");
            setTimeout(() => {
              setEmailErr("");
            }, 3000);
          }

          // ..
        });
    } else if (_isMounted.current && pw !== pwConfirm) {
      setLoading(false);
      setPwConfErr("Please make sure your passwords match");
      setTimeout(() => {
        setPwConfErr("");
      }, 3000);
    }
  };

  return (
    <div>
      <a
        href="https://github.com/Ramzy842/SYFP"
        className="group absolute top-4 right-4 lg:right-12 bg-gradient-to-br from-github1 to-github2 p-2 lg:p-3 rounded-full"
      >
        <img src={github} alt="github" />
      </a>
      <div className="lg:flex lg:flex-col   justify-center items-center">
        <form
          action=""
          className="container sm:w-1/2 lg:w-1/3 max-w-4xl mx-auto px-4"
          data-aos="fade-in"
        >
          {error && (
            <p className="text-red-600 text-center px-8 max-w-4xl mb-4 mx-auto ">
              {error}
            </p>
          )}
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
          <div id="password">
            <input
              type="password"
              placeholder="Password"
              className="bg-input h-12 rounded-md pl-4 w-full mb-4 placeholder:text-main placeholder:font-extralight shadow-md outline-focus"
              required
              onChange={(e) => setPw(e.target.value)}
            />
            {pwErr && (
              <p className="text-red-600  max-w-4xl mb-4 mx-auto ">{pwErr}</p>
            )}
          </div>
          <div>
            <input
              type="password"
              placeholder="Confirm Password"
              className="bg-input h-12 rounded-md pl-4 w-full placeholder:text-main placeholder:font-extralight shadow-md outline-focus"
              required
              onChange={(e) => setPwConfirm(e.target.value)}
            />
            {pwConfErr && (
              <p className="text-red-600  max-w-4xl mb-4 mx-auto ">{pwConfErr}</p>
            )}
          </div>

          <div className="flex justify-between mt-5">
            <p className="w-36 text-white text-sm">
              Already have an account?{" "}
              <Link to="/" className="underline">
                Sign In
              </Link>
            </p>

            <button
              type="submit"
              className=" flex items-center bg-form-btn rounded-md p-2 shadow-md text-base font-semibold text-white "
              onClick={handleSubmit}
            >
              Sign Up <img src={signin} className="w-6 h-6 ml-2" alt="signin" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
