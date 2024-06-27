import { usePhotos } from "../../contexts/PhotosContext";

export default () => {
  const { categories } = usePhotos();
  return (
    <div className="p-5 bg-neutral-800 text-neutral-200">
      <ul>
        {categories.map((c, i) => (
          <li key={`category-${i}`}>{c.name}</li>
        ))}
      </ul>
    </div>
  );
};
