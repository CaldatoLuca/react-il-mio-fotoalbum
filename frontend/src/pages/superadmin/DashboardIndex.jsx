import React, { useState, useEffect } from "react";
import { usePhotos } from "../../contexts/PhotosContext";
import DashboardPhotoCard from "../../components/superadmin/DashboardPhotoCard";

export default () => {
  const { photoPaginate, fetchPhotosPaginate } = usePhotos();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  console.log(photoPaginate);

  useEffect(() => {
    fetchPhotosPaginate(page, limit);
  }, [page, limit]);

  return (
    <div className="bg-neutral-200 text-neutral-800 flex-grow p-10">
      <div className="grid grid-cols-5 gap-5">
        {photoPaginate.photos &&
          photoPaginate.photos.map((p, i) => (
            <DashboardPhotoCard
              key={`dash-card-${i}`}
              title={p.title}
              image={p.image}
              categories={p.categories}
              user={p.user}
              slug={p.slug}
            ></DashboardPhotoCard>
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
