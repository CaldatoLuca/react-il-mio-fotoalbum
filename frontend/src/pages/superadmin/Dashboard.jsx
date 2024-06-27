import { usePhotos } from "../../contexts/PhotosContext";

export default () => {
  const { photos } = usePhotos();
  return (
    <div className="text-red-500">
      <ul>
        {photos.map((p, i) => (
          <li key={`photo-${i}`}>{p.title}</li>
        ))}
      </ul>
    </div>
  );
};
