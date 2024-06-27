import React, { useState, useContext, createContext } from "react";
import instance from "../utils/axiosClient";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const PhotosContext = createContext();

const PhotosProvider = ({ children }) => {
  const [photos, setPhotos] = useState([]);
  const [photo, setPhoto] = useState([]);
  const [categories, setCategories] = useState([]);
  const [photoPaginate, setPhotoPaginate] = useState([]);
  const navigate = useNavigate();

  const fetchPhotos = async () => {
    try {
      const response = await instance.get("/photos");
      setPhotos(response.data.photos);
    } catch (error) {
      console.error("Error fetching photos:", error);
    }
  };

  const fetchPhoto = async (slug) => {
    try {
      const response = await instance.get(`/photos/${slug}`);
      setPhoto(response.data.photo);
    } catch (error) {
      console.error("Error fetching photos:", error);
      navigate("/not-found");
    }
  };

  const fetchPhotosPaginate = async (page, limit) => {
    try {
      const response = await instance.get(
        `/photos?page=${page}&limit=${limit}`
      );
      setPhotoPaginate(response.data);
    } catch (error) {
      console.error("Error fetching photos:", error);
    }
  };

  const fetchCategory = async () => {
    try {
      const response = await instance.get(`/categories`);
      setCategories(response.data.categories);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    fetchPhotos();
    fetchCategory();
    // fetchPhotosPaginate();
  }, []);

  const values = {
    photos,
    photoPaginate,
    fetchPhotosPaginate,
    photo,
    fetchPhoto,
    categories,
  };

  return (
    <PhotosContext.Provider value={values}>{children}</PhotosContext.Provider>
  );
};

const usePhotos = () => {
  return useContext(PhotosContext);
};

export { PhotosProvider, usePhotos };
