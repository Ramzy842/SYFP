import React, { useRef, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import Footer from "../Components/Footer";
import { createUserWithEmailAndPassword } from "firebase/auth";
import GlobalContext from "../Context";
import LoginHeader from "../Components/LoginHeader";

const SignUp = () => {
  const emailRef = useRef(null);
  const pwRef = useRef(null);
  const pwConfirmRef = useRef(null);
  const [loading,setLoading] = useState(false)
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [pwConfirm, setPwConfirm] = useState("");
  const { auth} = GlobalContext();
  const history = useHistory()
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (pw === pwConfirm) {
      setLoading(true);

      await createUserWithEmailAndPassword(auth, email, pw)
        .then((userCredential) => {
          // Signed in
          setLoading(false);
          setEmail("");
          setPw("");
          setPwConfirm("");
          history.push("/dashboard")
        })
        .catch((error) => {
          setLoading(false);
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode);
          console.log(errorMessage);
          // ..
        });
    }
    
  };

  return (
    <section className="login font-default min-h-screen bg-blue-third text-blue-primary grid sm:grid-cols-2">
      <LoginHeader />
      <article className="sm:justify-center sm:min-h-screen bg-blue-secondary sm:flex sm:flex-col sm:border-l-8">
        <h1 className="bg-blue-primary sm:bg-transparent w-full text-2xl text-center text-blue-third py-2 mb-4 sm:justify-self-start font-bold tracking-widest sm:text-3xl">
          Sign up
        </h1>
        <form
          className="flex items-center flex-col p-4"
          onSubmit={handleSubmit}
        >
          <div className="email flex-col flex mb-2">
            <label htmlFor="email" className="text-lg mb-2">
              Email
            </label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              ref={emailRef}
              className="bg-blue-fourth p-2 w-72"
              name="email"
              id="email"
              required
            />
          </div>
          <div className="password flex-col flex mb-4">
            <label htmlFor="password" className="text-lg mb-2">
              Password
            </label>
            <input
              onChange={(e) => setPw(e.target.value)}
              value={pw}
              ref={pwRef}
              type="password"
              className="bg-blue-fourth p-2 w-72"
              name="password"
              id="password"
            />
          </div>
          <div className="passwordConfirm flex-col flex mb-4">
            <label htmlFor="passwordConfirm" className="text-lg mb-2">
              Confirm Password
            </label>
            <input
              onChange={(e) => setPwConfirm(e.target.value)}
              value={pwConfirm}
              ref={pwConfirmRef}
              type="password"
              className="bg-blue-fourth p-2 w-72"
              name="passwordConfirm"
              id="passwordConfirm"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="border-4 px-4 py-2 bg-blue-third"
            style={loading ? { backgroundColor: "#000" } : {}}
          >
            {loading ? "Loading" : "Sign Up"}
          </button>
        </form>
        <p className="text-center">
          Already have an account?{" "}
          <Link to="/" className="text-blue-third">
            Log in
          </Link>
        </p>
      </article>
      <Footer />
    </section>
  );
};

export default SignUp;
