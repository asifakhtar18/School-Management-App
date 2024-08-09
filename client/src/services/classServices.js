import axios from "axios";

const API_URL = "https://school-management-app-server.vercel.app/api/classes";

export const getAllClasses = async (page = 1, limit = 6) => {
  const data = await axios.get(`${API_URL}?page=${page}&limit=${limit}`);
  return data.data;
};
export const createClass = (newClass) => axios.post(API_URL, newClass);
export const updateClass = (id, updatedClass) =>
  axios.put(`${API_URL}/${id}`, updatedClass);
export const deleteClass = (id) => axios.delete(`${API_URL}/${id}`);
