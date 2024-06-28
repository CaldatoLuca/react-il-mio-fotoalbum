import { useEffect, useState } from "react";
import Header from "./Header";
import { Link } from "react-router-dom";

const imagesCarousel = [
  {
    src: "/bg.jpeg",
    alt: "Image 1",
    caption: "Black and White",
  },
];

const Home = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % imagesCarousel.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-screen relative overflow-hidden">
      <div className="absolute inset-0 text-center">
        <Header />
      </div>
      <div className="absolute inset-0 flex justify-center items-center text-neutral-300 text-center">
        <h1 className="text-4xl font-bold">{imagesCarousel[index].caption}</h1>
      </div>

      <img src={imagesCarousel[index].src} alt={imagesCarousel[index].alt} />
    </div>
  );
};

export default Home;
