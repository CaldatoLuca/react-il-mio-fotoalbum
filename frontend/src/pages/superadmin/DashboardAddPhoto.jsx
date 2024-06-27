import { useState } from "react";
import { usePhotos } from "../../contexts/PhotosContext";
import InputElement from "../../components/InputElement";
import useForm from "../../hooks/useForm";
import instance from "../../utils/axiosClient";
import { useNavigate } from "react-router-dom";

export default () => {
  const { categories, fetchPhotos, addPhoto } = usePhotos();
  const [err, setErr] = useState(false);
  const navigate = useNavigate();
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
    { type: "file", name: "image", label: "Image", required: true },
  ];

  const [formValues, handleInputChange, resetForm] = useForm({
    title: "",
    visible: false,
    categories: [],
    description: "",
    image: null,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addPhoto(formValues);
      resetForm();
      navigate("/admin/dashboard", {
        state: { message: "Photo created successfully" },
      });
    } catch (e) {
      setErr(e.message);
    }
  };

  return (
    <div className="flex justify-center items-center flex-col">
      <h2 className="text-4xl font-semibold mb-12">Create a new Photo</h2>

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
              required={field.required}
            />
          ))}
          {err ? (
            <div className="text-center bg-red-500 rounded-md px-2 py-1">
              {err}
            </div>
          ) : (
            ""
          )}
          <div>
            <button
              type="submit"
              className=" p-1 px-2 bg-neutral-100 text-neutral-900 mt-6 rounded-md"
              onClick={() => fetchPhotos()}
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
