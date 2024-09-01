import React, { useState } from "react";
import { useSelector } from "react-redux";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../screens/Pickup.css";
import { Link } from "react-router-dom";

const Pickup = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState("");
  const [delivery, setDelivery] = useState([]);
  const [address, setAddress] = useState("");

  const cart = useSelector((state) => state.cart.cart);
  const total = cart
    .map((item) => item.quantity * item.price)
    .reduce((curr, prev) => curr + prev, 0);

  const currentDate = new Date();
  const endDate = new Date();
  endDate.setDate(currentDate.getDate() + 7);

  const deliveryTime = [
    { id: "0", name: "Tomorrow" },
    { id: "1", name: "2-3 Days" },
    { id: "2", name: "3-4 Days" },
    { id: "3", name: "4-5 Days" },
    { id: "4", name: "5-6 Days" },
  ];

  const times = [
    { id: "0", time: "08:00 AM" },
    { id: "1", time: "11:00 AM" },
    { id: "2", time: "02:00 PM" },
    { id: "3", time: "05:00 PM" },
    { id: "4", time: "09:00 PM" },
    { id: "5", time: "11:00 PM" },
  ];

  const isPastTime = (timeString) => {
    const [hours, minutes, period] = timeString.split(/[: ]/);
    let date = new Date(selectedDate);
    let hours24 =
      parseInt(hours) + (period === "PM" && hours !== "12" ? 12 : 0);
    date.setHours(hours24, minutes);
    return date < new Date();
  };

  return (
    <div className="container">
      <div className="address-input">
        <h3 className="mb-2">Enter Your Full Address</h3>
        <textarea
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Type here..."
          style={{
            width: "100%",
            height: "80px",
            borderRadius: "8px",
            padding: "8px",
            border: "1px solid gray",
          }}
        />
      </div>

      <div className="date-picker">
        <h3 className="mb-2">Pick Up Date</h3>
        <DatePicker
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date)}
          placeholderText="Select a date"
          wrapperClassName="date-picker-wrapper"
          calendarClassName="date-picker-calendar"
        />
      </div>

      <div className="time-picker">
        <h3>Select Time</h3>
        <div className="time-buttons">
          {times.map((item, index) => {
            const pastTime = isPastTime(item.time);
            return (
              <button
                key={index}
                onClick={() => !pastTime && setSelectedTime(item.time)}
                disabled={pastTime}
                style={{
                  margin: "10px",
                  borderRadius: "10px",
                  padding: "15px",
                  border: "1px solid #ccc",
                  backgroundColor: pastTime
                    ? "#dcdde1"
                    : selectedTime === item.time
                    ? "#007bff"
                    : "white",
                  color: pastTime
                    ? "gray"
                    : selectedTime === item.time
                    ? "white"
                    : "black",
                  width: "90px",
                  textAlign: "center",
                  cursor: pastTime ? "not-allowed" : "pointer",
                }}
              >
                {item.time}
              </button>
            );
          })}
        </div>
      </div>

      <div className="delivery-picker">
        <h3>Delivery Date</h3>
        <div className="delivery-buttons">
          {deliveryTime.map((item, i) => (
            <button
              key={i}
              onClick={() => setDelivery(item.name)}
              style={{
                margin: "10px",
                borderRadius: "7px",
                padding: "15px",
                border: "1px solid #ccc",
                backgroundColor: delivery.includes(item.name)
                  ? "#007bff"
                  : "white",
                color: delivery.includes(item.name) ? "white" : "black",
                cursor: "pointer",
              }}
            >
              {item.name}
            </button>
          ))}
        </div>
      </div>

      {total === 0 ? null : (
        <div className="cart-summary">
          <div>
            <h4 style={{ color: "#333" }}>
              {cart.length} items | ₹{total}
            </h4>
            <p style={{ color: "#666", fontSize: "12px" }}>
              extra charges might apply
            </p>
          </div>
          {!(delivery || selectedDate || selectedTime || address) ? (
            alert("Empty or Invalid: Please select all fields")
          ) : (
            <Link to="/cart">
              <button
                style={{
                  backgroundColor: "#007bff",
                  color: "white",
                  padding: "8px 16px",
                  borderRadius: "8px",
                  fontWeight: "bold",
                  cursor: "pointer",
                }}
              >
                Proceed to Cart
              </button>
            </Link>
          )}
        </div>
      )}
    </div>
  );
};

export default Pickup;
