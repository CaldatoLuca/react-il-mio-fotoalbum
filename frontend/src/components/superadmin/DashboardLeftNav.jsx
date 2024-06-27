import { usePhotos } from "../../contexts/PhotosContext";
import { BiSolidHome as Home } from "react-icons/bi";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

const links = [
  {
    title: "Home",
    icon: <Home />,
    path: "/admin/dashboard",
  },
];

export default () => {
  const { categories } = usePhotos();
  const location = useLocation();

  return (
    <div className="p-5 bg-neutral-800 text-neutral-200 ">
      <ul>
        {links.map((l, i) => (
          <li key={`link-${i}`}>
            <Link
              to={l.path}
              className={`flex items-center gap-2 px-2 py-1 ${
                location.pathname === l.path
                  ? "font-semibold bg-neutral-400"
                  : "hover:bg-neutral-400 hover:font-semibold"
              } `}
            >
              {l.icon} {l.title}
            </Link>
          </li>
        ))}
      </ul>
      <div className="text-lg font-bold mb-2">Your Categories</div>
      <ul>
        {categories.map((c, i) => (
          <li
            key={`category-${i}`}
            className={`cursor-pointer hover:bg-opacity-50 hover:bg-neutral-400 hover:font-semibold px-1`}
          >
            {c.name}
          </li>
        ))}
      </ul>
    </div>
  );
};
