import { useGlobal } from "../../contexts/GlobalContext";
import { Link } from "react-router-dom";
import { RiDeleteBinFill as Delete } from "react-icons/ri";
import { IoPencil as Modify } from "react-icons/io5";

export default ({ title, image, categories, user, slug }) => {
  const { baseImgUrl } = useGlobal();

  return (
    <div className="col-span-1 shadow-2xl">
      {/* Titolo e bottoni */}
      <div className="text-center p-2 text-lg font-semibold flex justify-between items-center">
        <Link to={`/admin/dashboard/${slug}`} className="text-sky-400">
          <Modify />
        </Link>
        <h3>{title}</h3>
        <div className="text-red-400">
          <Delete />
        </div>
      </div>

      {/* Immagine */}
      <figure className="card-dash-img-container">
        <img
          src={`${baseImgUrl}${image}`}
          alt={`image-${slug}`}
          className="card-dash-img"
        />
      </figure>

      {/* Categories */}
      <ul className="flex flex-wrap gap-2 p-2 justify-center">
        {categories.map((c, i) => (
          <li
            key={`cat-${i}`}
            className={`text-neutral-200 bg-neutral-800 px-3 shadow-2xl ${
              i > 3 ? "hidden" : ""
            }`}
          >
            {c.name}
          </li>
        ))}
      </ul>

      <div className="text-center p-2 text-lg font-semibold ">{user.name}</div>
    </div>
  );
};
