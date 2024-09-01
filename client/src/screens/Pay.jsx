import React, { useState } from "react";
import { useSelector } from "react-redux";
import "./Pay.css";
import axios from "axios";
import { BallTriangle } from "react-loader-spinner";
import { Link } from "react-router-dom";

const Pay = () => {
  const cart = useSelector((state) => state.cart.cart);
  const total =
    32 +
    cart
      .map((item) => item.quantity * item.price)
      .reduce((curr, prev) => curr + prev, 0);

  const [loading, setLoading] = useState(false);

  console.log(total);

  const amount = total;

  const payFunction = async () => {
    if (amount > 0) {
      try {
        setLoading(true);
        const response = await axios.post("https://freshfold.vercel.app/payment", {
          amount,
        });
        if (response && response.status === 200) {
          window.location.href = response.data.url;
        }
      } catch (error) {
        console.error(error);
      } finally {
      }
      setLoading(false);
    } else {
      alert("Please enter a valid amount");
    }
  };

  return (
    <div>
      {loading ? (
        <div
          className="flex justify-center items-center"
          style={{ marginTop: "15rem" }}
        >
          <BallTriangle color="#333" height={64} width={64} />
        </div>
      ) : (
        <div className="pay-container">
          <div className="billing-details">
            <div className="billing-item">
              <span className="billing-text">Item Total</span>
              <span className="billing-value">
                ₹{total > 32 ? total - 32 : 0}
              </span>
            </div>
            <div className="billing-item">
              <span className="billing-text">Delivery Fee | 1.2KM</span>
              <span className="billing-value free">FREE</span>
            </div>
            <div className="billing-item">
              <span className="billing-text">Free Delivery on Your order</span>
            </div>
            <hr className="divider" />
            <div className="billing-item">
              <span className="billing-text">Selected Date</span>
              <span className="billing-value">
                {total > 32 ? "July 12" : "Add item to cart"}
              </span>
            </div>
            <div className="billing-item">
              <span className="billing-text">No Of Days</span>
              <span className="billing-value">
                {total > 32 ? "2-3 days" : ""}
              </span>
            </div>
            <div className="billing-item">
              <span className="billing-text">Selected Pick Up Time</span>
              <span className="billing-value">
                {total > 32 ? "8:00 AM" : ""}
              </span>
            </div>
            <hr className="divider" />
            <div className="billing-item">
              <span className="billing-text total-text">To Pay</span>
              <span className="billing-value total-value">
                ₹{total > 32 ? total : 0}
              </span>
            </div>
          </div>
          <div className="payment-section">
            {total - 32 <= 0 ? (
              <Link to="/">
                <button className="pay-button">Go Back to Home</button>
              </Link>
            ) : (
              <button onClick={payFunction} className="pay-button">
                Pay Now
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Pay;
