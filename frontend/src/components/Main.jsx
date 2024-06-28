import { usePhotos } from "../contexts/PhotosContext";
import PhotoCard from "./PhotoCard";
export default () => {
  const { loading, photos } = usePhotos();

  return (
    <main className=" p-16 ">
      <div className=" container mx-auto">
        {loading ? (
          <div>Loading...</div>
        ) : (
          <div className=" grid grid-cols-3 gap-20">
            {photos.map((c, i) => (
              <div className="col-span-1">
                <PhotoCard title={c.title} image={c.image} />
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
};
