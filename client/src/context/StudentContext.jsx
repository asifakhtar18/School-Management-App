import { createContext, useContext, useState, useEffect } from "react";
import {
  getAllStudents,
  deleteStudent,
  createStudent,
  updateStudent,
} from "../services/studentService";

const studentContext = createContext();

export const StudentProvider = ({ children }) => {
  const [students, setStudents] = useState([]);
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(1);

  const fetchStudents = async (page) => {
    const data = await getAllStudents(page);

    setStudents(data.students);
    setCount(data.totalPages);
  };

  const handleDeleteStudent = async (id) => {
    await deleteStudent(id);
    await fetchStudents();
  };

  const handleCreateStudent = async (formData) => {
    await createStudent(formData);
    await fetchStudents();
  };

  const handleUpdateStudent = async (id, formData) => {
    await updateStudent(id, formData);
    await fetchStudents();
  };

  useEffect(() => {
    fetchStudents(page);
  }, [page]);

  return (
    <studentContext.Provider
      value={{
        students,
        setStudents,
        page,
        setPage,
        count,
        setCount,
        fetchStudents,
        handleDeleteStudent,
        handleCreateStudent,
        handleUpdateStudent,
      }}
    >
      {children}
    </studentContext.Provider>
  );
};

export const useStudent = () => useContext(studentContext);
