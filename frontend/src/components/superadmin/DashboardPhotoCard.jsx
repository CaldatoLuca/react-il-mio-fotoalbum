import { useGlobal } from "../../contexts/GlobalContext";
import { Link } from "react-router-dom";
import { RiDeleteBinFill as Delete } from "react-icons/ri";
import { IoPencil as Modify } from "react-icons/io5";

export default ({ title, image, categories, user, slug, deletePhoto }) => {
  const { baseImgUrl } = useGlobal();

  return (
    <div className="col-span-1 shadow-2xl flex flex-col">
      {/* Titolo e bottoni */}
      <div className="text-center p-2 text-lg font-semibold flex justify-between items-center">
        <Link to={`/admin/dashboard/update/${slug}`} className="text-sky-400">
          <Modify />
        </Link>
        <h3>{title}</h3>
        <button className="text-red-400" onClick={() => deletePhoto(slug)}>
          <Delete />
        </button>
      </div>

      {/* Immagine */}
      <Link
        to={`/admin/dashboard/${slug}`}
        className="card-dash-img-container block"
      >
        <img
          src={`${baseImgUrl}${image}`}
          alt={`image-${slug}`}
          className="card-dash-img"
        />
      </Link>

      {/* Categories */}
      <ul className="flex flex-wrap gap-2 p-2 justify-center items-center flex-grow">
        {categories.map((c, i) => (
          <li
            key={`cat-${i}`}
            className={`text-neutral-200 bg-neutral-800 px-3 shadow-2xl ${
              i > 2 ? "hidden" : ""
            }`}
          >
            {c.name}
          </li>
        ))}
      </ul>

      <div className="text-center p-2 text-lg font-semibold mt-auto">
        {user.name}
      </div>
    </div>
  );
};
