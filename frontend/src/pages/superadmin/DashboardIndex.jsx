import { usePhotos } from "../../contexts/PhotosContext";
import DashboardPhotoCard from "../../components/superadmin/DashboardPhotoCard";

export default () => {
  const { photos } = usePhotos();
  return (
    <div className=" bg-neutral-200 text-neutral-800 flex-grow p-10">
      <div className="grid grid-cols-5 gap-5">
        {photos.map((p, i) => (
          <DashboardPhotoCard
            key={`dash-card-${i}`}
            title={p.title}
            image={p.image}
            categories={p.categories}
          ></DashboardPhotoCard>
        ))}
      </div>
    </div>
  );
};
