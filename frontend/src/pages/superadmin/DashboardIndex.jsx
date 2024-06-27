import React, { useState, useEffect } from "react";
import { usePhotos } from "../../contexts/PhotosContext";
import DashboardPhotoCard from "../../components/superadmin/DashboardPhotoCard";

export default () => {
  const { photoPaginate, fetchPhotosPaginate, categories } = usePhotos();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    fetchPhotosPaginate(page, limit);
  }, [page, limit]);

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const filteredPhotos = photoPaginate.photos
    ? photoPaginate.photos.filter((photo) =>
        photo.title.toLowerCase().includes(filter.toLowerCase())
      )
    : [];

  return (
    <div className="bg-neutral-200 text-neutral-800 flex-grow p-10">
      <div className="mb-4">
        <input
          type="text"
          placeholder="Filter by title..."
          value={filter}
          onChange={handleFilterChange}
          className="w-full p-2 border border-gray-400 rounded"
        />
      </div>
      <div className="grid grid-cols-5 gap-5">
        {filteredPhotos.map((p, i) => (
          <DashboardPhotoCard
            key={`dash-card-${i}`}
            title={p.title}
            image={p.image}
            categories={p.categories}
            user={p.user}
            slug={p.slug}
          />
        ))}
      </div>
      <div className="flex justify-center mt-4">
        <button
          onClick={() => setPage(page > 1 ? page - 1 : 1)}
          className={` ${page === 1 ? "hidden" : "px-4 py-2 bg-gray-300"}`}
        >
          Previous
        </button>
        <button
          onClick={() =>
            setPage(page === photoPaginate.totalPages ? page : page + 1)
          }
          className={` ${
            page === photoPaginate.totalPages
              ? "hidden"
              : "px-4 py-2 bg-gray-300"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};
