import axios from "axios";
import { handleError } from "../utils/errorHandler";

import { BASE_URL } from "../utils/constants";

const API_URL = `${BASE_URL}/api/students`;

// const API_URL = "http://localhost:5000/api/students";

export const getAllStudents = async (page = 1, limit = 6) => {
  try {
    const { token } = JSON.parse(localStorage.getItem("user"));
    if (!token) {
      throw new Error("Not authorized, no token");
    }
    const response = await axios.get(`${API_URL}?page=${page}&limit=${limit}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const createStudent = async (newStudent) => {
  try {
    const { token } = JSON.parse(localStorage.getItem("user"));
    const response = await axios.post(API_URL, newStudent, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const updateStudent = async (id, updatedStudent) => {
  try {
    const { token } = JSON.parse(localStorage.getItem("user"));
    const response = await axios.put(`${API_URL}/${id}`, updatedStudent, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const deleteStudent = async (id) => {
  try {
    const { token } = JSON.parse(localStorage.getItem("user"));
    const response = await axios.delete(`${API_URL}/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    handleError(error);
  }
};
