import { useEffect, useState } from "react";
import { usePhotos } from "../../contexts/PhotosContext";
import { useParams } from "react-router-dom";
import { useGlobal } from "../../contexts/GlobalContext";

export default () => {
  const { fetchPhoto, photo, loading } = usePhotos();
  const { slug } = useParams();
  const { baseImgUrl } = useGlobal();

  useEffect(() => {
    const loadPhoto = async () => {
      await fetchPhoto(slug);
    };

    loadPhoto();
  }, [slug]);

  if (loading) {
    return <div className="text-center p-20">Loading...</div>;
  }

  if (!photo) {
    return <div className="text-center p-20">Photo not found</div>;
  }

  return (
    <div className="grid grid-cols-2">
      <div className="col-span-1 flex justify-center items-start p-10">
        <div className="shadow-2xl p-5 flex flex-col gap-4">
          {/* Titolo */}
          <h2 className="text-4xl font-semibold">{photo.title}</h2>

          {/* Description */}
          {photo.description ? (
            <p>{photo.description}</p>
          ) : (
            <div>No description</div>
          )}

          {/* Categories */}
          {photo.categories && photo.categories.length > 0 ? (
            <ul className="flex flex-wrap gap-2">
              {photo.categories.map((c, i) => (
                <li
                  key={`cat-${i}`}
                  className={`text-neutral-200 bg-neutral-800 px-3 shadow-2xl `}
                >
                  {c.name}
                </li>
              ))}
            </ul>
          ) : (
            <div>No categories</div>
          )}
        </div>
      </div>

      <div className="col-span-1">
        {/* Immagine */}
        <figure className="det-dash-img-container">
          <img
            src={`${baseImgUrl}${photo.image}`}
            alt={`image-${photo.slug}`}
            className="det-dash-img"
          />
        </figure>
      </div>
    </div>
  );
};
