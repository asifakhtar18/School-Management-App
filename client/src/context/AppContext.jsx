import { createContext, useState, useContext } from "react";

import { login, register } from "../services/authService";

export const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [openModal, setOpenModal] = useState(false);

  const handleLogin = async (email, password) => {
    const data = await login(email, password);
    return data;
  };

  const handleRegister = async (name, email, password) => {
    const data = await register(name, email, password);
    return data;
  };

  return (
    <AppContext.Provider
      value={{
        openModal,
        setOpenModal,
        handleLogin,
        handleRegister,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;

export const useApp = () => useContext(AppContext);
