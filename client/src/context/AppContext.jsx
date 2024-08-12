import { createContext, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { login, register } from "../services/authService";

export const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [openModal, setOpenModal] = useState(false);
  const [user, setUser] = useState();

  const navigate = useNavigate();

  useEffect(() => {
    localStorage.getItem("user") &&
      setUser(JSON.parse(localStorage.getItem("user")));
  }, []);

  useEffect(() => {
    if (user) {
      console.log(user);
      navigate("/");
    } else {
      navigate("/login");
    }
  }, [user]);

  const handleLogin = async (email, password) => {
    const data = await login(email, password);
    console.log(data);
    if (data.error) {
      return data;
    }
    localStorage.setItem("user", JSON.stringify(data));
    setUser(data);
    return data;
  };

  const handleRegister = async (name, email, password) => {
    const data = await register(name, email, password);
    if (data.error) {
      return data;
    }
    localStorage.setItem("user", JSON.stringify(data));
    setUser(data);
    return data;
  };

  return (
    <AppContext.Provider
      value={{
        user,
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
