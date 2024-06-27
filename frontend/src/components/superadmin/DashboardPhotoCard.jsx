import { useGlobal } from "../../contexts/GlobalContext";
import { Link } from "react-router-dom";

export default ({ title, image, categories, slug }) => {
  const { baseImgUrl } = useGlobal();

  return (
    <div className=" col-span-1 shadow-2xl">
      {/* Titolo e bottoni */}
      <div className="text-center p-2 text-lg font-semibold flex justify-between items-center">
        <div>upd</div>
        <h3>{title}</h3>
        <div>del</div>
      </div>

      {/* Immagine */}
      <figure>
        <img src={`${baseImgUrl}${image}`} alt={`image-${slug}`} />
      </figure>

      {/* Categories */}
      <ul className=" flex flex-wrap gap-2 p-2 ">
        {categories.map((c, i) => (
          <li
            key={`cat-${i}`}
            className={` text-neutral-200 bg-neutral-800 px-3 shadow-2xl ${
              i > 3 ? "hidden" : ""
            }`}
          >
            {c.name}
          </li>
        ))}
      </ul>
    </div>
  );
};
