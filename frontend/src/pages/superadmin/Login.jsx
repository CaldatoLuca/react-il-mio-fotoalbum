import InputElement from "../../components/InputElement";
import useForm from "../../hooks/useForm";
import { useAuth } from "../../contexts/AuthContext";
import { useState } from "react";
import { useLocation } from "react-router-dom";

export default () => {
  const location = useLocation();
  const { message } = location.state || {};

  const { login } = useAuth();
  const [err, setErr] = useState(false);

  const formFields = [
    { type: "email", name: "email", label: "Email" },
    { type: "password", name: "password", label: "Password" },
  ];

  const [formValues, handleInputChange, resetForm] = useForm({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await login(formValues);
      resetForm();
    } catch (e) {
      setErr(e.message);
    }
  };

  return (
    <div
      id="super-login"
      className="h-screen bg-neutral-200 gap-4 grid grid-cols-2"
    >
      <div className="col-span-1 bg-slate-900 overflow-hidden">
        <img
          src="/superadmin.jpeg"
          alt="login-img"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="col-span-1 flex flex-col">
        <h1 className="pt-20 text-center text-4xl">Steve McCurry</h1>

        <div className="w-full flex flex-col justify-center items-center flex-grow">
          <div className="shadow-2xl p-10 w-2/5">
            {message ? (
              <div className="text-center bg-red-500 text-xl rounded-md px-2 py-1">
                {message}
              </div>
            ) : null}

            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-4 w-full"
            >
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
                  className="p-1 px-2 bg-orange-300 text-neutral-900 mt-6 shadow-lg"
                >
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
