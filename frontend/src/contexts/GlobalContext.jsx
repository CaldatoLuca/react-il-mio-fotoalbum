import { createContext, useContext } from "react";
import instance from "../utils/axiosClient";

const GlobalContext = createContext();

const GlobalProvider = ({ children }) => {
  const baseImgUrl = "http://localhost:3000/photos/";

  const sendMessage = async (message) => {
    try {
      instance.post("/messages", message);
    } catch (e) {
      throw new Error(e.response.data.message);
    }
  };

  const values = {
    baseImgUrl,
    sendMessage,
  };

  return (
    <GlobalContext.Provider value={values}>{children}</GlobalContext.Provider>
  );
};

const useGlobal = () => {
  return useContext(GlobalContext);
};

export { GlobalProvider, useGlobal };
