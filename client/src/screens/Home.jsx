import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  decrementQuantity,
  incrementQuantity,
} from "../CartReducer";
import { incrementQty, getProducts, decrementQty } from "../ProductReducer";
import Services from "../components/Services";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import { auth } from "../firebase";
import UserHeader from "../components/UserHeader";
import Slider from "../components/Slider";
import "../screens/Home.css";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";

const Home = () => {
  const dispatch = useDispatch();
  const profilePictureUri = useSelector((state) => state.profilePicture.uri);
  const cart = useSelector((state) => state.cart.cart);
  const product = useSelector((state) => state.product.product);

  const services = [
    {
      id: "88",
      image: "https://cdn-icons-png.flaticon.com/128/4643/4643574.png",
      name: "Shirt",
      quantity: 0,
      price: 10,
    },
    {
      id: "11",
      image: "https://cdn-icons-png.flaticon.com/128/892/892458.png",
      name: "T-shirt",
      quantity: 0,
      price: 10,
    },
    {
      id: "12",
      image: "https://cdn-icons-png.flaticon.com/128/9609/9609161.png",
      name: "Dresses",
      quantity: 0,
      price: 10,
    },
    {
      id: "13",
      image: "https://cdn-icons-png.flaticon.com/128/599/599388.png",
      name: "Jeans",
      quantity: 0,
      price: 10,
    },
    {
      id: "14",
      image: "https://cdn-icons-png.flaticon.com/128/9431/9431166.png",
      name: "Sweater",
      quantity: 0,
      price: 10,
    },
    {
      id: "15",
      image: "https://cdn-icons-png.flaticon.com/128/3345/3345397.png",
      name: "Shorts",
      quantity: 0,
      price: 10,
    },
    {
      id: "16",
      image: "https://cdn-icons-png.flaticon.com/128/293/293241.png",
      name: "Sleeveless",
      quantity: 0,
      price: 10,
    },
  ];

  useEffect(() => {
    if (product.length === 0) {
      services.forEach((service) => dispatch(getProducts(service)));
    }
  }, [product.length, dispatch, services]);

  const total = cart.reduce((acc, item) => acc + item.quantity * item.price, 0);

  const toast = () => {
    Toastify({
      text: "Added to Cart",
      duration: 3000,
      close: true,
      gravity: "top",
      position: "right",
      backgroundColor: "linear-gradient(to right, #00b09b, #96c93d)",
      stopOnFocus: true,
    }).showToast();
  };

  const handleDecrement = (item) => {
    dispatch(decrementQuantity(item));
    dispatch(decrementQty(item));
  };

  const handleIncrement = (item) => {
    toast();
    dispatch(incrementQuantity(item));
    dispatch(incrementQty(item));
  };

  const handleAddToCart = (item) => {
    toast();
    dispatch(addToCart(item));
    dispatch(incrementQty(item));
  };

  return (
    <div>
      <UserHeader />
      <div className="con p-5">
        <div className="overflow-y-auto">
          <Slider />
          <div className="productItem mt-2">
            {product.map((item, index) => (
              <div
                key={index}
                className="flex justify-between items-center mb-3 bg-gray-200 p-2 rounded-xl"
              >
                <div>
                  <img
                    src={item.image}
                    alt={item.name}
                    style={{ width: "75px", height: "75px" }}
                  />
                </div>
                <div>
                  <p className="text-black text-lg">{item.name}</p>
                  <p className="text-black font-semibold text-xl">
                    ₹ {item.price}
                  </p>
                </div>
                {cart.some((c) => c.id === item.id) ? (
                  <div className="flex gap-5">
                    <button
                      onClick={() => handleDecrement(item)}
                      className="bg-blue-600 rounded-full"
                    >
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
                          d="M5 12h14"
                        />
                      </svg>
                    </button>
                    <p className="text-black">{item.quantity}</p>
                    <button
                      onClick={() => handleIncrement(item)}
                      className="bg-blue-600 rounded-full"
                    >
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
                          d="M12 4.5v15m7.5-7.5h-15"
                        />
                      </svg>
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => handleAddToCart(item)}
                    className="w-14 h-7 flex justify-center items-center bg-blue-600 rounded-full"
                  >
                    <p className="text-white text-lg font-semibold">Add</p>
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
        {total === 0 ? null : (
          <div
            className="pickup bg-blue-500 p-3 rounded-xl flex justify-between items-center fixed gap-8"
            style={{
              top: "1rem",
              left: "50%",
              transform: "translateX(-50%)",
            }}
          >
            <div className="p-2">
              <p className="text-white font-semibold">
                {cart.length} items | ₹{total}
              </p>
              <p className="text-white text-xs">extra charges might apply</p>
            </div>
            <Link to="/pickup">
              <button className="p-2">
                <p
                  className="text-white font-semibold"
                  style={{ fontSize: "16px" }}
                >
                  Proceed to pickup
                </p>
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
