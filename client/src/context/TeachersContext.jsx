import { createContext, useState, useContext, useEffect } from "react";
import {
  getAllTeachers,
  deleteTeacher,
  createTeacher,
  updateTeacher,
} from "../services/teacherService";

import { useApp } from "./AppContext";

const TeachersContext = createContext();

export const TeachersProvider = ({ children }) => {
  const [teachers, setTeachers] = useState([]);
  const [count, setCount] = useState(1);
  const [page, setPage] = useState(1);

  const { user } = useApp();

  const fetchTeachers = async () => {
    const data = await getAllTeachers(page);
    setTeachers(data.teachers);
    setCount(data.totalPages);
  };

  const handleDeleteTeacher = async (id) => {
    await deleteTeacher(id);
    await fetchTeachers();
  };

  const handleCreateTeacher = async (formData) => {
    await createTeacher(formData);
    await fetchTeachers();
  };

  const handleUpdateTeacher = async (id, formData) => {
    await updateTeacher(id, formData);
    await fetchTeachers();
  };

  useEffect(() => {
    fetchTeachers();
  }, [page, user]);

  return (
    <TeachersContext.Provider
      value={{
        teachers,
        fetchTeachers,
        setPage,
        page,
        count,
        handleDeleteTeacher,
        handleCreateTeacher,
        handleUpdateTeacher,
      }}
    >
      {children}
    </TeachersContext.Provider>
  );
};

export const useTeachers = () => useContext(TeachersContext);
