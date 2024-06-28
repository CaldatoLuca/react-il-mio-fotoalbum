import Header from "../components/Header";
import Carousel from "../components/Carousel";
import { usePhotos } from "../contexts/PhotosContext";

export default () => {
  const { photos, loading } = usePhotos();

  if (loading) return <div>Loading...</div>;
  return (
    <>
      <div className="bg-neutral-200">
        <Header /> <Carousel photos={photos} />
      </div>
    </>
  );
};
