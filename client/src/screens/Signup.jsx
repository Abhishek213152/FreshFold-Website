import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useDispatch } from "react-redux";
import { setEmail } from "../EmailReducer";
import { auth } from "../firebase";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import { BallTriangle } from "react-loader-spinner";
import axios from "axios";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmaill] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const handleSignUp = async () => {
    try {
      if (password !== confirmPassword) {
        throw new Error("Passwords don't match");
      }

      setLoading(true);

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      console.log(user);
      dispatch(setEmail(user.email));
      window.location.href = "/";
    } catch (error) {
      console.error("Error signing up:", error.message);
      setLoading(false);
    }
  };

  const sendData = async () => {
    await axios
      .post("https://freshfold.vercel.app/data", { name, email })
      .then(() => console.log("Data sended"))
      .catch((e) => {
        console.log(e.message);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSignUp();
    sendData();
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
            style={{ padding: 110 }}
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
                  Already have an account ?
                </p>
                <div className="mt-2">
                  <Link to="/">
                    <button
                      className="text-blue-700 rounded-md p-2 font-semibold"
                      style={{ border: "1px solid blue" }}
                    >
                      Log In
                    </button>
                  </Link>
                </div>
              </div>
            </div>
            <div className="flex-col gap-10">
              <div>
                <h2 className="font-serif text-blue-700 font-semibold rounded-2xl text-2xl">
                  SIGN UP
                </h2>
              </div>
              <div className="flex-col">
                <div style={{ width: "20rem" }}>
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                    type="text"
                    name=""
                    className="border-0 border-b border-gray-500 outline-none w-full mt-7 mb-5 text-lg focus:border-blue-700 focus:placeholder-white"
                  />
                </div>
                <div style={{ width: "20rem" }}>
                  <input
                    placeholder="Enter your email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmaill(e.target.value)}
                    name=""
                    className="border-0 border-b border-gray-500 outline-none w-full mb-5 text-lg focus:border-blue-700 focus:placeholder-white"
                  />
                </div>
                <div>
                  <input
                    placeholder="Enter your password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    name=""
                    id=""
                    className="border-0 border-b border-gray-500 mb-5 outline-none w-full text-lg focus:border-blue-700 focus:placeholder-white"
                  />
                </div>
                <div>
                  <input
                    placeholder="Confirm your Password"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    name=""
                    className="border-0 border-b border-gray-500 outline-none w-full text-lg focus:border-blue-700 focus:placeholder-white"
                  />
                </div>
              </div>
              <div>
                <button
                  onClick={handleSubmit}
                  className="bg-blue-600 p-2 rounded-sm text-white w-36 mt-7 text-lg"
                >
                  Sign Up
                </button>
              </div>
              <div className="mt-5 flex gap-3">
                <h2 className="text-base">Already have an account?</h2>
                <Link to="/">
                  <button className="text-lg font-semibold text-blue-800">
                    Login
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

export default Signup;
