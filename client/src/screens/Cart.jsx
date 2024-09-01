import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShoppingCart,
  faMinus,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { decrementQuantity, incrementQuantity } from "../CartReducer";
import { decrementQty, incrementQty } from "../ProductReducer";
import { Link } from "react-router-dom";

const Cart = () => {
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart.cart);
  const total = cart
    .map((item) => item.quantity * item.price)
    .reduce((curr, prev) => curr + prev, 0);

  return (
    <div
      style={{
        padding: "16px",
        backgroundColor: "#f9f9f9",
        borderRadius: "10px",
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "8px",
          marginBottom: "20px",
        }}
      >
        <h2
          style={{
            color: "black",
            fontSize: "24px",
            fontWeight: "600",
            marginRight: "10px",
          }}
        >
          Cart
        </h2>
        <FontAwesomeIcon
          icon={faShoppingCart}
          size="lg"
          color="black"
          style={{ marginRight: "10px" }}
        />
      </div>
      <div
        style={{
          padding: "20px",
          backgroundColor: "#fff",
          borderRadius: "10px",
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        {cart.map((item, index) => (
          <div
            key={index}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "32px",
              marginTop: "4px",
              padding: "16px",
              backgroundColor: "#fff",
              borderRadius: "10px",
              boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
            }}
          >
            <p
              style={{
                width: "67px",
                fontSize: "14px",
                color: "black",
                marginRight: "10px",
              }}
            >
              {item.name}
            </p>
            <div
              style={{
                display: "flex",
                gap: "16px",
                alignItems: "center",
              }}
            >
              <button
                onClick={() => {
                  dispatch(decrementQuantity(item));
                  dispatch(decrementQty(item));
                }}
                style={{
                  backgroundColor: "#007bff",
                  borderRadius: "50%",
                  padding: "10px",
                  border: "none",
                  marginRight: "10px",
                }}
              >
                <FontAwesomeIcon
                  icon={faMinus}
                  size="sm"
                  color="#fff"
                  style={{ marginRight: "10px" }}
                />
              </button>
              <p style={{ color: "black" }}>{item.quantity}</p>
              <button
                onClick={() => {
                  dispatch(incrementQuantity(item));
                  dispatch(incrementQty(item));
                }}
                style={{
                  backgroundColor: "#007bff",
                  borderRadius: "50%",
                  padding: "10px",
                  border: "none",
                  marginLeft: "10px",
                }}
              >
                <FontAwesomeIcon
                  icon={faPlus}
                  size="sm"
                  color="#fff"
                  style={{ marginLeft: "10px" }}
                />
              </button>
            </div>
            <p
              style={{
                fontSize: "14px",
                color: "black",
                marginLeft: "10px",
              }}
            >
              ₹{item.price * item.quantity}
            </p>
          </div>
        ))}
      </div>

      <div
        style={{
          padding: "20px",
          backgroundColor: "#fff",
          borderRadius: "10px",
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        <h3
          style={{
            color: "black",
            fontSize: "18px",
            fontWeight: "600",
            marginBottom: "10px",
          }}
        >
          Billing Details
        </h3>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "10px",
            backgroundColor: "#fff",
            borderRadius: "10px",
            boxShadow: "0 0 10px rgba(0, 0, 0)",
          }}
        >
          <p style={{ fontSize: "18px", fontWeight: "400", color: "gray" }}>
            Item Total
          </p>
          <p style={{ fontSize: "18px", fontWeight: "400", color: "black" }}>
            ₹{total}
          </p>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "10px",
            margin: "8px 0",
          }}
        >
          <p style={{ fontSize: "18px", fontWeight: "400", color: "gray" }}>
            Delivery Fee | 1.2KM
          </p>
          <p style={{ fontSize: "18px", fontWeight: "400", color: "#088F8F" }}>
            FREE
          </p>
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <p style={{ fontSize: "18px", fontWeight: "500", color: "gray" }}>
            Free Delivery on Your order
          </p>
        </div>
        <hr
          style={{
            borderColor: "gray",
            height: "1px",
            borderWidth: "0.5px",
            marginTop: "10px",
          }}
        />
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "10px",
            margin: "10px 0",
          }}
        >
          <p style={{ fontSize: "18px", fontWeight: "500", color: "gray" }}>
            Selected Date
          </p>
          <p style={{ fontSize: "18px", fontWeight: "400", color: "#088F8F" }}>
            {total > 0 ? "July 12" : "Add item to cart"}
          </p>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "10px",
          }}
        >
          <p style={{ fontSize: "18px", fontWeight: "500", color: "gray" }}>
            No Of Days
          </p>
          <p style={{ fontSize: "18px", fontWeight: "400", color: "#088F8F" }}>
            {total > 0 ? "2-3 days" : ""}
          </p>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "10px",
            margin: "10px 0",
          }}
        >
          <p style={{ fontSize: "18px", fontWeight: "500", color: "gray" }}>
            Selected Pick Up Time
          </p>
          <p style={{ fontSize: "18px", fontWeight: "400", color: "#088F8F" }}>
            {total > 0 ? "8:00 AM" : ""}
          </p>
        </div>
        <hr
          style={{
            borderColor: "gray",
            height: "1px",
            borderWidth: "0.5px",
            marginTop: "10px",
          }}
        />
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "10px",
            margin: "8px 0",
          }}
        >
          <p style={{ fontSize: "18px", fontWeight: "bold", color: "black" }}>
            To Pay
          </p>
          <p style={{ fontSize: "18px", fontWeight: "bold", color: "black" }}>
            ₹ {total > 0 ? total + 32 : 0}
          </p>
        </div>
      </div>

      {total === 0 ? null : (
        <div
          style={{
            backgroundColor: "#007bff",
            padding: "16px",
            margin: "8px 12px",
            borderRadius: "16px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div style={{ padding: "8px" }}>
            <p style={{ color: "white", fontWeight: "600" }}>
              {cart.length} items | ₹{total + 27}
            </p>
            <p style={{ color: "white", fontSize: "12px" }}>
              Select payment method
            </p>
          </div>
          <Link to="/pay">
            <button
              style={{
                backgroundColor: "transparent",
                padding: "8px",
                border: "none",
              }}
            >
              <p
                style={{ fontSize: "16px", color: "white", fontWeight: "600" }}
              >
                Place Order
              </p>
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Cart;
