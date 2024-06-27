import React, { useState, useContext, createContext } from "react";
import instance from "../utils/axiosClient";
import { useEffect } from "react";

const PhotosContext = createContext();

const PhotosProvider = ({ children }) => {
  const [photos, setPhotos] = useState([]);
  const [categories, setCategories] = useState([]);

  const fetchPhotos = async () => {
    try {
      const response = await instance.get("/photos");
      setPhotos(response.data.photos);
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
  }, []);

  const values = {
    photos,
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
