import { useEffect, useState } from "react";
import { usePhotos } from "../../contexts/PhotosContext";
import InputElement from "../../components/InputElement";
import useForm from "../../hooks/useForm";
import instance from "../../utils/axiosClient";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

export default () => {
  const { slug } = useParams();
  const [photo, setPhoto] = useState(null);
  const { categories, fetchPhotos } = usePhotos();
  const [err, setErr] = useState(false);

  const navigate = useNavigate();

  const categoryOptions = [
    ...categories.map((category) => ({
      value: category.id,
      label: category.name,
    })),
  ];
  const formFields = [
    { type: "text", name: "title", label: "Title" },

    { type: "checkbox", name: "visible", label: "Visible" },
    {
      type: "multicheckbox",
      name: "categories",
      label: "Categories",
      options: categoryOptions,
    },
    { type: "textarea", name: "description", label: "Description" },
    { type: "file", name: "image", label: "Image" },
  ];

  const [formValues, handleInputChange, resetForm, setValues] = useForm({
    title: "",
    categoryId: "",
    published: false,
    tags: [],
    content: "",
    image: null,
  });

  const fetchPhoto = async () => {
    try {
      const response = await instance.get(`/photos/${slug}`);
      const photoData = response.data.photo;
      setPhoto(photoData);
      setValues({
        title: photoData.title,
        visible: photoData.visible,
        categories: photoData.categories.map((c) => c.id),
        description: photoData.description,
        image: photoData.image,
      });
    } catch (error) {
      console.error("Error fetching photos:", error);
    }
  };

  useEffect(() => {
    fetchPhoto();
  }, [slug]);

  const updatePhoto = async () => {
    try {
      await instance.put(`/photos/${slug}`, formValues, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updatePhoto();
      resetForm();
      navigate("/admin/dashboard", {
        state: { message: "Photo updated successfully" },
      });
    } catch (e) {
      setErr(e.message);
    }
  };

  if (!photo) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex justify-center items-center flex-col">
      <h2 className="text-4xl font-semibold mb-12">Update Photo</h2>

      {/* Form */}
      <div className="flex w-1/2 justify-center">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-2/3">
          {formFields.map((field) => (
            <InputElement
              key={field.name}
              type={field.type}
              name={field.name}
              label={field.label}
              value={formValues[field.name]}
              onChange={handleInputChange}
              options={field.options}
            />
          ))}
          {err && (
            <div className="text-center bg-red-500 rounded-md px-2 py-1">
              {err}
            </div>
          )}
          <div>
            <button
              type="submit"
              className=" p-1 px-2 bg-neutral-100 text-neutral-900 mt-6 rounded-md"
              onClick={() => fetchPhotos()}
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
