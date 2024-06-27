import { usePhotos } from "../../contexts/PhotosContext";

export default () => {
  const { categories } = usePhotos();
  return (
    <div className="p-5 bg-neutral-800 text-neutral-200 ">
      <div className="text-lg font-bold mb-2">Your Categories</div>
      <ul>
        {categories.map((c, i) => (
          <li
            key={`category-${i}`}
            className="cursor-pointer hover:bg-opacity-50 hover:bg-neutral-400 hover:font-semibold px-1"
          >
            {c.name}
          </li>
        ))}
      </ul>
    </div>
  );
};
