import axios from "axios";

const API_URL = "https://school-management-app-server.vercel.app/api/students";

export const getAllStudents = async (page = 1, limit = 6) => {
  try {
    const data = await axios.get(`${API_URL}?page=${page}&limit=${limit}`);
    console.log(data.data);
    return data.data;
  } catch (error) {
    console.log(error);
  }
};
export const createStudent = (newStudent) => axios.post(API_URL, newStudent);
export const updateStudent = (id, updatedStudent) =>
  axios.put(`${API_URL}/${id}`, updatedStudent);
export const deleteStudent = (id) => axios.delete(`${API_URL}/${id}`);
