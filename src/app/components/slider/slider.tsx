"use client";

import React, { useState } from "react";

const Slider = ({ slides }: { slides: { url: string; alt: string }[] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  //   const slides = [
  //     { url: 'https://via.placeholder.com/800x400?text=Slide+1', alt: 'Slide 1' },
  //     { url: 'https://via.placeholder.com/800x400?text=Slide+2', alt: 'Slide 2' },
  //     { url: 'https://via.placeholder.com/800x400?text=Slide+3', alt: 'Slide 3' },
  //   ];

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === slides.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? slides.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <div className="overflow-hidden rounded-lg">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {slides.map((slide, index) => (
            <img
            loading="lazy"
              key={index}
              src={slide.url}
              alt={slide.alt}
              className="w-full flex-shrink-0 object-scale-down aspect-video"
            />
          ))}
        </div>
      </div>
      {currentIndex > 0 && (
        <button
          onClick={prevSlide}
          className="absolute top-1/2 left-0 transform -translate-y-1/2 p-2 bg-gray-800 bg-opacity-50 text-white rounded-full"
        >
          &#10094;
        </button>
      )}
      {(currentIndex < slides.length - 1) && (
        <button
          onClick={nextSlide}
          className="absolute top-1/2 right-0 transform -translate-y-1/2 p-2 bg-gray-800 bg-opacity-50 text-white rounded-full"
        >
          &#10095;
        </button>
      )}
    </div>
  );
};

export default Slider;
