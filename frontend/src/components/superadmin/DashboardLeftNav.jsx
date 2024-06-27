import { usePhotos } from "../../contexts/PhotosContext";
import { BiSolidHome as Home } from "react-icons/bi";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { FaPlus as Add } from "react-icons/fa6";
import { BiSolidPurchaseTag as Categories } from "react-icons/bi";

const links = [
  {
    title: "Home",
    icon: <Home />,
    path: "/admin/dashboard",
  },
  {
    title: "Add Photo",
    icon: <Add />,
    path: "/admin/dashboard/add-photo",
  },
  {
    title: "Categories",
    icon: <Categories />,
    path: "/admin/dashboard/categories",
  },
];

export default () => {
  const location = useLocation();

  return (
    <div className="p-5 bg-neutral-800 text-neutral-200 flex flex-col">
      <ul className=" flex flex-col gap-2 mb-4">
        {links.map((l, i) => (
          <li key={`link-${i}`}>
            <Link
              to={l.path}
              className={`flex items-center gap-2 px-2 py-1 ${
                location.pathname === l.path
                  ? "font-semibold bg-neutral-400"
                  : "hover:bg-neutral-400 "
              } `}
            >
              {l.icon} {l.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
