import { useEffect, useState } from "react";
import { usePhotos } from "../../contexts/PhotosContext";
import InputElement from "../../components/InputElement";
import useForm from "../../hooks/useForm";
import instance from "../../utils/axiosClient";
import { useNavigate, useParams } from "react-router-dom";
import { useGlobal } from "../../contexts/GlobalContext";

export default () => {
  const { slug } = useParams();
  const [photo, setPhoto] = useState(null);
  const { categories, fetchPhotos } = usePhotos();
  const [err, setErr] = useState(false);
  const navigate = useNavigate();
  const { baseImgUrl } = useGlobal();

  const categoryOptions = [
    ...categories.map((category) => ({
      value: category.id,
      label: category.name,
    })),
  ];
  const formFields = [
    { type: "text", name: "title", label: "Title", required: true },
    { type: "checkbox", name: "visible", label: "Visible", required: true },
    {
      type: "multicheckbox",
      name: "categories",
      label: "Categories",
      options: categoryOptions,
      required: true,
    },
    {
      type: "textarea",
      name: "description",
      label: "Description",
      required: false,
    },
    { type: "file", name: "image", label: "Image", required: false },
  ];

  const [formValues, handleInputChange, resetForm, setValues] = useForm({
    title: "",
    visible: false,
    categories: [],
    description: "",
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
        image: null, // Keep image as null initially
      });
    } catch (error) {
      console.error("Error fetching photos:", error);
    }
  };

  useEffect(() => {
    fetchPhoto();
  }, [slug]);

  const updatePhoto = async () => {
    const formData = new FormData();
    formData.append("title", formValues.title);
    formData.append("visible", formValues.visible);
    formValues.categories.forEach((category) => {
      formData.append("categories[]", category);
    });
    formData.append("description", formValues.description);

    if (formValues.image) {
      formData.append("image", formValues.image);
    } else {
      formData.append("existingImage", photo.image); // Include existing image if new image is not uploaded
    }

    try {
      await instance.put(`/photos/${slug}`, formData, {
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
    <div className="flex flex-col">
      {/* Form */}
      <div className="grid grid-cols-2">
        <div className=" col-span-1">
          <h2 className="text-4xl font-semibold mb-12">Update Photo</h2>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-3/5">
            {formFields.map((field) => (
              <InputElement
                key={field.name}
                type={field.type}
                name={field.name}
                label={field.label}
                value={formValues[field.name]}
                onChange={handleInputChange}
                options={field.options}
                required={field.required}
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
                className=" p-1 px-2 bg-neutral-100 text-neutral-900 mt-2 rounded-md"
                onClick={() => fetchPhotos()}
              >
                Update
              </button>
            </div>
          </form>
        </div>

        <div className="col-span-1">
          {photo.image ? (
            <figure className="det-dash-img-container">
              <img
                src={`${baseImgUrl}${photo.image}`}
                alt="Existing"
                className="det-dash-img"
              />
            </figure>
          ) : null}
        </div>
      </div>
    </div>
  );
};
