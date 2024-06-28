import useForm from "../hooks/useForm";
import InputElement from "../components/InputElement";
import { useState } from "react";

export default () => {
  const [err, setErr] = useState(false);
  const formFields = [
    { type: "email", name: "email", label: "Email", required: true },
    { type: "textarea", name: "message", label: "Message", required: true },
  ];

  const [formValues, handleInputChange, resetForm] = useForm({
    email: "",
    message: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      //   await addPhoto(formValues);
      //   resetForm();
      //   navigate("/admin/dashboard", {
      //     state: { message: "Photo created successfully" },
      //   });
    } catch (e) {
      setErr(e.message);
    }
  };
  return (
    <div className=" container mx-auto flex flex-col justify-center items-center py-16">
      <h3 className="text-3xl font-semibold mb-6">Contact Me</h3>
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
            className="p-1 px-2 bg-neutral-200 text-neutral-900 mt-2 rounded-md shadow-2xl"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
};
