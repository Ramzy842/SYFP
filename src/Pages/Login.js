import React, { useState, useEffect, useRef } from "react";
import { Link, useHistory } from "react-router-dom";
import Footer from "../Components/Footer";
import LoginHeader from "../Components/LoginHeader";
import { signInWithEmailAndPassword } from "firebase/auth";
import GlobalContext from "../Context";

const Login = () => {
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [loading, setLoading] = useState(false);
  const { auth, setUserUrls } = GlobalContext();
  const history = useHistory();
  const _ismounted = useRef(true);
  const [error, setError] = useState("");
  useEffect(() => {
    return () => {
      _ismounted.current = false;
    };
  }, []);

  const demoAccHandler = async () => {
    await signInWithEmailAndPassword(auth, "test@gmail.com", "test123").then(
      () => {
        if (_ismounted.current) {
          try {
            // Signed in
            setLoading(false);
            setEmail("");
            setPw("");

            history.push("/dashboard");
          } catch (error) {
            setLoading(false);

            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode);
            console.log(errorMessage);
          }
        }
      }
    );
  };

  useEffect(() => {
    setUserUrls([]);
  }, [setUserUrls]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    await signInWithEmailAndPassword(auth, email, pw)
      .then(() => {
        if (_ismounted.current) {
          try {
            // Signed in

            setEmail("");
            setPw("");

            history.push("/dashboard");
          } catch (error) {}
        }
      })
      .catch((err) => {
        if (_ismounted.current) {
          setError("A user with this email does not exist");
          setTimeout(() => {
            setError("");
          }, 3000);
        }
      })
      .finally(() => {
        if (_ismounted.current) {
          setLoading(false);
        }
      });
  };

  return (
    <section className="login font-default min-h-screen bg-blue-third text-blue-primary grid sm:grid-cols-2 ">
      <LoginHeader />
      <article className="sm:justify-center sm:min-h-screen bg-blue-secondary sm:flex sm:flex-col sm:border-l-8">
        <h1 className="bg-blue-primary sm:bg-transparent w-full text-2xl text-center text-blue-third py-2 mb-4 sm:justify-self-start font-bold tracking-widest sm:text-3xl">
          Log in
        </h1>
        <form
          className="flex items-center flex-col p-4 "
          onSubmit={handleSubmit}
        >
          {error && (
            <h1
              style={{ backgroundColor: "#EA3C53" }}
              className="py-2 px-4 mb-4 text-sm sm:text-md lg:text-lg text-white"
            >
              {error}
            </h1>
          )}
          <div className="email flex-col flex mb-2">
            <label htmlFor="email" className="text-lg mb-2">
              Email
            </label>
            <input
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              type="email"
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
              value={pw}
              onChange={(e) => setPw(e.target.value)}
              type="password"
              className="bg-blue-fourth p-2 w-72"
              name="password"
              id="password"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="border-4 px-4 py-2 bg-blue-third"
            style={loading ? { backgroundColor: "#fff" } : {}}
          >
            {loading ? "Loading" : "Log in"}
          </button>
        </form>
        <button
          className="border-4 px-4 py-2 m-auto mt-0 mb-4 flex  bg-blue-third"
          onClick={demoAccHandler}
        >
          Demo Account
        </button>

        <p className="text-center">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-third">
            Sign Up
          </Link>
        </p>
      </article>
      <Footer />
    </section>
  );
};

export default Login;
