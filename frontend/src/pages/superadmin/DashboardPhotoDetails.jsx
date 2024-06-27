import { useEffect } from "react";
import { usePhotos } from "../../contexts/PhotosContext";
import { useParams } from "react-router-dom";

export default () => {
  const { fetchPhoto, photo } = usePhotos();
  const { slug } = useParams();

  useEffect(() => {
    fetchPhoto(slug);
    console.log(photo);
  }, [slug]);
  return <div>{photo.title}</div>;
};
