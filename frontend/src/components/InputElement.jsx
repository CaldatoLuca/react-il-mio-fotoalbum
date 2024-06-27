import React from "react";

const InputElement = ({
  type,
  name,
  label,
  value,
  onChange,
  options,
  required,
}) => {
  switch (type) {
    case "text":
    case "email":
    case "password":
    case "number":
      return (
        <div className="flex flex-col gap-2">
          <label className=" text-lg font-semibold">{label}</label>
          <input
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            className=" rounded-md text-neutral-900 outline-none px-1 cursor-pointer"
            required={required}
          />
        </div>
      );
    case "textarea":
      return (
        <div className=" flex flex-col gap-2">
          <label className=" text-lg font-semibold">{label}</label>
          <textarea
            name={name}
            value={value}
            onChange={onChange}
            className=" rounded-md text-neutral-900"
            rows={10}
            required={required}
          />
        </div>
      );
    case "file":
      return (
        <div className=" flex flex-col gap-2">
          <label className=" text-lg font-semibold">{label}</label>
          <input
            type="file"
            name={name}
            onChange={onChange}
            className=" rounded-md "
            required={required}
          />
        </div>
      );
    case "select":
      return (
        <div className="flex flex-col gap-2">
          <label className=" text-lg font-semibold">{label}</label>
          <select
            name={name}
            value={value}
            onChange={onChange}
            className=" rounded-md text-neutral-900"
            required={required}
          >
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      );
    case "checkbox":
      return (
        <div className="mt-2">
          <label className="flex items-center gap-2 text-lg">
            <input
              type="checkbox"
              name={name}
              checked={value}
              onChange={onChange}
              className=" rounded-full"
            />
            {label}
          </label>
        </div>
      );
    case "multicheckbox":
      return (
        <div className="flex flex-wrap gap-1">
          <label className="text-lg font-semibold w-full">{label}</label>
          {options.map((option) => (
            <div key={option.value} className=" mr-2">
              <label className=" flex items-center gap-2">
                <input
                  type="checkbox"
                  name={name}
                  value={option.value}
                  checked={value.includes(option.value)}
                  onChange={onChange}
                />
                {option.label}
              </label>
            </div>
          ))}
        </div>
      );
    default:
      return null;
  }
};

export default InputElement;
