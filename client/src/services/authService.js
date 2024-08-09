import axios from "axios";

const API_URL = "http://localhost:5000/api/auth";

export const login = async (formData) => {
  try {
    const data = await axios.post(`${API_URL}/login`, { ...formData });
    localStorage.setItem("user", JSON.stringify(data.data));
    return data.data;
  } catch (error) {
    console.log(error);
  }
};

export const register = async (formData) => {
  try {
    const data = await axios.post(`${API_URL}/register`, {
      ...formData,
    });
    localStorage.setItem("user", JSON.stringify(data.data));
    return data.data;
  } catch (error) {
    console.log(error);
  }
};
