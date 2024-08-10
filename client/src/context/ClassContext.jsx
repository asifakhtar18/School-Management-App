import { createContext, useState, useContext, useEffect } from "react";
import {
  getAllClasses,
  deleteClass,
  createClass,
  updateClass,
} from "../services/classServices";

import { useApp } from "./AppContext";

const ClassesContext = createContext();

export const ClassesProvider = ({ children }) => {
  const [classes, setClasses] = useState([]);
  const [currentClass, setCurrentClass] = useState(null);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0); // Total pages count

  const { user } = useApp();

  const fetchClassesData = async (page) => {
    const data = await getAllClasses(page);
    setClasses(data.classes);
    setCount(data.totalPages);
  };

  const handleDeleteClass = async (id) => {
    await deleteClass(id);
    await fetchClassesData(page);
  };

  const handleCreateClass = async (formData) => {
    await createClass(formData);
    await fetchClassesData(page);
  };

  const handleUpdateClass = async (id, formData) => {
    await updateClass(id, formData);
    await fetchClassesData(page);
  };

  useEffect(() => {
    fetchClassesData(page);
  }, [page, user]);

  return (
    <ClassesContext.Provider
      value={{
        classes,
        currentClass,
        setCurrentClass,
        page,
        setPage,
        count,
        setClasses,
        fetchClassesData,
        handleDeleteClass,
        handleCreateClass,
        handleUpdateClass,
      }}
    >
      {children}
    </ClassesContext.Provider>
  );
};

export const useClasses = () => useContext(ClassesContext);
