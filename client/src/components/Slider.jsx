import React, { useState, useEffect } from "react";
import { useMediaQuery } from "react-responsive";

const Slider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const images = [
    "https://i.postimg.cc/Y0ZXwTrs/main.jpg",
    "https://i.postimg.cc/qvHDRVrs/slide2.jpg",
    "https://i.postimg.cc/FRf03pXy/slide4.jpg",
    "https://i.postimg.cc/XYfZMh41/slide6.jpg",
  ];

  const isMobile = useMediaQuery({ query: "(max-width: 640px)" });

  const handleNext = () => {
    setCurrentIndex((currentIndex + 1) % (isMobile ? 1 : images.length));
  };

  const handlePrev = () => {
    setCurrentIndex(
      (currentIndex - 1 + (isMobile ? 1 : images.length)) %
        (isMobile ? 1 : images.length)
    );
  };

  useEffect(() => {
    const intervalId = setInterval(handleNext, 1000);
    return () => clearInterval(intervalId);
  }, [currentIndex, isMobile]);

  return (
    <div className="slider-container">
      <div className="slider-inner">
        {isMobile ? (
          <div key={0} className="slider-item active">
            <img
              src={"https://i.postimg.cc/Y0ZXwTrs/main.jpg"}
              alt="Main"
              className="rounded-3xl cursor-pointer"
            />
          </div>
        ) : (
          images.map((image, index) => (
            <div
              key={index}
              className={`slider-item ${
                index === currentIndex ? "active" : ""
              }`}
            >
              <img
                src={image}
                alt="Main"
                className="rounded-3xl cursor-pointer"
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Slider;
