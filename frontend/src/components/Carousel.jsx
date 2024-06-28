import { useEffect, useState } from "react";
import { useGlobal } from "../contexts/GlobalContext";

const Carousel = ({ photos }) => {
  const { baseImgUrl } = useGlobal();
  const [index, setIndex] = useState(0);

  //   useEffect(() => {
  //     const interval = setInterval(() => {
  //       setIndex((prevIndex) => (prevIndex + 1) % photos.length);
  //     }, 2000);

  //     return () => clearInterval(interval);
  //   });

  if (photos.length === 0) {
    return <div>No photos available.</div>;
  }

  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <img
        src={`${baseImgUrl}${photos[index].image}`}
        alt="Photo"
        className="h-full w-full object-cover p-20"
      />
    </div>
  );
};

export default Carousel;
