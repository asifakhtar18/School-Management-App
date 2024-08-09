import axios from "axios";

const API_URL = "https://school-management-app-server.vercel.app/api/teachers";

export const getAllTeachers = async (page = 1, limit = 6) => {
  try {
    const data = await axios.get(`${API_URL}?page=${page}&limit=${limit}`);
    console.log(data.data);
    return data?.data;
  } catch (error) {
    console.log(error);
  }
};
export const createTeacher = (newTeacher) => axios.post(API_URL, newTeacher);
export const updateTeacher = (id, updatedTeacher) =>
  axios.put(`${API_URL}/${id}`, updatedTeacher);
export const deleteTeacher = (id) => axios.delete(`${API_URL}/${id}`);
