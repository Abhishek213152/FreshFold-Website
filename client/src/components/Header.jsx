import React from "react";
import "../components/Header.css";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="main">
      <div className="ele flex justify-between p-5">
        <div className="elee flex justify-center items-center gap-2">
          <h1 className="font-serif text-2xl font-bold text-blue-500">
            Fresh
            <span className="font-serif text-3xl font-bold text-blue-600">
              Fold
            </span>
          </h1>
          <img
            className="w-9 h-8"
            src="https://i.postimg.cc/C5cqS1Rm/clean-clothes.png"
            alt=""
          />
        </div>
        <div className="mid flex justify-center items-center gap-20">
          <div className="middd flex justify-center items-center gap-3">
            <div className="midd p-2 bg-gray-300 rounded-md">
              <button className="font-semibold">Home</button>
            </div>
          </div>
          <div className="cursor-pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.3}
              stroke="currentColor"
              className="size-12"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
