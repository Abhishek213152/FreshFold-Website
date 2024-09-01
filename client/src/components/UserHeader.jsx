import React from "react";
import { Link } from "react-router-dom";
import "../components/Header.css";
import { useSelector } from "react-redux";

const UserHeader = () => {
  const cart = useSelector((state) => state.cart.cart);
  const total = cart
    .map((item) => item.quantity * item.price)
    .reduce((curr, prev) => curr + prev, 0);

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
              <Link to="/">
                <button className="font-semibold">Home</button>
              </Link>
            </div>
            <Link to="/cart">
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "4px",
                }}
                className="cart bg-blue-600 p-2 rounded-md"
              >
                <button className="text-white font-semibold">Cart</button>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6 text-white"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                  />
                </svg>
                {total == 0 ? null : (
                  <div>
                    <h3 className="text-white text-xl ml-1 mr-1 font-semibold mb-1">
                      {cart.length}
                    </h3>
                  </div>
                )}
              </div>
            </Link>
          </div>
          <div className="cursor-pointer">
            <Link to="/profile">
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
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserHeader;
