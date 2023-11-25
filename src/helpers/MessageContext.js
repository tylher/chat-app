import React, { useState } from "react";
import { useContext, createContext } from "react";

const MessagesContext = createContext();
export const useMessagesContext = () => {
  return useContext(MessagesContext);
};

export const MessagesProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);
  const updateMessages = (message) => {
    setMessages((prev) => [...prev, message]);
  };
  return (
    <MessagesContext.Provider value={{ messages, updateMessages }}>
      {children}
    </MessagesContext.Provider>
  );
};
