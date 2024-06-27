import { useState } from "react";

const useForm = (initialValues) => {
  const [values, setValues] = useState(initialValues);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    if (type === "checkbox") {
      if (name === "visible") {
        setValues({
          ...values,
          [name]: checked,
        });
      } else {
        setValues({
          ...values,
          [name]: checked
            ? [...values[name], +value]
            : values[name].filter((v) => v !== +value),
        });
      }
    } else if (type === "file") {
      const file = files[0];
      const imageUrl = URL.createObjectURL(file);
      setValues({
        ...values,
        [name]: file,
        imageUrl, // Store the image URL for preview
      });
    } else {
      setValues({
        ...values,
        [name]: value,
      });
    }
  };

  const resetForm = () => {
    setValues(initialValues);
  };

  return [values, handleChange, resetForm, setValues];
};

export default useForm;
