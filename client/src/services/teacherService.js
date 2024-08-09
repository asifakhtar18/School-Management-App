import axios from "axios";
import { BASE_URL } from "../utils/constants";

const API_URL = `${BASE_URL}/api/teachers`;

// const API_URL = "http://localhost:5000/api/teachers";

const handleError = (error) => {
  if (error.response) {
    console.error("Error response:", error.response.data);
    throw new Error(error.response.data.message || "An error occurred");
  } else if (error.request) {
    console.error("Error request:", error.request);
    throw new Error("No response received from server");
  } else {
    console.error("Error message:", error.message);
    throw new Error("Error in setting up the request");
  }
};

export const getAllTeachers = async (page = 1, limit = 6) => {
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

    return response?.data;
  } catch (error) {
    handleError(error);
  }
};

export const createTeacher = async (newTeacher) => {
  try {
    const { token } = JSON.parse(localStorage.getItem("user"));
    const response = await axios.post(API_URL, newTeacher, {
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

export const updateTeacher = async (id, updatedTeacher) => {
  try {
    const { token } = JSON.parse(localStorage.getItem("user"));
    const response = await axios.put(`${API_URL}/${id}`, updatedTeacher, {
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

export const deleteTeacher = async (id) => {
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
