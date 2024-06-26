import { usePhotos } from "../../contexts/PhotosContext";
import { BiSolidHome as Home } from "react-icons/bi";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { FaPlus as Add } from "react-icons/fa6";
import { BiSolidPurchaseTag as Categories } from "react-icons/bi";
import { FaEnvelope as CloseEnvelope } from "react-icons/fa";
import { FaEnvelopeOpen as OpenEnvelope } from "react-icons/fa";

const links = [
  {
    title: "Home",
    icon: <Home />,
    path: "/admin/dashboard",
  },
  {
    title: "Photo",
    icon: <Add />,
    path: "/admin/dashboard/add-photo",
  },
  {
    title: "Categories",
    icon: <Categories />,
    path: "/admin/dashboard/categories",
  },
  {
    title: "Inbox",
    icon: {
      close: <CloseEnvelope />,
      open: <OpenEnvelope />,
    },
    path: "/admin/dashboard/inbox",
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
              className={`flex items-center gap-2 px-5 py-1 hover:bg-neutral-400 ${
                location.pathname === l.path ? " bg-neutral-400" : " "
              } `}
            >
              {l.title === "Inbox" ? (
                <div className="flex items-center gap-2">
                  {location.pathname === l.path ? (
                    <>{l.icon.open}</>
                  ) : (
                    <>{l.icon.close}</>
                  )}{" "}
                  <span>{l.title}</span>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  {l.icon} <span>{l.title}</span>
                </div>
              )}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
