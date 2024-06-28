import { useEffect, useState } from "react";
import Header from "./Header";

const imagesCarousel = [
  {
    src: "/bg.jpeg",
    alt: "Image 1",
    caption: "Caption 1",
  },
];
export default () => {
  const [index, setIndex] = useState(0); // Initialize index to 0

  // Use useEffect for automatic carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % imagesCarousel.length); // Use carouselImg.length for the modulo operation
    }, 2000);

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []); // Empty dependency array to run effect only once
  return (
    <>
      <div className="h-screen  relative overflow-hidden">
        <div className="absolute inset-0  text-white text-center">
          <Header></Header>
        </div>

        <img src={imagesCarousel[index].src} alt={imagesCarousel[index].alt} />
      </div>
    </>
  );
};
