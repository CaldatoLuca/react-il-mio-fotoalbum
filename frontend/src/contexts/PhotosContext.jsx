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
    try {
      const response = await instance.get("/photos");
      setPhotos(response.data.photos);
      setLoading(true);
    } catch (error) {
      console.error("Error fetching photos:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchPhoto = async (slug) => {
    try {
      const response = await instance.get(`/photos/${slug}`);
      setPhoto(response.data.photo);
      setLoading(true);
    } catch (error) {
      console.error("Error fetching photo:", error);
      navigate("/not-found");
    } finally {
      setLoading(false);
    }
  };

  const fetchPhotosPaginate = async (page, limit) => {
    try {
      const response = await instance.get(
        `/photos?page=${page}&limit=${limit}`
      );
      setPhotoPaginate(response.data);
      setLoading(true);
    } catch (error) {
      console.error("Error fetching photos:", error);
    } finally {
      setLoading(false);
    }
  };

  const addPhoto = async (values) => {
    try {
      await instance.post(`/photos`, values, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  };

  const deletePhoto = async (slug) => {
    try {
      await instance.delete(`/photos/${slug}`);
    } catch (error) {
      console.error("Error deleting photo:", error);
    } finally {
      fetchPhotos();
    }
  };

  const fetchCategory = async () => {
    try {
      const response = await instance.get(`/categories`);
      setCategories(response.data.categories);
      setLoading(true);
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
    fetchPhotos,
    photoPaginate,
    fetchPhotosPaginate,
    photo,
    fetchPhoto,
    deletePhoto,
    addPhoto,
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
