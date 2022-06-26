import React, { useRef, useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";

import { createUserWithEmailAndPassword } from "firebase/auth";
import GlobalContext from "../Context";

import signin from "../assets/icons/signin.svg";
import github from "../assets/icons/github.svg";

const SignUp = () => {
  const emailRef = useRef(null);
  const pwRef = useRef(null);
  const pwConfirmRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [pwConfirm, setPwConfirm] = useState("");
  const [error, setError] = useState("");
  const { auth, loginVariants, setLoadingHero } = GlobalContext();
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
    if (pw === pwConfirm && _isMounted.current) {
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
            setError(" Your password should be at least 6 characters long");
            setTimeout(() => {
              setError("");
            }, 4000);
          } else if (_isMounted.current) {
            setLoading(false);
            setError("This email is already in use");
            setTimeout(() => {
              setError("");
            }, 3000);
          }

          // ..
        });
    } else if (_isMounted.current && pw !== pwConfirm) {
      setLoading(false);
      setError("Please make sure your passwords match");
      setTimeout(() => {
        setError("");
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
      <form action="" className="container sm:w-1/2 lg:w-1/3 max-w-4xl mx-auto px-4" data-aos="fade-in">
        <input
          type="text"
          placeholder="Email"
          className="bg-input h-12 rounded-md pl-4 w-full mb-4 placeholder:text-main placeholder:font-extralight shadow-md outline-focus"
          required
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="text"
          placeholder="Password"
          className="bg-input h-12 rounded-md pl-4 w-full mb-4 placeholder:text-main placeholder:font-extralight shadow-md outline-focus"
          required
          onChange={(e) => setPw(e.target.value)}
        />
        <input
          type="text"
          placeholder="Confirm Password"
          className="bg-input h-12 rounded-md pl-4 w-full placeholder:text-main placeholder:font-extralight shadow-md outline-focus"
          required
          onChange={(e) => setPwConfirm(e.target.value)}
        />
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
