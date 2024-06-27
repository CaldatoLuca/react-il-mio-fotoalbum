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
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchPhotos = async () => {
    setLoading(true);
    try {
      const response = await instance.get("/photos");
      setPhotos(response.data.photos);
    } catch (error) {
      console.error("Error fetching photos:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchPhoto = async (slug) => {
    setLoading(true);
    try {
      const response = await instance.get(`/photos/${slug}`);
      setPhoto(response.data.photo);
    } catch (error) {
      console.error("Error fetching photo:", error);
      navigate("/not-found");
    } finally {
      setLoading(false);
    }
  };

  const fetchPhotosPaginate = async (page, limit) => {
    setLoading(true);
    try {
      const response = await instance.get(
        `/photos?page=${page}&limit=${limit}`
      );
      setPhotoPaginate(response.data);
    } catch (error) {
      console.error("Error fetching photos:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategory = async () => {
    setLoading(true);
    try {
      const response = await instance.get(`/categories`);
      setCategories(response.data.categories);
    } catch (error) {
      console.error("Error fetching categories:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPhotos();
    fetchCategory();
  }, []);

  const values = {
    photos,
    photoPaginate,
    fetchPhotosPaginate,
    photo,
    fetchPhoto,
    categories,
    loading,
  };

  return (
    <PhotosContext.Provider value={values}>{children}</PhotosContext.Provider>
  );
};

const usePhotos = () => {
  return useContext(PhotosContext);
};

export { PhotosProvider, usePhotos };
