import React, { useState } from "react";
import {
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { useDispatch } from "react-redux";
import { setEmail } from "../EmailReducer";
import { auth } from "../firebase"; // Ensure this is the correct auth instance
import { Link } from "react-router-dom";
import Header from "../components/Header";
import { BallTriangle } from "react-loader-spinner";
import "../screens/Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();





  const handleLogin = async (email, password) => {
    try {
      setLoading(true);
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      console.log(user);
      dispatch(setEmail(user.email));
    } catch (error) {
      console.error("Error login:", error.message);
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin(email, password);
  };

  const guestLogin = () => {
    handleLogin("guest@gmail.com", "123456");
  };

  return (
    <div>
      <Header />
      {loading ? (
        <div
          className="flex justify-center items-center"
          style={{ marginTop: "15rem" }}
        >
          <BallTriangle
            type="ball-triangle"
            color="#333"
            height={64}
            width={64}
          />
        </div>
      ) : (
        <div>
          <div
            className="main-side flex justify-between items-center"
            style={{ padding: 140 }}
          >
            <div className="left-side">
              <div>
                <h4 className="text-6xl text-red-800 font-serif font-semibold">
                  Laundry Service
                </h4>
                <p className="text-sm mt-2 font-serif text-gray-500">
                  Doorstep Wash & Dryclean Service
                </p>
                <p className="text-lg text-gray-500 mt-8">
                  Don't have an account ?
                </p>
                <div className="mt-2">
                  <Link to="/signup">
                    <button
                      className="text-blue-700 rounded-md p-2 font-semibold"
                      style={{ border: "1px solid blue" }}
                    >
                      Register
                    </button>
                  </Link>
                </div>
              </div>
            </div>
            <div className="right-side flex-col gap-10">
              <div>
                <h2 className="font-serif text-blue-700 font-semibold rounded-2xl text-2xl">
                  LOG IN
                </h2>
              </div>
              <div className="flex-col">
                <div style={{ width: "20rem" }}>
                  <input
                    placeholder="Enter your email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="border-0 border-b border-gray-500 outline-none w-full mt-7 mb-5 text-lg focus:border-blue-700 focus:placeholder-white"
                  />
                </div>
                <div>
                  <input
                    placeholder="Enter your password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="border-0 border-b border-gray-500 outline-none w-full text-lg focus:border-blue-700 focus:placeholder-white"
                  />
                </div>
              </div>
              <div className="flex-row">
                <button
                  onClick={handleSubmit}
                  className="bg-blue-600 p-2 rounded-sm text-white w-36 mt-7 text-lg mr-5"
                >
                  Log In
                </button>
                <button
                  onClick={guestLogin}
                  className="text-base bg-gray-300 p-2 rounded-sm"
                >
                  Login as a <span className="font-bold">guest</span>
                </button>
              </div>
              <div className="mt-5 flex gap-2">
                <h2 className="text-base">Don't have an account ?</h2>
                <Link to="/signup">
                  <button className="text-lg font-semibold text-blue-800">
                    Signup
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
