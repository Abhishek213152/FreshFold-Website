import React from "react";
import "../components/Slider.css"

const Services = () => {
  return (
    <div>
      <div className="mt-6 mb-3">
        <h2 className="text-lg text-black font-medium">Services Available</h2>
      </div>
      <div className="flex gap-7 mt-1 overflow-x-auto justify-center items-center">
        <div className="flex-col justify-center items-center gap-1">
          <img
            src="../src/assets/technology.png"
            alt="Washing"
            style={{ width: "50px", height: "50px" }}
          />
          <span className="text-gray-700 text-sm">Washing</span>
        </div>
        <div className="flex-col justify-center items-center gap-1">
          <img
            src="../src/assets/iron.png"
            alt="Wash & Iron"
            style={{ width: "50px", height: "50px" }}
          />
          <span className="text-gray-700 text-sm">Wash & Iron</span>
        </div>
        <div className="flex-col justify-center items-center gap-1">
          <img
            src="../src/assets/dry-cleaning.png"
            alt="Wash & Iron"
            style={{ width: "50px", height: "50px" }}
          />
          <span className="text-gray-700 text-sm">Dry Cleaning</span>
        </div>
        <div className="flex-col justify-center items-center gap-1">
          <img
            src="../src/assets/drying.png"
            alt="Air Dry"
            style={{ width: "50px", height: "50px" }}
          />
          <span className="text-gray-700 text-sm">Air Dry</span>
        </div>
      </div>
    </div>
  );
};

export default Services;
