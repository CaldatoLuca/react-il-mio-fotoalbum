import { useEffect, useState } from "react";
import Header from "./Header";
import { Link } from "react-router-dom";

const imagesCarousel = [
  // {
  //   src: "/car1.jpeg",
  //   alt: "Image 1",
  //   caption: "Black and White",
  // },
  // {
  //   src: "/car2.jpg",
  //   alt: "Image 2",
  //   caption: "Landscapes",
  // },
  // {
  //   src: "/car3.jpg",
  //   alt: "Image 3",
  //   caption: "Sport",
  // },

  {
    src: "/car6.jpg",
    alt: "Image 6",
    caption: "Street Photography",
  },
];

const Home = () => {
  // const [index, setIndex] = useState(0);

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setIndex((prevIndex) => (prevIndex + 1) % imagesCarousel.length);
  //   }, 3000);

  //   return () => clearInterval(interval);
  // }, []);

  return (
    <div className="h-screen relative overflow-hidden">
      <div className="absolute inset-0 flex flex-col justify-center items-center text-neutral-300 text-center gap-10">
        <Header />
        <h1 className="text-4xl font-bold">Street Photography</h1>
      </div>

      <img src="/car6.jpg" alt="Image 6" />
    </div>
  );
};

export default Home;
