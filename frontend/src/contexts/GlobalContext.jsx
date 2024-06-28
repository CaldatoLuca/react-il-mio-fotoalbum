import { createContext, useContext, useEffect, useState } from "react";
import instance from "../utils/axiosClient";

const GlobalContext = createContext();

const GlobalProvider = ({ children }) => {
  const baseImgUrl = "http://localhost:3000/photos/";
  const [messages, setMessages] = useState();
  const [loading, setLoading] = useState(true);

  const sendMessage = async (message) => {
    try {
      instance.post("/messages", message);
    } catch (e) {
      throw new Error(e.response.data.message);
    }
  };

  const fetchMessages = async () => {
    try {
      const response = await instance.get(`/messages`);
      setMessages(response.data.contactMessages);
    } catch (error) {
      console.error("Error fetching messages:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const values = {
    baseImgUrl,
    sendMessage,
    messages,
    loading,
  };

  return (
    <GlobalContext.Provider value={values}>{children}</GlobalContext.Provider>
  );
};

const useGlobal = () => {
  return useContext(GlobalContext);
};

export { GlobalProvider, useGlobal };
