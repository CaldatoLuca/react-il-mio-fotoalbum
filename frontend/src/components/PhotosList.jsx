import { usePhotos } from "../contexts/PhotosContext";
import PhotoCard from "./PhotoCard";
export default () => {
  const { loading, photos } = usePhotos();

  return (
    <section id="photos-list">
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className=" grid grid-cols-3 gap-20">
          {photos.map((c, i) => (
            <div key={i} className="col-span-1">
              <PhotoCard title={c.title} image={c.image} />
            </div>
          ))}
        </div>
      )}
    </section>
  );
};
